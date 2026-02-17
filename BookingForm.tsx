import React, { useState } from 'react';
import { Language, BookingData } from '../types';
import { AREAS_HURGHADA, UI_TEXT } from '../constants';

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

export default BookingForm;  });

  const finalPrice = Math.round((formData.price || 0) * 1.15);

  // Функция handleSubmitDetails определена ДО return — это важно!
  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = () => {
    alert('Оплата пока в разработке. Скоро заработает!');
    // onSuccess(); // НЕ вызываем — только после реальной оплаты
  };

  const getCleanerPrefLabel = (value: string) => {
    if (value === 'female') return t.femaleCrew || 'Женский экипаж';
    if (value === 'male') return t.maleCrew || 'Мужской экипаж';
    return t.anyCrew || 'Любой экипаж';
  };

  if (step === 'payment') {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md mx-auto my-4 animate-fadeIn text-gray-800">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">💳</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">{t.payment || 'Оплата'}</h3>
          <p className="text-gray-500 text-sm mt-1">{t.serviceFee || 'Включает 15% комиссию'}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Услуга:</span>
            <span className="font-medium text-gray-900">{formData.details || 'Не указано'}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Область:</span>
            <span className="font-medium text-gray-900">{formData.area || 'Другая'}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Дата:</span>
            <span className="font-medium text-gray-900">{formData.date || 'Не указана'}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Экипаж:</span>
            <span className="font-medium text-gray-900">{getCleanerPrefLabel(formData.cleanerPreference)}</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-200 mt-2">
            <span className="font-bold text-gray-800">Итого:</span>
            <span className="font-bold text-sea-blue text-xl">{finalPrice || 0} EGP</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="block w-full py-4 bg-red-600 text-white text-center rounded-xl font-bold hover:bg-red-700 transition-all mb-3 shadow-lg"
        >
          VF Cash / Paymob
        </button>

        <button
          onClick={() => setStep('details')}
          className="block w-full py-3 text-gray-500 hover:text-gray-800 text-sm font-medium"
        >
          {t.back || 'Назад'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md mx-auto my-4 text-gray-800 animate-fadeIn">
      <h3 className="text-xl font-bold text-sea-blue mb-4">{t.fillDetails || 'Заполните детали'}</h3>
      <form onSubmit={handleSubmitDetails} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.name || 'Имя'}</label>
          <input
            required
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none text-gray-800"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.phone || 'Телефон'}</label>
          <input
            required
            type="tel"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none text-gray-800"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.area || 'Область'}</label>
          <select
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none bg-white text-gray-800"
            value={showCustomArea ? 'Other' : formData.area}
            onChange={(e) => {
              if (e.target.value === 'Other') {
                setShowCustomArea(true);
                setFormData({ ...formData, area: '' });
              } else {
                setShowCustomArea(false);
                setFormData({ ...formData, area: e.target.value });
              }
            }}
          >
            {AREAS_HURGHADA.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>

          {showCustomArea && (
            <input
              required
              type="text"
              placeholder={lang === 'ar' ? 'أدخل اسم المنطقة' : 'Введите название области'}
              className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none text-gray-800 animate-fadeIn"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              autoFocus
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.cleanerPref || 'Предпочтение экипажа'}</label>
          <select
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none bg-white text-gray-800"
            value={formData.cleanerPreference}
            onChange={(e) => setFormData({ ...formData, cleanerPreference: e.target.value })}
          >
            <option value="any">{t.anyCrew || 'Любой'}</option>
            <option value="female">{t.femaleCrew || 'Женский'}</option>
            <option value="male">{t.maleCrew || 'Мужской'}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.date || 'Дата'}</label>
          <input
            required
            type="date"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none text-gray-800"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50"
          >
            {t.back || 'Назад'}
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 rounded-xl bg-sea-blue text-white font-bold shadow-lg hover:bg-sky-700 transition-colors"
          >
            {t.payment || 'Оплата'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;  });

  const finalPrice = Math.round(formData.price * 1.15);

  // Функция определена ДО return, чтобы избежать ReferenceError
  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  // Временная заглушка оплаты (чтобы не крашилось)
  const handlePayment = () => {
    alert('Оплата пока в разработке. Скоро заработает!');
    // onSuccess(); // НЕ вызываем, чтобы не подтверждать бронь без оплаты
  };

  if (step === 'payment') {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md mx-auto my-4 animate-fadeIn text-gray-800">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">💳</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">{t.payment || 'Оплата'}</h3>
          <p className="text-gray-500 text-sm mt-1">{t.serviceFee || 'Комиссия за обслуживание'}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Услуга:</span>
            <span className="font-medium text-gray-900">{formData.details}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Область:</span>
            <span className="font-medium text-gray-900">{formData.area || 'Другая'}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Дата:</span>
            <span className="font-medium text-gray-900">{formData.date}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Экипаж:</span>
            <span className="font-medium text-gray-900">{formData.cleanerPreference === 'any' ? 'Любой' : formData.cleanerPreference}</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-200 mt-2">
            <span className="font-bold text-gray-800">Итого:</span>
            <span className="font-bold text-sea-blue text-xl">{finalPrice} EGP</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="block w-full py-4 bg-red-600 text-white text-center rounded-xl font-bold hover:bg-red-700 transition-all mb-3 shadow-lg"
        >
          VF Cash / Paymob
        </button>

        <button
          onClick={() => setStep('details')}
          className="block w-full py-3 text-gray-500 hover:text-gray-800 text-sm font-medium"
        >
          {t.back || 'Назад'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md mx-auto my-4 text-gray-800 animate-fadeIn">
      <h3 className="text-xl font-bold text-sea-blue mb-4">{t.fillDetails || 'Заполните детали'}</h3>
      <form onSubmit={handleSubmitDetails} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.name || 'Имя'}</label>
          <input
            required
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none text-gray-800"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.phone || 'Телефон'}</label>
          <input
            required
            type="tel"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none text-gray-800"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        {/* Остальные поля формы — оставляем как было */}
        {/* ... (area, cleanerPref, date и кнопки Back/Submit) ... */}

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50"
          >
            {t.back || 'Назад'}
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 rounded-xl bg-sea-blue text-white font-bold shadow-lg hover:bg-sky-700 transition-colors"
          >
            {t.payment || 'Оплата'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
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
 const handlePayment = async () => {
  try {
    const apiKey = import.meta.env.VITE_PAYMOB_API_KEY;
    const integrationId = import.meta.env.VITE_PAYMOB_INTEGRATION_ID;

    if (!apiKey || !integrationId) {
      alert("Ошибка: ключи Paymob не настроены. Свяжитесь с поддержкой.");
      return;
    }

    // 1. Создаём заказ в Paymob
    const orderResponse = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth_token: apiKey,
        delivery_needed: "false",
        amount_cents: finalPrice * 100, // цена в пиастрах (805 → 80500)
        currency: "EGP",
        items: [],
      }),
    });

    if (!orderResponse.ok) throw new Error('Ошибка создания заказа');

    const orderData = await orderResponse.json();
    const orderId = orderData.id;

    // 2. Получаем payment key
    const paymentResponse = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth_token: apiKey,
        amount_cents: finalPrice * 100,
        expiration: 3600, // 1 час
        order_id: orderId,
        billing_data: {
          email: "user@example.com", // можно заменить на реальный email клиента
          first_name: formData.name.split(' ')[0] || "Client",
          last_name: formData.name.split(' ').slice(1).join(' ') || "User",
          phone_number: formData.phone,
          city: formData.area || "Hurghada",
          country: "EGY",
          street: "Hurghada",
        },
        currency: "EGP",
        integration_id: integrationId,
      }),
    });

    if (!paymentResponse.ok) throw new Error('Ошибка получения payment key');

    const paymentData = await paymentResponse.json();
    const paymentKey = paymentData.token;

    // 3. Открываем Paymob попап (iframe)
    const popup = window.open(
      `https://accept.paymob.com/api/acceptance/iframes/${integrationId}?payment_token=${paymentKey}`,
      '_blank',
      'width=600,height=800'
    );

    if (!popup) {
      alert("Разрешите всплывающие окна в браузере!");
    }

    // Опционально: ждём закрытия попапа и подтверждаем успех (простой вариант)
    const checkPopup = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopup);
        // Здесь можно добавить проверку статуса через webhook позже
        onSuccess(); // показываем "Бронирование подтверждено"
      }
    }, 1000);

  } catch (err) {
    console.error('Paymob error:', err);
    alert("Ошибка оплаты. Попробуйте позже или свяжитесь с нами.");
  }
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
    if (!apiKey || !integrationId) {
      alert("Ошибка: ключи Paymob не настроены. Свяжитесь с поддержкой.");
      return;
    }

    console.log("Step 1: Запуск оплаты, integrationId:", integrationId);

    // 1. Создаём заказ
    const orderResponse = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: apiKey,
        delivery_needed: "false",
        amount_cents: finalPrice * 100,
        currency: "EGP",
        items: [],
      }),
    });

    if (!orderResponse.ok) {
      const errorText = await orderResponse.text();
      throw new Error(`Ошибка создания заказа: ${errorText}`);
    }

    const orderData = await orderResponse.json();
    const orderId = orderData.id;
    console.log("Step 2: Заказ создан, orderId:", orderId);

    // 2. Получаем payment key
    const paymentResponse = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: apiKey,
        amount_cents: finalPrice * 100,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          email: "user@example.com",
          first_name: formData.name.split(' ')[0] || "Client",
          last_name: formData.name.split(' ').slice(1).join(' ') || "User",
          phone_number: formData.phone,
          city: formData.area || "Hurghada",
          country: "EGY",
          street: "Hurghada",
        },
        currency: "EGP",
        integration_id: integrationId,
      }),
    });

    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text();
      throw new Error(`Ошибка payment key: ${errorText}`);
    }

    const paymentData = await paymentResponse.json();
    const paymentKey = paymentData.token;
    console.log("Step 3: Payment key получен:", paymentKey);

    // 3. Открываем попап
    const popup = window.open(
      `https://accept.paymob.com/api/acceptance/iframes/${integrationId}?payment_token=${paymentKey}`,
      '_blank',
      'width=600,height=800'
    );

    if (!popup) {
      alert("Разрешите всплывающие окна в браузере!");
      return;
    }

    // Ждём закрытия попапа (но НЕ подтверждаем успех автоматически)
    const checkPopup = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopup);
        alert("Оплата завершена или отменена. Проверьте статус в личном кабинете.");
        // НЕ вызываем onSuccess() здесь!
        // Добавим позже webhook для реального подтверждения
      }
    }, 1000);

  } catch (err) {
    console.error('Paymob error:', err);
    alert("Ошибка оплаты: " + (err.message || "Неизвестная ошибка"));
  }
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

