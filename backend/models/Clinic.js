import mongoose from 'mongoose';

const clinicSchema = new mongoose.Schema({
  clinicName: { type: String, required: true },
  doctorName: { type: String, required: true },
  phone: { type: String },
  whatsapp: { type: String },
  email: { type: String },
  address: { type: String },
  openingHours: { type: String },
  mapsUrl: { type: String },
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String
  }
}, { timestamps: true });

export default mongoose.model('Clinic', clinicSchema);
