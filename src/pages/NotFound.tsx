import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, ArrowLeft, Sparkles } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xl">
        <div className="w-16 h-16 rounded-full bg-[#FEF9EE] dark:bg-[#282010] text-[#C59B27] flex items-center justify-center mx-auto border border-[#C59B27]/40 shadow-sm">
          <Crown className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27]">
            404 Error • Atelier Page Not Found
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
            This Design Does Not Exist
          </h1>
          <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC] leading-relaxed">
            The page or artist profile you are seeking may have been moved or updated. Let’s return you to the main collections.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#064E3B] text-white text-xs font-bold hover:bg-[#022C22] transition-colors"
          >
            Return to Home
          </Link>
          <Link
            to="/artists"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#EFE7DA] dark:border-[#1F362E] text-xs font-semibold text-[#1A2421] dark:text-[#F8F5EE] hover:bg-black/5"
          >
            Explore Artists
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
