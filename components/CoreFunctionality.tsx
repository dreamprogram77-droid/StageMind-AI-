
import React from 'react';
import { BarChart3, Rocket, Users, ShieldCheck, Zap, ArrowDown } from 'lucide-react';

const CoreFunctionality: React.FC = () => {
  const pillars = [
    {
      title: "الذكاء التحليلي",
      desc: "تحليل لحظي لكل حركة داخل المسرح وتحويلها إلى بيانات مفهومة.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "text-electric-teal",
      bg: "bg-electric-teal/10",
      border: "border-electric-teal/20"
    },
    {
      title: "التسعير المرن",
      desc: "خوارزميات ترفع أرباحك تلقائياً عبر موازنة العرض والطلب في كل ثانية.",
      icon: <Rocket className="w-8 h-8" />,
      color: "text-amber-gold",
      bg: "bg-amber-gold/10",
      border: "border-amber-gold/20"
    },
    {
      title: "إدارة التدفق",
      desc: "بوابات ذكية تمنع التكدس وتضمن تجربة دخول انسيابية تليق بجمهورك.",
      icon: <ShieldCheck className="w-8 h-8" />,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20"
    },
    {
      title: "رؤى الجمهور",
      desc: "فهم عميق لتفضيلات الزوار لبناء محتوى فني يحقق أعلى نسب إشغال.",
      icon: <Users className="w-8 h-8" />,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A192F]">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(100,255,218,0.02),transparent)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <Zap className="w-3.5 h-3.5 text-electric-teal animate-pulse" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] font-plex">The Core Pillars | الركائز الأساسية</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white font-plex">
            كيف نصنع <span className="text-electric-teal">الفارق التشغيلي؟</span>
          </h2>
          <div className="flex justify-center pt-4">
            <ArrowDown className="w-6 h-6 text-gray-700 animate-bounce" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, i) => (
            <div 
              key={i}
              className={`glass-card p-10 rounded-[44px] border ${pillar.border} hover:bg-white/[0.03] transition-all duration-700 group cursor-default text-right relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`w-16 h-16 rounded-3xl ${pillar.bg} ${pillar.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl border ${pillar.border}`}>
                {pillar.icon}
              </div>
              
              <h3 className="text-2xl font-black text-white mb-4 font-plex group-hover:text-electric-teal transition-colors">
                {pillar.title}
              </h3>
              
              <p className="text-gray-400 font-medium leading-relaxed group-hover:text-gray-300 transition-colors">
                {pillar.desc}
              </p>

              {/* Hover Indicator */}
              <div className="mt-8 h-1 w-12 bg-gray-800 rounded-full group-hover:w-full group-hover:bg-electric-teal transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreFunctionality;
