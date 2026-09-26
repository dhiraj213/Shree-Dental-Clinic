import { ArrowRight, Sparkles, Stethoscope, ShieldCheck, Smile } from 'lucide-react';

const services = [
  {
    title: 'General Dentistry',
    description: 'Routine check-ups, cleanings, and preventive care to maintain optimal oral health.',
    icon: Stethoscope,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Cosmetic Treatments',
    description: 'Teeth whitening, veneers, and smile makeovers for a confident appearance.',
    icon: Sparkles,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Restorative Care',
    description: 'Crowns, bridges, implants, and root canals to restore function and aesthetics.',
    icon: ShieldCheck,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Pediatric Dentistry',
    description: 'Gentle, friendly dental care specialized for children and their developing smiles.',
    icon: Smile,
    color: 'bg-orange-50 text-orange-600',
  }
];

export function ServicesPreview() {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-accent font-semibold tracking-wide uppercase mb-3">Our Services</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-primary">
              Comprehensive Dental Solutions
            </h3>
          </div>
          <a href="#appointment" className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-hover transition-colors">
            View All Services <ArrowRight size={20} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${service.color}`}>
                  <Icon size={24} />
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">{service.title}</h4>
                <p className="text-slate-600 mb-6 line-clamp-3">
                  {service.description}
                </p>
                <a href="#appointment" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition-colors">
                  Learn more <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
