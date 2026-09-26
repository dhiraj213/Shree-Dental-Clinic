import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { clinicData } from '../../data/content';

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-accent">✦</span>
              {clinicData.name}
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Premium dental care focused on your comfort, oral health, and beautiful smile.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <div className="space-y-4 text-slate-300">
              <p className="flex items-start gap-3">
                <MapPin className="text-accent shrink-0 mt-1" size={20} />
                <span>{clinicData.address.replace(/[\[\]]/g, '')}</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="text-accent shrink-0" size={20} />
                <span>{clinicData.phone.replace(/[\[\]]/g, '')}</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="text-accent shrink-0" size={20} />
                <span>{clinicData.email}</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'Why Us', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-slate-300 hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Opening Hours</h4>
            <div className="flex items-start gap-3 text-slate-300">
              <Clock className="text-accent shrink-0 mt-1" size={20} />
              <p className="whitespace-pre-line">
                {clinicData.openingHours.replace(' | ', '\n')}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} {clinicData.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
