import nodemailer from 'nodemailer';

const CLINIC_EMAIL = process.env.CLINIC_EMAIL || 'ahiredhiraj213@gmail.com';
const CLINIC_NAME = process.env.CLINIC_NAME || 'Shree Dental Clinic';
const DOCTOR_NAME = process.env.DOCTOR_NAME || 'Dr. Pravin Pawar';
const CLINIC_PHONE = process.env.CLINIC_PHONE || '+91 94235 17934';
const CLINIC_ADDRESS = process.env.CLINIC_ADDRESS || 'Shop No-2, Pawan Heights, Veer Savarkar Chowk, Shivaji Road, Camp, Malegaon - 423203';

/**
 * Helper to initialize nodemailer transporter
 */
export async function getTransporter(forceRefresh = false) {
  const emailUser = process.env.EMAIL_USER?.trim();
  const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';

  // 1. Custom SMTP configuration
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER.trim(),
        pass: process.env.SMTP_PASS.trim(),
      },
    });
  }

  // 2. Direct Gmail configuration
  if (emailUser && emailPass) {
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
  }

  return null;
}

/**
 * Test SMTP connection and return diagnostics
 */
export async function testEmailConnection() {
  try {
    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';

    if (!emailUser || !emailPass) {
      return {
        success: false,
        configured: false,
        message: 'No email credentials configured. Please set EMAIL_USER and EMAIL_PASS in backend/.env.',
        clinicEmail: CLINIC_EMAIL
      };
    }

    const transporter = await getTransporter(true);
    if (!transporter) {
      return {
        success: false,
        configured: false,
        message: 'Unable to initialize email transporter with provided configuration.',
        clinicEmail: CLINIC_EMAIL
      };
    }

    await transporter.verify();
    return {
      success: true,
      configured: true,
      sender: emailUser,
      recipient: CLINIC_EMAIL,
      message: 'SMTP credentials verified successfully! Live email dispatch is active.'
    };
  } catch (error) {
    console.error('[SMTP VERIFICATION ERROR]:', error.message);
    const isAuthError = error.code === 'EAUTH' || (error.response && error.response.includes('535'));
    return {
      success: false,
      configured: true,
      error: error.message,
      code: error.code || 'UNKNOWN',
      isAuthError,
      message: isAuthError
        ? 'Invalid Google App Password or Username. Please create a new 16-character App Password at https://myaccount.google.com/apppasswords and update EMAIL_PASS in backend/.env'
        : `Email connection test failed: ${error.message}`
    };
  }
}

/**
 * Format service name nicely
 */
function formatServiceName(service) {
  const map = {
    general: 'General Dental Checkup & Consultation',
    cleaning: 'Ultrasonic Teeth Cleaning & Polishing',
    whitening: 'Teeth Whitening & Smile Aesthetics',
    pain: 'Emergency Tooth Pain / Root Canal (RCT)',
    implants: 'Dental Implants & Zirconia Crown',
    aligners: 'Invisible Clear Aligners / Braces',
    pediatric: 'Pediatric Dental Care (Kids)',
    other: 'General Dental Consultation',
  };
  return map[service] || service;
}

/**
 * Send notification email to doctor/clinic AND confirmation email to patient
 */
