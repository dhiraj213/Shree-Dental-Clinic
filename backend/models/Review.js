import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  treatment: { type: String },
  verified: { type: Boolean, default: false },
  approved: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
