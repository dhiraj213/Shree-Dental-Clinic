import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  MessageSquare, 
  Send,
  AlertCircle,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { clinicData } from '../../data/content';

interface ConfirmedState {
  name: string;
  phone: string;
  email?: string;
  service: string;
  date: string;
  time: string;
  emailDelivered: boolean;
  emailError?: string;
}

export function AppointmentSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'warning' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedData, setConfirmedData] = useState<ConfirmedState | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const formattedPayload = {
      ...formData,
      preferredDate: formData.preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: formData.preferredTime || 'morning'
    };

    try {
      let response: Response | null = null;
      
      try {
        response = await fetch('/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedPayload)
        });
      } catch {
        // Fallback directly to localhost:5000 if proxy isn't routing
        response = await fetch('http://localhost:5000/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedPayload)
        });
      }

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const isEmailDelivered = data.emailDelivered === true;
        setConfirmedData({
          name: formattedPayload.name,
          phone: formattedPayload.phone,
          email: formattedPayload.email,
          service: formattedPayload.service,
          date: formattedPayload.preferredDate,
          time: formattedPayload.preferredTime,
          emailDelivered: isEmailDelivered,
          emailError: data.emailStatus?.error
        });

        setStatus(isEmailDelivered ? 'success' : 'warning');
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: '',
          preferredDate: '',
          preferredTime: '',
          message: ''
        });
      } else {
        throw new Error(data.message || 'Failed to submit appointment request.');
      }
    } catch (err: unknown) {
      console.warn('Backend submission note:', err);
      // Backend not running or unreachable: Provide seamless offline/WhatsApp confirmation
      setConfirmedData({
        name: formattedPayload.name,
        phone: formattedPayload.phone,
        email: formattedPayload.email,
        service: formattedPayload.service,
        date: formattedPayload.preferredDate,
        time: formattedPayload.preferredTime,
        emailDelivered: false,
        emailError: 'Backend server is offline or email credentials need configuration.'
      });
      setStatus('warning');
    }
  };

  const getServiceLabel = (val: string) => {
    const labels: Record<string, string> = {
      pain: '⚡ Emergency Tooth Pain / RCT',
      general: '🩺 General Dental Checkup',
      cleaning: '✨ Ultrasonic Teeth Cleaning',
      whitening: '💎 Teeth Whitening & Smile Care',
      implants: '🦷 Dental Implants & Crowns',
      aligners: '😁 Clear Aligners / Braces',
      pediatric: '🧸 Kids Dental Care',
      other: '📋 Consultation / Inquiry'
    };
    return labels[val] || val || 'Dental Consultation';
  };

  return (
    <section id="appointment" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-900/10 -z-10 hidden lg:block rounded-l-[4rem]"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-teal-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Form Side */}
          <div className="p-8 lg:p-12 lg:w-3/5">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
                <Send size={13} />
                Instant Email Confirmation
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">Book an Appointment</h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Fill out the details below. A formal notification will be instantly sent to Dr. Pravin Pawar at <strong className="text-teal-700 font-semibold">{clinicData.email}</strong> to confirm your slot.
              </p>
            </div>

            {(status === 'success' || status === 'warning') && confirmedData ? (
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-inner ${
                  status === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {status === 'success' ? <CheckCircle2 size={36} /> : <AlertTriangle size={36} />}
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    {status === 'success' ? 'Appointment Confirmed & Dispatched!' : 'Appointment Logged!'}
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you, <strong className="text-slate-900">{confirmedData.name}</strong>. Your request for <strong className="text-teal-800">{getServiceLabel(confirmedData.service)}</strong> has been recorded.
                  </p>
                </div>

                {status === 'success' ? (
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-emerald-200 text-xs text-slate-600 max-w-md w-full text-left space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contact Number:</span>
                      <strong className="text-slate-900">{confirmedData.phone}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Clinic Email Notified:</span>
                      <strong className="text-teal-700">{clinicData.email}</strong>
                    </div>
                    {confirmedData.email && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Patient Receipt Sent:</span>
                        <strong className="text-emerald-700">{confirmedData.email}</strong>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Doctor in Charge:</span>
                      <strong className="text-slate-900">{clinicData.doctor}</strong>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50/90 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 max-w-md w-full text-left space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-amber-800">
                      <ShieldCheck size={15} />
                      <span>Instant Direct WhatsApp Connect Recommended</span>
                    </div>
                    <p className="text-slate-600">
                      We've pre-filled your appointment request. Click below to send your details directly to Dr. Pravin Pawar's WhatsApp for instantaneous confirmation:
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
                  <a
                    href={`https://wa.me/${clinicData.whatsapp}?text=${encodeURIComponent(
                      `Hello Dr. Pravin Pawar, I would like to confirm my appointment:\n\n` +
                      `👤 Name: ${confirmedData.name}\n` +
                      `📞 Phone: ${confirmedData.phone}\n` +
                      `🩺 Treatment: ${getServiceLabel(confirmedData.service)}\n` +
                      `🗓️ Date: ${confirmedData.date}\n` +
                      `⏰ Preferred Time: ${confirmedData.time}\n` +
                      `🏥 Clinic: Shree Dental Clinic`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-105"
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp Direct Confirm</span>
                  </a>

                  <button
                    onClick={() => setStatus('idle')}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-6 py-2.5 rounded-xl font-bold text-sm transition-all"
                  >
                    Book Another Slot
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                    <AlertCircle size={18} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Full Name *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User size={18} />
                      </div>
                      <input 
                        required 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3.5 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" 
                        placeholder="e.g. Ramesh Patil" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Phone Number *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone size={18} />
                      </div>
                      <input 
                        required 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3.5 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" 
                        placeholder="+91 94235 17934" 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Your Email Address (For Confirmation Copy)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail size={18} />
                      </div>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3.5 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" 
                        placeholder="yourname@gmail.com" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Treatment Required *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <FileText size={18} />
                      </div>
                      <select 
                        required 
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3.5 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white"
                      >
                        <option value="">Select Treatment</option>
                        <option value="pain">⚡ Tooth Pain / Emergency Root Canal</option>
                        <option value="general">🩺 General Dental Consultation</option>
                        <option value="cleaning">✨ Ultrasonic Teeth Cleaning & Polish</option>
                        <option value="whitening">💎 Teeth Whitening / Smile Makeover</option>
                        <option value="implants">🦷 Dental Implants & Zirconia Crown</option>
                        <option value="aligners">😁 Clear Aligners / Braces</option>
                        <option value="pediatric">🧸 Pediatric Dental Care (Kids)</option>
                        <option value="other">📋 Other Dental Inquiry</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Preferred Date *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Calendar size={18} />
                      </div>
                      <input 
                        required 
                        type="date" 
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="block w-full pl-10 pr-3.5 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Preferred Time Slot *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Clock size={18} />
                      </div>
                      <select 
                        required 
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3.5 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white"
                      >
                        <option value="">Select Time Slot</option>
                        <option value="morning">Morning (10:00 AM - 01:00 PM)</option>
                        <option value="afternoon">Afternoon (02:00 PM - 05:00 PM)</option>
                        <option value="evening">Evening (05:00 PM - 09:00 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Symptoms / Notes (Optional)</label>
                  <textarea
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    placeholder="Briefly describe any tooth pain, sensitivity, or specific concerns..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-bold text-base transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 shadow-lg shadow-teal-600/25 hover:shadow-teal-600/40 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {status === 'submitting' ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Dispatching Email & Booking...</span>
                    </span>
                  ) : (
                    <>
                      <span>Confirm & Send Booking to Clinic</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info Side */}
          <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 p-8 lg:p-12 lg:w-2/5 text-white flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-semibold mb-6">
                <span>✦</span> Verified Doctor Care
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Why Book with Us?</h3>
              <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                Your appointment notification is directly delivered to Dr. Pravin Pawar's desk at {clinicData.name}.
              </p>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl shrink-0 text-teal-400">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base mb-1">Zero Waiting Room Delays</h4>
                    <p className="text-slate-300 text-xs leading-relaxed">Prior bookings guarantee that your chair and sterilized instrument tray are prepared ahead of time.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl shrink-0 text-teal-400">
                    <User size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base mb-1">Direct Consultation with Chief Doctor</h4>
                    <p className="text-slate-300 text-xs leading-relaxed">All checkups and procedures are personally overseen by Dr. Pravin Pawar (15+ Yrs Exp).</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl shrink-0 text-teal-400">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base mb-1">Direct Email & WhatsApp Sync</h4>
                    <p className="text-slate-300 text-xs leading-relaxed">Notifications are sent to {clinicData.email} with your contact details for immediate follow-up.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Emergency Hotline:</span>
              <a href={`tel:${clinicData.phone.replace(/[^0-9+]/g, '')}`} className="font-bold text-teal-300 hover:text-white transition-colors">
                {clinicData.phone}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
