import React, { useState } from 'react';
import { Language, BookingData } from '../types';
import { AREAS_HURGHADA, UI_TEXT } from './constants';

interface BookingFormProps {
  lang: Language;
  initialPrice: number;
  initialDetails: string;
  initialArea?: string;
  onSuccess: () => void;
  onBack: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ lang, initialPrice, initialDetails, initialArea, onSuccess, onBack }) => {
  const t = UI_TEXT[lang];
  const [step, setStep] = useState<'details' | 'payment'>('details');
  
  const isOther = initialArea === 'Other';
  const [showCustomArea, setShowCustomArea] = useState(isOther);
  
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    phone: '',
    area: isOther ? '' : (initialArea || AREAS_HURGHADA[0]),
    date: '',
    details: initialDetails,
    price: initialPrice,
    cleanerPreference: 'any'
  });

  const finalPrice = Math.round(formData.price * 1.15); // Adding 15% fee

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = () => {
    // Simulate payment process
    setTimeout(() => {
        onSuccess();
    }, 1500);
  };

  const getCleanerPrefLabel = (value: string) => {
    if (value === 'female') return t.femaleCrew;
    if (value === 'male') return t.maleCrew;
    return t.anyCrew;
  };

  if (step === 'payment') {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md mx-auto my-4 animate-fadeIn text-gray-800">
             <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl">💳</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{t.payment}</h3>
                <p className="text-gray-500 text-sm mt-1">{t.serviceFee}</p>
             </div>

             <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-200">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium text-gray-900">{formData.details}</span>
                </div>
                 <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Area:</span>
                    <span className="font-medium text-gray-900">{formData.area || 'Other'}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-900">{formData.date}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Crew:</span>
                    <span className="font-medium text-gray-900">{getCleanerPrefLabel(formData.cleanerPreference)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200 mt-2">
                    <span className="font-bold text-gray-800">Total:</span>
                    <span className="font-bold text-sea-blue text-xl">{finalPrice} EGP</span>
                </div>
             </div>

             <a 
                href="#"
                onClick={(e) => { e.preventDefault(); handlePayment(); }}
                className="block w-full py-4 bg-red-600 text-white text-center rounded-xl font-bold hover:bg-red-700 transition-all mb-3 shadow-lg"
             >
                VF Cash / Paymob
             </a>
             <button 
                onClick={() => setStep('details')}
                className="block w-full py-3 text-gray-500 hover:text-gray-800 text-sm font-medium"
             >
                {t.back}
             </button>
        </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md mx-auto my-4 text-gray-800 animate-fadeIn">
      <h3 className="text-xl font-bold text-sea-blue mb-4">{t.fillDetails}</h3>
      <form onSubmit={handleSubmitDetails} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.name}</label>
          <input 
            required
            type="text" 
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none text-gray-800"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.phone}</label>
          <input 
            required
            type="tel" 
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none text-gray-800"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.area}</label>
          <select 
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none bg-white text-gray-800"
            value={showCustomArea ? 'Other' : formData.area}
            onChange={(e) => {
              if (e.target.value === 'Other') {
                setShowCustomArea(true);
                setFormData({...formData, area: ''});
              } else {
                setShowCustomArea(false);
                setFormData({...formData, area: e.target.value});
              }
            }}
          >
            {AREAS_HURGHADA.map(area => <option key={area} value={area}>{area}</option>)}
          </select>
          {showCustomArea && (
            <input 
                required
                type="text"
                placeholder={lang === 'ar' ? 'أدخل اسم المنطقة' : 'Enter area name'}
                className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none text-gray-800 animate-fadeIn"
                value={formData.area}
                onChange={e => setFormData({...formData, area: e.target.value})}
                autoFocus
            />
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.cleanerPref}</label>
          <select 
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none bg-white text-gray-800"
            value={formData.cleanerPreference}
            onChange={(e) => setFormData({...formData, cleanerPreference: e.target.value})}
          >
            <option value="any">{t.anyCrew}</option>
            <option value="female">{t.femaleCrew}</option>
            <option value="male">{t.maleCrew}</option>
          </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">{t.date}</label>
            <input 
                required
                type="date"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none text-gray-800"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
            />
        </div>

        <div className="flex gap-3 mt-6">
            <button 
                type="button"
                onClick={onBack}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50"
            >
                {t.back}
            </button>
            <button 
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-sea-blue text-white font-bold shadow-lg hover:bg-sky-700 transition-colors"
            >
                {t.payment}
            </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
