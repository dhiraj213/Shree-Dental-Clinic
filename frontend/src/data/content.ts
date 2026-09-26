import { CheckCircle, Clock, Smile, Sparkles, ShieldCheck, HeartPulse, Award, Users, Star, Stethoscope } from 'lucide-react';

export const clinicData = {
  name: "Shree Dental Clinic",
  doctor: "Dr. Pravin Pawar",
  qualifications: "B.D.S.",
  specialization: "General, Cosmetic & Painless Root Canal Treatments",
  experience: "15+ Years Clinical Experience",
  phone: "+91 94235 17934",
  whatsapp: "919423517934",
  email: "ahireraj213@gmail.com",
  address: "Shop No-2, Pawan Heights, Veer Savarkar Chowk, Shivaji Road, Camp, Malegaon - 423203",
  openingHours: "Mon - Sat: 10:00 AM - 9:00 PM | Sun: On Prior Appointment",
  mapsUrl: "https://maps.google.com/?q=Shop+No-2+Pawan+Heights+Veer+Savarkar+Chowk+Shivaji+Road+Camp+Malegaon",
  emergencyPhone: "+91 94235 17934",
};

export const heroContent = {
  eyebrow: "Painless & Modern Dentistry",
  heading: "Healthy Smiles. Confident You.",
  subheading: "Experience gentle, advanced dental care with Dr. Pravin Pawar. From routine cleanings and painless root canals to smile makeovers with state-of-the-art technology.",
};

export const heroStats = [
  { value: "15+", label: "Years Experience", icon: Award },
  { value: "10,000+", label: "Happy Smiles", icon: Users },
  { value: "4.9 ★", label: "Patient Rating", icon: Star },
  { value: "100%", label: "Sterilized & Safe", icon: ShieldCheck },
];

export const quickTreatmentEstimator = [
  {
    id: "pain",
    title: "Tooth Pain / Root Canal",
    emoji: "⚡",
    duration: "Single Sitting (~45 mins)",
    solution: "Painless rotary RCT with computerized local anesthesia for immediate relief.",
    serviceKey: "pain",
    tag: "Immediate Relief"
  },
  {
    id: "cleaning",
    title: "Cleaning & Polishing",
    emoji: "✨",
    duration: "20 - 30 mins",
    solution: "Advanced ultrasonic scaler for gentle plaque removal and fresh breath.",
    serviceKey: "cleaning",
    tag: "Preventive Care"
  },
  {
    id: "whitening",
    title: "Teeth Whitening",
    emoji: "💎",
    duration: "40 - 50 mins",
    solution: "Medical-grade cosmetic laser whitening for up to 6 shades brighter smile.",
    serviceKey: "whitening",
    tag: "Smile Makeover"
  },
  {
    id: "implants",
    title: "Dental Implants / Crown",
    emoji: "🦷",
    duration: "Permanent Fix",
    solution: "High-grade titanium & zirconia crowns matching your natural teeth perfectly.",
    serviceKey: "other",
    tag: "Restorative"
  },
  {
    id: "aligners",
    title: "Clear Aligners / Braces",
    emoji: "😁",
    duration: "Custom Aligners",
    solution: "Invisible, comfortable teeth straightening without uncomfortable metal wires.",
    serviceKey: "general",
    tag: "Orthodontics"
  }
];

export const safetyHighlights = [
  {
    title: "100% Class-B Sterilization",
    desc: "Autoclave sterilized instruments in sealed pouches for complete hygiene.",
    icon: ShieldCheck,
  },
  {
    title: "Digital Low-Dose X-Ray",
    desc: "Instant high-definition 3D diagnostics with minimal radiation.",
    icon: Stethoscope,
  },
  {
    title: "Painless Anesthesia",
    desc: "Computer-assisted gentle numbing technology for anxiety-free visits.",
    icon: HeartPulse,
  },
  {
    title: "Patient-First Care",
    desc: "Transparent treatment plans, clear pricing, and zero rush consultations.",
    icon: Smile,
  }
];

export const trustPoints = [
  "100% Painless & gentle procedures",
  "Modern digital equipment & 3D diagnostics",
  "Strict hospital-grade sterilization protocols",
  "Same-day emergency appointments"
];

export const whyChooseUs = [
  { title: "Patient-Centered Care", icon: Smile, desc: "We prioritize your comfort, transparent pricing, and gentle treatments at every step." },
  { title: "Modern Dental Technology", icon: Sparkles, desc: "Equipped with state-of-the-art digital imaging and rotary endodontics for painless care." },
  { title: "Transparent Treatment Plans", icon: CheckCircle, desc: "Clear explanations of your dental options with no hidden surprises." },
  { title: "Convenient Scheduling", icon: Clock, desc: "Easy appointment booking via website, direct call, or instant WhatsApp support." },
];

export const faqs = [
  { question: "How can I book an appointment?", answer: "You can book an appointment by filling out the online form on this website, messaging us directly on WhatsApp, or calling our clinic at +91 94235 17934." },
  { question: "What should I do if I have severe tooth pain?", answer: "Severe tooth pain indicates acute nerve irritation or infection. Please contact our clinic immediately for same-day emergency relief. We prioritize acute pain cases." },
  { question: "Are root canal treatments painful at Om Dental Clinic?", answer: "No! With modern computerized local anesthesia and rotary endodontics, root canals today are virtually painless and often completed in a single comfortable sitting." },
  { question: "How often should I get a dental checkup & cleaning?", answer: "We recommend a routine dental checkup and ultrasonic cleaning every 6 months to prevent cavities, gum disease, and tartar buildup." },
  { question: "Do you offer treatments for children and elderly patients?", answer: "Yes, Dr. Pravin Pawar provides comprehensive family dental care, pediatric treatments in a friendly setting, and specialized geriatric dental solutions including dentures and implants." },
  { question: "What are your clinic operating hours?", answer: "We are open Monday to Saturday from 10:00 AM to 9:00 PM. Sunday consultations are available on prior appointment." },
];
