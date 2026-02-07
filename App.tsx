import React, { useState, useEffect, useRef } from 'react';
import { generateResponse, analyzeStainImage } from './services/geminiService';
import { Message, Language } from './types';
import { UI_TEXT } from './constants';
import Calculator from './components/Calculator';
import BookingForm from './components/BookingForm';
import RatingSystem from './components/RatingSystem';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showBooking, setShowBooking] = useState<{price: number, details: string, area?: string} | null>(null);
  const [showRating, setShowRating] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = UI_TEXT[lang];

  // Initial greeting
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'model',
        text: "مرحبا! أنا بوت التنظيف في الغردقة 🧹✨ Hello! I'm your cleaning assistant in Hurghada. How can I help? (Apartments, villas, Airbnb turnover)"
      }
    ]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showCalculator, showBooking, showRating]);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const handleSendMessage = async (text: string, image?: string) => {
    if (!text && !image) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      image: image
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      let responseText = '';
      if (image) {
        responseText = await analyzeStainImage(image, text);
      } else {
        responseText = await generateResponse(text);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        handleSendMessage("Please analyze this stain or room", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const QuickAction = ({ label, action }: { label: string, action: () => void }) => (
    <button 
      onClick={action}
      className="bg-white/90 backdrop-blur-sm border border-sea-blue/20 text-sea-blue text-sm px-4 py-2 rounded-full shadow-sm hover:bg-sea-blue hover:text-white transition-all whitespace-nowrap"
    >
      {label}
    </button>
  );

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen flex flex-col bg-slate-50 font-sans ${lang === 'ar' ? 'font-arabic' : ''}`}>
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-sea-blue rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-sky-200">
              🧹
            </div>
            <div>
              <h1 className="font-bold text-gray-800 leading-tight">{t.title}</h1>
              <p className="text-xs text-gray-500 hidden sm:block">{t.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={toggleLang}
            className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-200"
          >
            {lang === 'en' ? '🇨🇦 English' : '🇪🇬 العربية'}
          </button>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 flex flex-col gap-4 overflow-y-auto pb-32">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-sea-blue text-white rounded-br-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
            }`}>
              {msg.image && (
                <img src={msg.image} alt="Upload" className="w-48 h-48 object-cover rounded-lg mb-2 border-2 border-white/20" />
              )}
              <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 flex gap-2 items-center">
              <span className="w-2 h-2 bg-sea-blue rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-sea-blue rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-sea-blue rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}

        {/* Embedded Widgets */}
        {showCalculator && (
          <Calculator 
            lang={lang} 
            onCancel={() => setShowCalculator(false)}
            onBook={(price, details, area) => {
              setShowCalculator(false);
              setShowBooking({ price, details, area });
            }}
          />
        )}

        {showBooking && (
          <BookingForm 
            lang={lang}
            initialPrice={showBooking.price}
            initialDetails={showBooking.details}
            initialArea={showBooking.area}
            onBack={() => setShowBooking(null)}
            onSuccess={() => {
              setShowBooking(null);
              setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'model',
                text: t.success
              }]);
            }}
          />
        )}

        {showRating && (
          <RatingSystem
            lang={lang}
            onClose={() => setShowRating(false)}
            onSubmit={(rating, comment) => {
              setShowRating(false);
              setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'model',
                text: `${t.ratingThanks} (${rating}/5 ⭐)\n${comment ? `"${comment}"` : ''}`
              }]);
            }}
          />
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Quick Actions & Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-10 pb-4 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Quick Actions Scroll */}
          {!showCalculator && !showBooking && !showRating && (
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-2">
              <QuickAction label={t.calcPrice} action={() => { setShowRating(false); setShowCalculator(true); }} />
              <QuickAction label={t.bookNow} action={() => { setShowRating(false); setShowCalculator(true); }} />
              <QuickAction label={t.upload} action={() => fileInputRef.current?.click()} />
              <QuickAction label={t.tips} action={() => handleSendMessage(lang === 'en' ? "Can you give me stain removal tips?" : "ممكن نصائح لإزالة البقع؟")} />
              <QuickAction label={t.rateService} action={() => { setShowCalculator(false); setShowBooking(null); setShowRating(true); }} />
              <QuickAction label={t.contact} action={() => handleSendMessage(lang === 'en' ? "How can I contact support?" : "كيف اتصل بالدعم؟")} />
            </div>
          )}

          {/* Input Bar */}
          <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-200 flex items-center gap-2">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-gray-400 hover:text-sea-blue hover:bg-sky-50 rounded-xl transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <input 
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
            
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder={t.chatPlaceholder}
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 font-medium"
            />
            
            <button 
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() && !isLoading}
              className="p-3 bg-sea-blue text-white rounded-xl shadow-md hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9-2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;