export async function sendAppointmentNotificationEmail(appointmentData) {
  const {
    name,
    phone,
    email,
    service,
    preferredDate,
    preferredTime,
    message = 'None'
  } = appointmentData;

  const serviceName = formatServiceName(service);
  const formattedDate = new Date(preferredDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const waPhone = phone.replace(/[^0-9]/g, '');
  const submissionTimestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const doctorSubject = `🏥 New Appointment Booking: ${name} - ${serviceName} | ${CLINIC_NAME}`;

  const doctorHtmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f1f5f9; margin: 0; padding: 20px; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #0d9488, #0f766e); padding: 28px 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 0; font-size: 14px; opacity: 0.9; }
    .badge-urgent { display: inline-block; background-color: #ef4444; color: #ffffff; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; margin-top: 10px; }
    .content { padding: 28px 24px; }
    .intro { font-size: 15px; color: #334155; margin-bottom: 20px; border-left: 4px solid #0d9488; padding-left: 12px; }
    .details-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .details-table th, .details-table td { padding: 12px 14px; border-bottom: 1px solid #f1f5f9; text-align: left; }
    .details-table th { width: 38%; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; background: #f8fafc; }
    .details-table td { color: #0f172a; font-size: 14px; font-weight: 500; }
    .highlight-value { color: #0d9488; font-weight: 700; font-size: 15px; }
    .action-buttons { margin: 24px 0 10px 0; text-align: center; }
    .btn { display: inline-block; padding: 12px 24px; margin: 6px 4px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 14px; }
    .btn-call { background-color: #0d9488; color: #ffffff !important; }
    .btn-whatsapp { background-color: #25d366; color: #ffffff !important; }
    .footer { background-color: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🦷 ${CLINIC_NAME}</h1>
      <p>Official Patient Appointment Notification for <strong>${DOCTOR_NAME}</strong></p>
      ${service === 'pain' ? '<div class="badge-urgent">⚡ PRIORITY: Severe Tooth Pain / Emergency</div>' : ''}
    </div>

    <div class="content">
      <div class="intro">
        A new patient has submitted an appointment booking request through the website. Details below:
      </div>

      <table class="details-table">
        <tr>
          <th>Patient Name</th>
          <td><strong>${name}</strong></td>
        </tr>
        <tr>
          <th>Phone Number</th>
          <td>
            <a href="tel:${cleanPhone}" style="color: #0d9488; text-decoration: none; font-weight: bold;">
              📞 ${phone}
            </a>
          </td>
        </tr>
        <tr>
          <th>Email Address</th>
          <td>
            ${email && email !== 'Not Provided' ? `<a href="mailto:${email}" style="color: #0d9488;">${email}</a>` : '<span style="color: #94a3b8;">Not Provided</span>'}
          </td>
        </tr>
        <tr>
          <th>Requested Treatment</th>
          <td class="highlight-value">${serviceName}</td>
        </tr>
        <tr>
          <th>Preferred Date</th>
          <td><strong>🗓️ ${formattedDate}</strong></td>
        </tr>
        <tr>
          <th>Preferred Time Slot</th>
          <td><strong>⏰ ${preferredTime.toUpperCase()}</strong></td>
        </tr>
        <tr>
          <th>Patient Notes</th>
          <td>${message || '<span style="color: #94a3b8;">None</span>'}</td>
        </tr>
        <tr>
          <th>Submitted At</th>
          <td style="color: #64748b; font-size: 12px;">${submissionTimestamp} (IST)</td>
        </tr>
      </table>

      <div class="action-buttons">
        <a href="tel:${cleanPhone}" class="btn btn-call">📞 Call Patient Directly</a>
        <a href="https://wa.me/${waPhone}?text=Hello%20${encodeURIComponent(name)}%2C%20this%20is%20${encodeURIComponent(DOCTOR_NAME)}%20from%20${encodeURIComponent(CLINIC_NAME)}%20regarding%20your%20appointment%20request." class="btn btn-whatsapp">💬 Open WhatsApp Chat</a>
      </div>
    </div>

    <div class="footer">
      <p>Automated booking notification generated by ${CLINIC_NAME} Portal.</p>
      <p>Recipient: ${CLINIC_EMAIL} | Doctor in Charge: ${DOCTOR_NAME}</p>
    </div>
  </div>
</body>
</html>
  `;

  const patientSubject = `✅ Appointment Request Received - ${CLINIC_NAME} (${DOCTOR_NAME})`;

  const patientHtmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f1f5f9; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #0d9488, #0f766e); padding: 32px 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0 0 6px 0; font-size: 24px; font-weight: 800; }
    .header p { margin: 0; font-size: 14px; opacity: 0.95; }
    .content { padding: 28px 24px; }
    .greeting { font-size: 16px; color: #0f172a; margin-bottom: 16px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 20px 0; }
    .card-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #edf2f7; font-size: 14px; }
    .card-row:last-child { border-bottom: none; }
    .label { color: #64748b; font-weight: 500; }
    .value { color: #0f172a; font-weight: 700; }
    .highlight { color: #0d9488; font-weight: 700; }
    .btn { display: inline-block; background-color: #0d9488; color: #ffffff !important; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 14px; margin-top: 15px; }
    .footer { background-color: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🦷 ${CLINIC_NAME}</h1>
      <p>Appointment Request Confirmation</p>
    </div>

    <div class="content">
      <div class="greeting">
        Hello <strong>${name}</strong>,
      </div>
      <p style="color: #475569; font-size: 14px;">
        Thank you for booking with <strong>${CLINIC_NAME}</strong>. We have received your appointment request and <strong>${DOCTOR_NAME}</strong>'s team will contact you shortly to confirm your slot.
      </p>

      <div class="card">
        <table style="width: 100%; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Treatment:</td>
            <td style="padding: 6px 0; color: #0d9488; font-weight: bold; text-align: right;">${serviceName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Preferred Date:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold; text-align: right;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Preferred Time:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold; text-align: right;">${preferredTime.toUpperCase()}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Clinic Doctor:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold; text-align: right;">${DOCTOR_NAME}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Clinic Phone:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold; text-align: right;">${CLINIC_PHONE}</td>
          </tr>
        </table>
      </div>

      <p style="color: #475569; font-size: 13px;">
        📍 <strong>Clinic Address:</strong> ${CLINIC_ADDRESS}
      </p>

      <div style="text-align: center; margin-top: 20px;">
        <a href="tel:${CLINIC_PHONE.replace(/[^0-9+]/g, '')}" class="btn">📞 Call Clinic Desk: ${CLINIC_PHONE}</a>
      </div>
    </div>

    <div class="footer">
      <p>${CLINIC_NAME} • Gentle, Painless & Modern Dentistry</p>
      <p>If you have any questions or need to reschedule, please call or WhatsApp us directly.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const transporter = await getTransporter();

    if (!transporter) {
      console.warn('[EMAIL SERVICE] No transporter configured (EMAIL_USER / EMAIL_PASS missing). Email dispatch simulated.');
      return {
        success: false,
        simulated: true,
        error: 'Email credentials not configured in backend/.env',
        recipient: CLINIC_EMAIL
      };
    }

    const senderAddress = process.env.SMTP_FROM || process.env.EMAIL_USER || 'no-reply@shreedentalclinic.com';

    // 1. Send doctor notification email
    const doctorMailOptions = {
      from: `"${CLINIC_NAME} Booking" <${senderAddress}>`,
      to: CLINIC_EMAIL,
      replyTo: email && email.includes('@') ? email : undefined,
      subject: doctorSubject,
      html: doctorHtmlContent,
    };

    const doctorInfo = await transporter.sendMail(doctorMailOptions);
    console.log(`[EMAIL DISPATCH SUCCESS] Clinic notification sent to ${CLINIC_EMAIL}. MessageId: ${doctorInfo.messageId}`);

    // 2. Send patient confirmation email if patient provided an email address
    let patientEmailSent = false;
    if (email && email.includes('@') && email !== 'Not Provided') {
      try {
        const patientMailOptions = {
          from: `"${CLINIC_NAME}" <${senderAddress}>`,
          to: email.trim(),
          subject: patientSubject,
          html: patientHtmlContent,
        };
        const patientInfo = await transporter.sendMail(patientMailOptions);
        patientEmailSent = true;
        console.log(`[EMAIL DISPATCH SUCCESS] Patient confirmation sent to ${email}. MessageId: ${patientInfo.messageId}`);
      } catch (patientErr) {
        console.warn(`[PATIENT EMAIL ERROR] Could not deliver to patient (${email}):`, patientErr.message);
      }
    }

    return {
      success: true,
      doctorNotified: true,
      patientNotified: patientEmailSent,
      messageId: doctorInfo.messageId,
      recipient: CLINIC_EMAIL
    };
  } catch (error) {
    console.error(`[EMAIL DISPATCH ERROR] Failed to send email to ${CLINIC_EMAIL}:`, error.message);
    return {
      success: false,
      error: error.message,
      code: error.code,
      recipient: CLINIC_EMAIL
    };
  }
}
