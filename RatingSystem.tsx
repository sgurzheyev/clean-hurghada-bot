import React, { useState } from 'react';
import { Language } from '../types';
import { UI_TEXT } from '../constants';

interface RatingSystemProps {
  lang: Language;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

const RatingSystem: React.FC<RatingSystemProps> = ({ lang, onClose, onSubmit }) => {
  const t = UI_TEXT[lang];
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit(rating, comment);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md mx-auto my-4 text-gray-800 animate-fadeIn">
       <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">⭐</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">{t.rateTitle}</h3>
          <p className="text-gray-500 text-sm mt-1">{t.rateDesc}</p>
       </div>

       <div className="flex justify-center gap-2 mb-6">
         {[1, 2, 3, 4, 5].map((star) => (
           <button
             key={star}
             type="button"
             className="text-4xl transition-transform hover:scale-110 focus:outline-none"
             onClick={() => setRating(star)}
             onMouseEnter={() => setHover(star)}
             onMouseLeave={() => setHover(0)}
           >
             <span className={`${star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-200'} transition-colors duration-200`}>
               ★
             </span>
           </button>
         ))}
       </div>
       
       {rating > 0 && (
         <p className="text-center text-sea-blue font-medium mb-4 animate-fadeIn">
           {t.stars[rating - 1]}
         </p>
       )}

       <form onSubmit={handleSubmit} className="space-y-4">
         <textarea
           className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sea-blue outline-none text-gray-800 resize-none h-24"
           placeholder={t.ratingPlaceholder}
           value={comment}
           onChange={(e) => setComment(e.target.value)}
         />

         <div className="flex gap-3">
            <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50"
            >
                {t.back}
            </button>
            <button 
                type="submit"
                disabled={rating === 0}
                className="flex-1 py-3 px-4 rounded-xl bg-sea-blue text-white font-bold shadow-lg hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {t.submitRating}
            </button>
        </div>
       </form>
    </div>
  );
};

export default RatingSystem;