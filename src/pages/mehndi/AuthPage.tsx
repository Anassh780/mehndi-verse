import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowRight, Check, User, Sparkles } from 'lucide-react';
import { useMehndiAuth } from '@/context/MehndiAuthContext';
import { UserRole } from '@/types/mehndi';

export const AuthPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginWithEmail, loginAsCustomer, loginAsArtist } = useMehndiAuth();

  const isSignUp = location.pathname.includes('signup');
  const [role, setRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      loginWithEmail(email || (role === 'artist' ? 'ayesha@atelier.com' : 'bride@atelier.com'), role);
      setIsSubmitting(false);
      navigate(role === 'artist' ? '/artist-dashboard' : '/customer-dashboard');
    }, 600);
  };

  const handleDemoBride = () => {
    loginAsCustomer();
    navigate('/customer-dashboard');
  };

  const handleDemoArtist = () => {
    loginAsArtist();
    navigate('/artist-dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden card bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] shadow-xl">
        
        {/* Left Editorial Visual (5 Cols) */}
        <div className="hidden lg:block lg:col-span-5 relative bg-[#1b1815] text-[#f7f1e6] p-10 flex flex-col justify-between overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=800&q=80"
            alt="Atelier"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a227]">
              Zari & Henna Atelier
            </span>
            <h2 className="font-serif-editorial text-2xl font-bold leading-snug">
              The Global Bridal Henna Marketplace.
            </h2>
          </div>

          <div className="relative z-10 space-y-2 pt-12 text-xs text-[#f7f1e6]/70">
            <p>· Certified 100% natural botanical henna</p>
            <p>· Escrow deposit protection on all dates</p>
            <p>· Vetted master artisans across Dubai, London & NY</p>
          </div>
        </div>

        {/* Right Form (7 Cols) */}
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 bg-[#f7f1e6]">
          
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9c4221] block">
              {isSignUp ? 'Create Atelier Account' : 'Welcome to Atelier'}
            </span>
            <h1 className="font-serif-editorial text-3xl font-bold text-[#1b1815]">
              {isSignUp ? 'Join the Atelier' : 'Sign in to Your Account'}
            </h1>
            <p className="text-xs text-[#2c2620]/75">
              {isSignUp
                ? 'Commission master artists or list your bridal studio services.'
                : 'Access your appointments, saved portfolios, or artist studio.'}
            </p>
          </div>

          {/* Role Toggle */}
          <div className="p-1 rounded-xl bg-[#efe6d4] border border-[rgba(27,24,21,0.12)] grid grid-cols-2 gap-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                role === 'customer'
                  ? 'bg-[#f7f1e6] text-[#1b1815] shadow-xs'
                  : 'text-[#2c2620]/70'
              }`}
            >
              I am a Bride / Client
            </button>
            <button
              type="button"
              onClick={() => setRole('artist')}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                role === 'artist'
                  ? 'bg-[#f7f1e6] text-[#1b1815] shadow-xs'
                  : 'text-[#2c2620]/70'
              }`}
            >
              I am a Mehndi Artist
            </button>
          </div>

          {/* Main Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {isSignUp && (
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider block text-[#1b1815]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder={role === 'artist' ? 'e.g. Ayesha Noor Khan' : 'e.g. Suhana Patel'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815] focus:outline-none focus:border-[#9c4221]"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block text-[#1b1815]">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="bride@atelier.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815] focus:outline-none focus:border-[#9c4221]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block text-[#1b1815]">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815] focus:outline-none focus:border-[#9c4221]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full !py-3"
            >
              <span>{isSubmitting ? 'Authenticating...' : isSignUp ? 'Create Atelier Account' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* 1-Click Instant Demo Credentials */}
          <div className="pt-4 border-t border-[rgba(27,24,21,0.1)] space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#2c2620]/60 text-center">
              Quick Test Sign-In
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={handleDemoBride}
                className="btn btn-ghost !py-2 !px-3 text-center !rounded-xl"
              >
                Enter as <strong>Bride</strong>
              </button>
              <button
                type="button"
                onClick={handleDemoArtist}
                className="btn btn-primary !py-2 !px-3 text-center !rounded-xl"
              >
                Enter as <strong>Artist</strong>
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-[#2c2620]/75">
            {isSignUp ? (
              <>Already have an account? <Link to="/login" className="font-bold text-[#1b1815] underline">Sign in</Link></>
            ) : (
              <>New to Zari & Henna? <Link to="/signup" className="font-bold text-[#1b1815] underline">Create an account</Link></>
            )}
          </p>

        </div>

      </div>

    </div>
  );
};
