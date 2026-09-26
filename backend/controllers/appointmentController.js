import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import { sendAppointmentNotificationEmail, testEmailConnection } from '../utils/emailService.js';

export const createAppointment = async (req, res) => {
  try {
    const { name, phone, email, service, preferredDate, preferredTime, message } = req.body;
    
    if (!name || !phone || !service || !preferredDate || !preferredTime) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields (Name, Phone, Service, Date, Time).' 
      });
    }

    // 1. Attempt database persistence if MongoDB is connected
    let savedAppointment = null;
    if (mongoose.connection.readyState === 1) {
      try {
        const newAppointment = new Appointment({
          name, 
          phone, 
          email: email || '', 
          service, 
          preferredDate, 
          preferredTime, 
          message: message || ''
        });
        savedAppointment = await newAppointment.save();
      } catch (dbError) {
        console.warn('Database save warning:', dbError.message);
      }
    }

    // 2. Dispatch formal email notification to clinic & confirmation to patient
    const emailResult = await sendAppointmentNotificationEmail({
      name,
      phone,
      email: email || '',
      service,
      preferredDate,
      preferredTime,
      message: message || ''
    });

    const isEmailDelivered = emailResult.success === true;

    return res.status(201).json({
      success: true,
      emailDelivered: isEmailDelivered,
      message: isEmailDelivered 
        ? 'Appointment booked! Notification sent to clinic email.'
        : 'Appointment booked! Note: Email delivery could not complete due to invalid credentials or server offline.',
      appointment: savedAppointment || { name, phone, email, service, preferredDate, preferredTime, message },
      emailStatus: emailResult
    });

  } catch (error) {
    console.error('Error handling appointment booking:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to process appointment request.',
      error: error.message 
    });
  }
};

export const testEmail = async (req, res) => {
  try {
    const result = await testEmailConnection();
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
