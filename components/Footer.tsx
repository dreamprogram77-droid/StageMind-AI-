
import React from 'react';
import { Twitter, Linkedin, Github, Heart, Globe, Mail } from 'lucide-react';
import { ViewType } from '../App';
import Logo from './Logo';

interface FooterProps {
  onNavigate?: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#070D17] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-electric-teal/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-right">
          <div className="col-span-1 lg:col-span-1">
            <button 
              onClick={() => onNavigate?.('home')}
              className="flex items-center gap-4 mb-8 group hover:opacity-80 transition-all"
            >
              <Logo size="sm" />
              <div className="flex flex-col items-start justify-center">
                <span className="text-2xl font-black text-white tracking-tighter font-plex">StageMind AI</span>
                <span className="text-[8px] text-electric-teal font-black uppercase tracking-[0.3em]">Next-Gen Theatre OS</span>
              </div>
            </button>
            <p className="text-gray-400 leading-relaxed mb-8 text-sm font-medium">
              نحن نعيد صياغة تجربة المسرح من خلال تحويل كل مقعد وكل لحظة إلى بيانات ذكية تساعد في نمو الفن وازدهار الثقافة.
            </p>
          </div>

          <div>
            <h4 className="font-black mb-8 text-white uppercase text-xs tracking-[0.3em] opacity-40">المنتج</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-bold">
              <li><button onClick={() => onNavigate?.('product')} className="hover:text-electric-teal transition-colors">كيف يعمل؟</button></li>
              <li><button onClick={() => onNavigate?.('features')} className="hover:text-electric-teal transition-colors">الميزات التقنية</button></li>
              <li><button onClick={() => onNavigate?.('solutions')} className="hover:text-electric-teal transition-colors">الحلول المخصصة</button></li>
              <li><button onClick={() => onNavigate?.('pricing')} className="hover:text-electric-teal transition-colors">خطط الاشتراك</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 text-white uppercase text-xs tracking-[0.3em] opacity-40">المؤسسة</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-bold">
              <li><button onClick={() => onNavigate?.('about')} className="hover:text-electric-teal transition-colors">قصتنا</button></li>
              <li><button onClick={() => onNavigate?.('blog')} className="hover:text-electric-teal transition-colors">المدونة</button></li>
              <li><button onClick={() => onNavigate?.('jobs')} className="hover:text-electric-teal transition-colors">انضم للفريق</button></li>
              <li><button onClick={() => onNavigate?.('contact')} className="hover:text-electric-teal transition-colors">تواصل معنا</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 text-white uppercase text-xs tracking-[0.3em] opacity-40">تواصل استراتيجياً</h4>
            <div className="space-y-6">
               <div className="flex items-center gap-4 justify-end group cursor-pointer">
                  <span className="text-sm font-bold text-gray-500 group-hover:text-white transition-colors">sales@stagemind.ai</span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-electric-teal/30 transition-all"><Mail className="w-4 h-4 text-gray-400 group-hover:text-electric-teal" /></div>
               </div>
               <div className="flex items-center gap-4 justify-end group cursor-pointer">
                  <span className="text-sm font-bold text-gray-500 group-hover:text-white transition-colors">دبي، الإمارات العربية المتحدة</span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-electric-teal/30 transition-all"><Globe className="w-4 h-4 text-gray-400 group-hover:text-electric-teal" /></div>
               </div>
            </div>
          </div>
        </div>

        {/* Dedicated Social & Bottom Section */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Social Media Section */}
          <div className="flex flex-col items-center md:items-start gap-4 order-3 md:order-1">
             <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-2 font-plex">قسم التواصل الاجتماعي</span>
             <div className="flex gap-4">
                {[
                  { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', link: '#' },
                  { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', link: '#' },
                  { icon: <Github className="w-5 h-5" />, label: 'GitHub', link: '#' }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.link} 
                    aria-label={social.label}
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-electric-teal hover:border-electric-teal hover:shadow-[0_0_20px_rgba(100,255,218,0.3)] hover:-translate-y-1 transition-all duration-300 group"
                  >
                    {React.cloneElement(social.icon as React.ReactElement, { className: "w-5 h-5 transition-transform group-hover:scale-110" })}
                  </a>
                ))}
             </div>
          </div>

          {/* Slogan Section */}
          <div className="flex flex-col items-center text-center order-1 md:order-2">
            <p className="text-lg font-black text-white font-plex tracking-tight italic">
              "StageMind AI: حيث تلتقي البيانات بجماليات الإبداع"
            </p>
            <div className="flex items-center gap-2 mt-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              <span>صنع بكل</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
              <span>لدعم المسرح العربي</span>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="flex flex-col items-center md:items-end order-2 md:order-3">
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] font-plex mb-2">
              &copy; {new Date().getFullYear()} StageMind AI Enterprise
            </p>
            <div className="flex gap-6 text-[9px] font-black text-gray-600 uppercase tracking-widest">
              <button onClick={() => onNavigate?.('privacy')} className="hover:text-electric-teal transition-colors">الخصوصية</button>
              <button onClick={() => onNavigate?.('terms')} className="hover:text-electric-teal transition-colors">الشروط</button>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
