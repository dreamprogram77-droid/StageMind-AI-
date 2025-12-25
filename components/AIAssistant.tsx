
import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, X, MessageSquare, Sparkles, Loader2, Minimize2, User, ChevronLeft, Lightbulb, Zap, BarChart3, TrendingUp, Map, Star } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'أهلاً بك في مركز ذكاء StageMind. أنا مساعدك الرقمي المتخصص في تحويل البيانات إلى نجاح مسرحي. كيف يمكنني دعم عملياتك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (customMsg?: string) => {
    const userMessage = (customMsg || input).trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `أنت "StageMind Strategist"، المساعد الذكي الأكثر تطوراً في عالم إدارة المسارح ودور الأوبرا.
          أنت خبير في:
          1. التسعير الديناميكي (Dynamic Pricing): اشرح كيف نرفع العوائد عبر موازنة الطلب. **عندما يسألك المستخدم عن استراتيجيات التسعير، يجب أن تقدم أمثلة رقمية وسيناريوهات محددة تعتمد على البيانات التاريخية ونسب الإشغال اللحظية. مثال: "إذا كان الإشغال الحالي 75% قبل العرض بـ 48 ساعة، وكانت سرعة الحجز (Booking Velocity) أعلى بنسبة 20% من المعدل التاريخي لهذا النوع من العروض، ننصح برفع سعر التذكرة بنسبة 12% لتعظيم العائد من الـ 25% المتبقية من المقاعد."**
          2. إدارة الحشود (Crowd Control): قدم نصائح لمنع التكدس وتأمين المداخل بناءً على معدلات التدفق اللحظية.
          3. استراتيجيات الجمهور: كيف نفهم تفضيلات الزوار لزيادة الولاء وتقليل تكلفة الاستحواذ على عميل جديد.
          4. استخدام المنصة: أرشد المستخدمين لاستخدام لوحة التحكم (Dashboard) وخرائط الحرارة والتقارير التنبؤية.
          
          أسلوبك:
          - مهني، حكيم، وعملي جداً.
          - لغة عربية فصحى معاصرة وأنيقة.
          - استخدم نقاط واضحة (Bullet points) وجداول بسيطة إذا لزم الأمر لتوضيح السيناريوهات.
          - اجعل إجابتك تُلهم المستخدم لاتخاذ قرارات استباقية مبنية على البيانات.`,
          temperature: 0.7,
        },
      });

      const aiResponse = response.text || 'عذراً، لم أتمكن من معالجة هذه الفكرة الآن. هل يمكنك صياغتها بشكل آخر؟';
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error('AI Assistant Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: 'حدث اضطراب بسيط في اتصالي السحابي. يرجى المحاولة مرة أخرى بعد لحظات.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    { text: "كيف أزيد أرباح عرض الليلة؟", icon: <TrendingUp className="w-3 h-3" /> },
    { text: "خطة لمنع الزحام عند البوابات", icon: <Map className="w-3 h-3" /> },
    { text: "ما هي ميزة التنبؤ بالإقبال؟", icon: <Zap className="w-3 h-3" /> },
    { text: "تحسين تجربة الـ VIP", icon: <Star className="w-3 h-3" /> }
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 left-8 z-[200] group">
        <div className="absolute inset-0 bg-electric-teal blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
        <button 
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-electric-teal to-blue-600 text-[#0A192F] rounded-[30px] shadow-[0_20px_60px_rgba(100,255,218,0.3)] flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-rotate-12 border border-white/20 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
          <Brain className="w-8 h-8 md:w-10 md:h-10 relative z-10" />
        </button>
        <div className="absolute bottom-full left-0 mb-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 pointer-events-none">
          <div className="bg-[#0F172A] border border-electric-teal/30 text-electric-teal text-[10px] font-black py-2 px-4 rounded-xl whitespace-nowrap shadow-2xl font-plex uppercase tracking-widest">
            Brain AI Active
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-8 left-8 z-[200] w-[90vw] md:w-[450px] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${isMinimized ? 'h-20' : 'h-[600px] md:h-[750px]'} flex flex-col bg-[#0A192F]/90 backdrop-blur-3xl border border-white/10 rounded-[44px] shadow-[0_50px_150px_rgba(0,0,0,0.8)] overflow-hidden animate-in slide-in-from-bottom-20`}>
      {/* Header */}
      <div className="p-6 md:p-8 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-row-reverse">
          <div className="relative">
            <div className="bg-electric-teal/20 p-3 rounded-2xl border border-electric-teal/30">
              <Sparkles className="w-5 h-5 text-electric-teal" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-4 border-[#0A192F] animate-pulse" />
          </div>
          <div className="text-right">
            <h4 className="text-sm font-black text-white font-plex">StageMind Advisor</h4>
            <div className="flex items-center gap-2 justify-end">
               <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Enterprise Strategist</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-2.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <Minimize2 className="w-5 h-5" />
          </button>
          <button onClick={() => setIsOpen(false)} className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar scroll-smooth text-right">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                <div className={`max-w-[88%] group relative ${msg.role === 'user' ? 'order-1' : 'order-2'}`}>
                  <div className={`px-6 py-4 rounded-[28px] text-sm md:text-base leading-relaxed shadow-xl text-right font-plex ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-electric-teal to-blue-600 text-[#0A192F] font-bold rounded-tr-none' 
                      : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none backdrop-blur-md'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`flex items-center gap-2 mt-2 opacity-40 text-[9px] font-black uppercase tracking-widest text-gray-500 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'user' ? 'Operation Room' : 'AI Reasoning'}
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 px-6 py-4 rounded-[28px] border border-white/10 flex items-center gap-4">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-electric-teal rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-electric-teal rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-electric-teal rounded-full animate-bounce" />
                  </div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-plex">Processing Realtime Data...</span>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="px-6 md:px-8 pb-4">
            <div className="flex flex-wrap gap-2 justify-end">
              {suggestions.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSendMessage(s.text)}
                  className="text-[11px] font-bold bg-white/5 hover:bg-electric-teal hover:text-[#0A192F] border border-white/10 text-gray-400 px-4 py-2.5 rounded-2xl transition-all duration-300 flex items-center gap-2 flex-row-reverse group"
                >
                  <span>{s.text}</span>
                  <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 md:p-8 bg-slate-900/50 border-t border-white/5 backdrop-blur-3xl">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="اطلب استشارة تشغيلية من الذكاء الاصطناعي..."
                className="w-full bg-white/5 border border-white/10 rounded-3xl pr-6 pl-14 py-5 text-sm md:text-base focus:outline-none focus:border-electric-teal focus:ring-4 focus:ring-electric-teal/5 text-white transition-all placeholder:text-gray-500 text-right font-plex"
              />
              <button 
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-electric-teal to-blue-600 text-[#0A192F] rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-30 disabled:grayscale"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 -rotate-45 ml-0.5" />}
              </button>
            </div>
            <div className="flex items-center justify-center gap-3 mt-6 opacity-30">
              <div className="h-px flex-1 bg-white/10" />
              <p className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-500 font-plex">StageMind AI Security Tier 1</p>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAssistant;
