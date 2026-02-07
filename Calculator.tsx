import React, { useState } from 'react';
import { PropertyType, CleaningType, Language } from './types';
import { PRICING_MATRIX, UI_TEXT, AREAS_HURGHADA } from './constants';

interface CalculatorProps {
  lang: Language;
  onBook: (price: number, details: string, area: string) => void;
  onCancel: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ lang, onBook, onCancel }) => {
  const [property, setProperty] = useState<PropertyType>(PropertyType.ONE_BED);
  const [cleaning, setCleaning] = useState<CleaningType>(CleaningType.STANDARD);
  const [sqm, setSqm] = useState('');
  const [area, setArea] = useState(AREAS_HURGHADA[0]);
  
  const calculateTotal = () => {
    let base = PRICING_MATRIX[property][cleaning];
    return base;
  };

  const price = calculateTotal();
  const t = UI_TEXT[lang];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md mx-auto my-4 text-gray-800 animate-fadeIn">
      <h3 className="text-xl font-bold text-sea-blue mb-4 flex items-center gap-2">
        <span>🧮</span> {t.calculate}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.selectType}</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(PropertyType).map((pt) => (
              <button
                key={pt}
                onClick={() => setProperty(pt)}
                className={`p-2 text-sm rounded-lg border transition-all ${
                  property === pt 
                    ? 'bg-sea-blue text-white border-sea-blue' 
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {pt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.selectClean}</label>
          <select 
            value={cleaning}
            onChange={(e) => setCleaning(e.target.value as CleaningType)}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-sea-blue outline-none text-gray-800"
          >
            {Object.values(CleaningType).map((ct) => (
              <option key={ct} value={ct}>{ct}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.area}</label>
          <select 
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-sea-blue outline-none text-gray-800"
          >
            {AREAS_HURGHADA.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
             {lang === 'ar' ? 'المساحة (متر مربع - اختياري)' : 'Area (m² - Optional)'}
          </label>
          <input 
            type="number"
            value={sqm}
            onChange={(e) => setSqm(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-sea-blue outline-none text-gray-800"
            placeholder="e.g. 90"
          />
        </div>

        <div className="pt-4 border-t border-gray-100 mt-4">
          <div className="flex justify-between items-end mb-4">
            <span className="text-gray-500">{t.total}</span>
            <span className="text-3xl font-bold text-teal-dark">{price} <span className="text-sm font-normal">EGP</span></span>
          </div>
          
          <div className="flex gap-3">
             <button 
              onClick={onCancel}
              className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50"
            >
              {t.back}
            </button>
            <button 
              onClick={() => onBook(price, `${property} - ${cleaning}${sqm ? ` (${sqm} m²)` : ''}`, area)}
              className="flex-1 py-3 px-4 rounded-xl bg-coral text-white font-bold shadow-lg shadow-orange-100 hover:bg-orange-600 transition-colors"
            >
              {t.bookNow}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
