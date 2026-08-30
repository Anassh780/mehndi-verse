import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Crown, 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { useMehndiAuth } from '@/context/MehndiAuthContext';
import { UserRole } from '@/types/mehndi';

export const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginAsCustomer, loginAsArtist, loginWithEmail } = useMehndiAuth();

  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const initialRole = (searchParams.get('role') as UserRole) || 'customer';

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [role, setRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setSuccessNotice(true);
      return;
    }

    if (email) {
      loginWithEmail(email, role);
      if (role === 'artist') {
        navigate('/artist-dashboard');
      } else {
        navigate('/customer-dashboard');
      }
    }
  };

  const handleDemoCustomer = () => {
    loginAsCustomer();
    navigate('/customer-dashboard');
  };

  const handleDemoArtist = () => {
    loginAsArtist();
    navigate('/artist-dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Outer Double-Bezel Card Container */}
      <div className="w-full max-w-5xl rounded-[3rem] p-2 bg-gradient-to-b from-[#EFE7DA] via-[#FEF9EE] to-[#EFE7DA] dark:from-[#1F362E] dark:to-[#07100D] border border-[#C59B27]/40 shadow-2xl overflow-hidden">
        
        {/* Split Grid */}
        <div className="rounded-[calc(3rem-0.5rem)] bg-white dark:bg-[#0E1A16] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          
          {/* Left Visual Editorial Area */}
          <div className="lg:col-span-5 relative bg-gray-900 p-8 sm:p-10 text-white flex flex-col justify-between overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=1000&q=80"
              alt="Bridal Luxury Mehndi Art"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B] via-black/50 to-black/80" />

            <div className="relative z-10 space-y-4">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#C59B27] flex items-center justify-center text-black">
                  <Crown className="w-4 h-4" />
                </div>
                <span className="font-serif font-bold text-lg text-[#E5C07B]">ZARI & HENNA</span>
              </Link>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                Where Timeless Heritage Meets Modern Bridal Luxury.
              </h2>
            </div>

            <div className="relative z-10 space-y-3 pt-8">
              <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 text-xs text-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-[#34D399] font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Certified Organic Henna Pledge</span>
                </div>
                <p className="text-[11px] text-gray-300">
                  Every artist in our network is vetted for chemical-free pure henna formulations.
                </p>
              </div>

              {/* Instant 1-Click Demo Buttons */}
              <div className="pt-2">
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#E5C07B] mb-2">
                  ⚡ 1-Click Quick Demo Access:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleDemoCustomer}
                    className="py-2.5 px-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition-all text-center border border-white/30"
                  >
                    Enter as Bride
                  </button>
                  <button
                    onClick={handleDemoArtist}
                    className="py-2.5 px-3 rounded-xl bg-[#C59B27] text-black text-xs font-bold hover:bg-[#E5C07B] transition-all text-center"
                  >
                    Enter as Artist
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Form Area */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white dark:bg-[#0E1A16]">
            
            <div>
              {/* Role Switcher Pill */}
              <div className="flex items-center justify-center p-1 rounded-full bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] max-w-xs mx-auto mb-6">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                    role === 'customer'
                      ? 'bg-[#064E3B] text-white shadow-xs'
                      : 'text-[#5C6763] dark:text-[#B2C2BC]'
                  }`}
                >
                  I'm a Bride / Client
                </button>
                <button
                  type="button"
                  onClick={() => setRole('artist')}
                  className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                    role === 'artist'
                      ? 'bg-[#064E3B] text-white shadow-xs'
                      : 'text-[#5C6763] dark:text-[#B2C2BC]'
                  }`}
                >
                  I'm a Mehndi Artist
                </button>
              </div>

              {/* Title & Mode Toggles */}
              <div className="text-center space-y-1 mb-6">
                <h3 className="font-serif text-2xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                  {mode === 'login' ? 'Welcome Back to the Atelier' : mode === 'signup' ? 'Create Your Account' : 'Reset Password'}
                </h3>
                <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                  {role === 'artist' ? 'Access your Mehndi SaaS command center' : 'Book and manage your luxury bridal appointments'}
                </p>
              </div>

              {/* Success Notice for Password Reset */}
              {successNotice && (
                <div className="p-4 rounded-2xl bg-[#ECFDF5] text-[#064E3B] text-xs font-medium border border-[#10B981]/30 mb-4 flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  <span>Password reset link sent to your email address.</span>
                </div>
              )}

              {/* Main Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {mode === 'signup' && (
                  <div>
                    <label className="text-[11px] font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="bride@luxuryweddings.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-bold text-[#1A2421] dark:text-[#F8F5EE]">Password</label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setMode('forgot')}
                          className="text-[11px] text-[#C59B27] hover:underline"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#064E3B] to-[#0D6951] text-white font-bold text-xs hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md mt-2 flex items-center justify-center gap-2"
                >
                  <span>{mode === 'login' ? 'Sign In to Account' : mode === 'signup' ? 'Complete Registration' : 'Send Reset Link'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            </div>

            {/* Bottom Switcher */}
            <div className="pt-6 border-t border-[#EFE7DA] dark:border-[#1F362E] text-center text-xs text-[#5C6763] dark:text-[#B2C2BC]">
              {mode === 'login' ? (
                <p>
                  Don't have an account yet?{' '}
                  <button onClick={() => setMode('signup')} className="font-bold text-[#064E3B] dark:text-[#E5C07B] hover:underline">
                    Create Account
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setMode('login')} className="font-bold text-[#064E3B] dark:text-[#E5C07B] hover:underline">
                    Sign In
                  </button>
                </p>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