export default BookingForm;    area: isOther ? '' : (initialArea || AREAS_HURGHADA[0]),
    date: '',
    details: initialDetails,
    price: initialPrice,
    cleanerPreference: 'any',
  });

  const finalPrice = Math.round(formData.price * 1.15); // +15% service fee

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async () => {
    try {
      const apiKey = import.meta.env.VITE_PAYMOB_API_KEY;
      const integrationId = import.meta.env.VITE_PAYMOB_INTEGRATION_ID;

      console.log('[PAYMENT] Starting payment flow');
      console.log('[PAYMENT] VITE_PAYMOB_API_KEY exists:', !!apiKey);
      console.log('[PAYMENT] VITE_PAYMOB_INTEGRATION_ID:', integrationId);

      if (!apiKey) {
        throw new Error('VITE_PAYMOB_API_KEY is missing in environment variables');
      }
      if (!integrationId) {
        throw new Error('VITE_PAYMOB_INTEGRATION_ID is missing in environment variables');
      }

      // 1. Create order
      console.log('[PAYMENT] Step 1: Creating order...');
      const orderResponse = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auth_token: apiKey,
          delivery_needed: 'false',
          amount_cents: finalPrice * 100,
          currency: 'EGP',
          items: [],
        }),
      });

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        throw new Error(`Order creation failed: ${orderResponse.status} - ${errorText}`);
      }

      const orderData = await orderResponse.json();
      const orderId = orderData.id;
      console.log('[PAYMENT] Step 2: Order created, ID:', orderId);

      // 2. Get payment key
      console.log('[PAYMENT] Step 3: Getting payment key...');
      const paymentResponse = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auth_token: apiKey,
          amount_cents: finalPrice * 100,
          expiration: 3600,
          order_id: orderId,
          billing_data: {
            email: 'user@example.com',
            first_name: formData.name.split(' ')[0] || 'Client',
            last_name: formData.name.split(' ').slice(1).join(' ') || 'User',
            phone_number: formData.phone,
            city: formData.area || 'Hurghada',
            country: 'EGY',
            street: 'Hurghada',
          },
          currency: 'EGP',
          integration_id: integrationId,
        }),
      });

      if (!paymentResponse.ok) {
        const errorText = await paymentResponse.text();
        throw new Error(`Payment key failed: ${paymentResponse.status} - ${errorText}`);
      }

      const paymentData = await paymentResponse.json();
      const paymentKey = paymentData.token;
      console.log('[PAYMENT] Step 4: Payment key received:', paymentKey.substring(0, 20) + '...');

      // 3. Open Paymob iframe popup
      console.log('[PAYMENT] Step 5: Opening Paymob popup...');
      const popup = window.open(
        `https://accept.paymob.com/api/acceptance/iframes/${integrationId}?payment_token=${paymentKey}`,
        '_blank',
        'width=600,height=800'
      );

      if (!popup) {
        alert('Popup blocked! Please allow popups for this site in your browser settings.');
        return;
      }

      // Monitor popup close (no auto success!)
      const checkPopup = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopup);
          alert('Payment window closed. Please check payment status in your Paymob dashboard or contact support.');
          // Do NOT call onSuccess() here — only real success via webhook
        }
      }, 1000);

    } catch (err: any) {
      console.error('[PAYMENT ERROR]', err);
      alert(`Payment error: ${err.message || 'Unknown error. Open F12 → Console for details.'}`);
    }
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
          onClick={(e) => {
            e.preventDefault();
            handlePayment();
          }}
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.phone}</label>
          <input
            required
            type="tel"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none text-gray-800"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                setFormData({ ...formData, area: '' });
              } else {
                setShowCustomArea(false);
                setFormData({ ...formData, area: e.target.value });
              }
            }}
          >
            {AREAS_HURGHADA.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>

          {showCustomArea && (
            <input
              required
              type="text"
              placeholder={lang === 'ar' ? 'أدخل اسم المنطقة' : 'Enter area name'}
              className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none text-gray-800 animate-fadeIn"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              autoFocus
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.cleanerPref}</label>
          <select
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none bg-white text-gray-800"
            value={formData.cleanerPreference}
            onChange={(e) => setFormData({ ...formData, cleanerPreference: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
  const finalPrice = Math.round(formData.price * 1.15); // +15% fee

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async () => {
    try {
      const apiKey = import.meta.env.VITE_PAYMOB_API_KEY;
      const integrationId = import.meta.env.VITE_PAYMOB_INTEGRATION_ID;

      console.log('handlePayment started');
      console.log('API Key exists:', !!apiKey);
      console.log('Integration ID:', integrationId);

      if (!apiKey || !integrationId) {
        alert('Ошибка: ключи Paymob не настроены. Проверьте Vercel Environment Variables.');
        return;
      }

      // 1. Создаём заказ
      console.log('Step 1: Создаём заказ...');
      const orderResponse = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auth_token: apiKey,
          delivery_needed: 'false',
          amount_cents: finalPrice * 100,
          currency: 'EGP',
          items: [],
        }),
      });

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        throw new Error(`Ошибка создания заказа: ${orderResponse.status} - ${errorText}`);
      }

      const orderData = await orderResponse.json();
      const orderId = orderData.id;
      console.log('Step 2: Заказ создан, orderId:', orderId);

      // 2. Получаем payment key
      console.log('Step 3: Получаем payment key...');
      const paymentResponse = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auth_token: apiKey,
          amount_cents: finalPrice * 100,
          expiration: 3600,
          order_id: orderId,
          billing_data: {
            email: 'user@example.com',
            first_name: formData.name.split(' ')[0] || 'Client',
            last_name: formData.name.split(' ').slice(1).join(' ') || 'User',
            phone_number: formData.phone,
            city: formData.area || 'Hurghada',
            country: 'EGY',
            street: 'Hurghada',
          },
          currency: 'EGP',
          integration_id: integrationId,
        }),
      });

      if (!paymentResponse.ok) {
        const errorText = await paymentResponse.text();
        throw new Error(`Ошибка payment key: ${paymentResponse.status} - ${errorText}`);
      }

      const paymentData = await paymentResponse.json();
      const paymentKey = paymentData.token;
      console.log('Step 4: Payment key получен:', paymentKey);

      // 3. Открываем Paymob попап
      console.log('Step 5: Открываем Paymob iframe...');
      const popup = window.open(
        `https://accept.paymob.com/api/acceptance/iframes/${integrationId}?payment_token=${paymentKey}`,
        '_blank',
        'width=600,height=800'
      );

      if (!popup) {
        alert('Разрешите всплывающие окна в браузере!');
        return;
      }

      // Ждём закрытия попапа (без автоматического успеха)
      const checkPopup = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopup);
          alert('Оплата завершена или отменена. Проверьте статус в личном кабинете или свяжитесь с нами.');
          // НЕ вызываем onSuccess() здесь!
          // Реальное подтверждение — через webhook Paymob (добавим позже)
        }
      }, 1000);

    } catch (err: any) {
      console.error('Paymob error:', err);
      alert('Ошибка оплаты: ' + (err.message || 'Неизвестная ошибка. Проверьте консоль (F12).'));
    }
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
          onClick={(e) => {
            e.preventDefault();
            handlePayment();
          }}
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.phone}</label>
          <input
            required
            type="tel"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none text-gray-800"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                setFormData({ ...formData, area: '' });
              } else {
                setShowCustomArea(false);
                setFormData({ ...formData, area: e.target.value });
              }
            }}
          >
            {AREAS_HURGHADA.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>

          {showCustomArea && (
            <input
              required
              type="text"
              placeholder={lang === 'ar' ? 'أدخل اسم المنطقة' : 'Enter area name'}
              className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none text-gray-800 animate-fadeIn"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              autoFocus
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.cleanerPref}</label>
          <select
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none bg-white text-gray-800"
            value={formData.cleanerPreference}
            onChange={(e) => setFormData({ ...formData, cleanerPreference: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
    if (!apiKey || !integrationId) {
      alert("Ошибка: ключи Paymob не настроены. Свяжитесь с поддержкой.");
      return;
    }

    console.log("Step 1: Запуск оплаты, integrationId:", integrationId);

    // 1. Создаём заказ
    const orderResponse = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: apiKey,
        delivery_needed: "false",
        amount_cents: finalPrice * 100,
        currency: "EGP",
        items: [],
      }),
    });

    if (!orderResponse.ok) {
      const errorText = await orderResponse.text();
      throw new Error(`Ошибка создания заказа: ${errorText}`);
    }

    const orderData = await orderResponse.json();
    const orderId = orderData.id;
    console.log("Step 2: Заказ создан, orderId:", orderId);

    // 2. Получаем payment key
    const paymentResponse = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: apiKey,
        amount_cents: finalPrice * 100,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          email: "user@example.com",
          first_name: formData.name.split(' ')[0] || "Client",
          last_name: formData.name.split(' ').slice(1).join(' ') || "User",
          phone_number: formData.phone,
          city: formData.area || "Hurghada",
          country: "EGY",
          street: "Hurghada",
        },
        currency: "EGP",
        integration_id: integrationId,
      }),
    });

    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text();
      throw new Error(`Ошибка payment key: ${errorText}`);
    }

    const paymentData = await paymentResponse.json();
    const paymentKey = paymentData.token;
    console.log("Step 3: Payment key получен:", paymentKey);

    // 3. Открываем попап
    const popup = window.open(
      `https://accept.paymob.com/api/acceptance/iframes/${integrationId}?payment_token=${paymentKey}`,
      '_blank',
      'width=600,height=800'
    );

    if (!popup) {
      alert("Разрешите всплывающие окна в браузере!");
      return;
    }

    // Ждём закрытия попапа (но НЕ подтверждаем успех автоматически)
    const checkPopup = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopup);
        alert("Оплата завершена или отменена. Проверьте статус в личном кабинете.");
        // НЕ вызываем onSuccess() здесь!
        // Добавим позже webhook для реального подтверждения
      }
    }, 1000);

  } catch (err) {
    console.error('Paymob error:', err);
    alert("Ошибка оплаты: " + (err.message || "Неизвестная ошибка"));
  }
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
