import { whyChooseUs } from '../../data/content';

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-accent font-semibold tracking-wide uppercase mb-3">Why Choose Us</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Committed to Excellence in Dental Care
          </h3>
          <p className="text-lg text-slate-600">
            We combine advanced dental technology with a compassionate approach to ensure you receive the best possible care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg hover:border-accent/20 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <Icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-primary mb-3">{item.title}</h4>
                <p className="text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
