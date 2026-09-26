import { 
  Calendar, 
  PhoneCall, 
  MessageSquare, 
  CheckCircle2
} from 'lucide-react';
import { 
  clinicData, 
  heroContent, 
  heroStats
} from '../../data/content';

export function Hero() {
  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
      {/* Background ambient lighting effects */}
      <div className="absolute top-[-8%] right-[-5%] w-[480px] h-[480px] bg-teal-400/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[420px] h-[420px] bg-sky-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-emerald-400/5 rounded-full blur-2xl -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center space-y-7">
        
        {/* Live Clinic Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-teal-50 border border-teal-200/60 shadow-sm text-teal-800 text-sm font-semibold">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>{clinicData.name} • Dr. Pravin Pawar</span>
          <span className="text-xs bg-teal-600 text-white px-2.5 py-0.5 rounded-full font-medium">
            Accepting Patients
          </span>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] tracking-tight">
          Healthy Smiles. <br />
          <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
            Painless & Gentle Dental Care.
          </span>
        </h1>
        
        {/* Description */}
        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
          {heroContent.subheading}
        </p>

        {/* Key Trust Highlights */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-sm font-medium text-slate-700 max-w-2xl">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-teal-600 shrink-0" size={18} />
            <span>100% Painless Tech & Anesthesia</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-teal-600 shrink-0" size={18} />
            <span>Same-Day Emergency Relief</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-teal-600 shrink-0" size={18} />
            <span>Zero Wait Time with Booking</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-teal-600 shrink-0" size={18} />
            <span>Hospital-Grade Sterilization</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full sm:w-auto">
          <a 
            href="#appointment" 
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2.5 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg shadow-teal-600/25 hover:shadow-teal-600/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Calendar size={19} />
            <span>Book Appointment</span>
          </a>

          <a 
            href={`https://wa.me/${clinicData.whatsapp}?text=Hello%20Dr.%20Pravin%20Pawar%2C%20I%20would%20like%20to%20inquire%20about%20a%20dental%20appointment%20at%20${encodeURIComponent(clinicData.name)}.`}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-300/80 px-7 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:-translate-y-0.5"
          >
            <MessageSquare size={19} className="text-emerald-600" />
            <span>Chat on WhatsApp</span>
          </a>

          <a 
            href={`tel:${clinicData.phone.replace(/[^0-9+]/g, '')}`}
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-4 rounded-xl font-semibold text-base transition-all duration-200"
            title="Call Clinic Directly"
          >
            <PhoneCall size={19} className="text-teal-600" />
            <span>Call Now</span>
          </a>
        </div>

        {/* Stats Counter Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 pt-8 mt-4 border-t border-slate-200/80 w-full max-w-3xl">
          {heroStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-2xl sm:text-3xl tracking-tight">
                  <Icon size={20} className="text-teal-600" />
                  <span>{stat.value}</span>
                </div>
                <span className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{stat.label}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
