
import React, { useState } from 'react';
import { Phone, Lock, Eye, EyeOff, Info, ShieldCheck, Store, MessageSquare } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  logo: string | null;
  t: any;
}

const Login: React.FC<LoginProps> = ({ onLogin, logo, t }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otpValue, setOtpValue] = useState(['', '', '', '']);
  const [showPin, setShowPin] = useState(false);
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [businessName, setBusinessName] = useState('');

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) return;
    const newOtp = [...otpValue];
    newOtp[index] = val;
    setOtpValue(newOtp);

    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering && !showOtpStep) {
      if (phone && pin && businessName) {
        setShowOtpStep(true);
      }
    } else if (showOtpStep) {
      if (otpValue.every(v => v !== '')) {
        onLogin();
      }
    } else {
      if (phone && pin) {
        onLogin();
      }
    }
  };

  if (showOtpStep) {
    return (
      <div className="flex-1 flex flex-col items-center px-8 pt-20 animate-in fade-in zoom-in duration-500">
        <div className="mb-10">
          {logo ? (
            <img src={logo} alt="App Logo" className="w-24 h-24 object-contain" />
          ) : (
            <div className="w-24 h-24 bg-[#1A1A1A] rounded-3xl flex items-center justify-center border border-gray-800">
              <MessageSquare size={48} className="text-[#F59E0B]" />
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold text-center mb-4 uppercase">Verification</h1>
        <p className="text-gray-400 text-sm text-center mb-10">
          We sent a code to <span className="text-white font-bold">{phone}</span>.
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex justify-center gap-4 mb-12">
            {otpValue.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="number"
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                className="w-14 h-16 bg-[#1A1A1A] border border-gray-800 rounded-xl text-center text-2xl font-bold focus:border-[#F59E0B] outline-none"
                maxLength={1}
              />
            ))}
          </div>
          <button type="submit" className="w-full bg-[#F59E0B] text-black font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all">
            {t.save} & Start
          </button>
          <button type="button" onClick={() => setShowOtpStep(false)} className="w-full mt-6 text-gray-500 font-medium">
            Go Back
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center px-8 pt-12 animate-in fade-in duration-500">
      <div className="w-full relative flex justify-center items-center mb-12">
        <span className="text-[#F59E0B] font-bold tracking-widest text-lg uppercase">DEENBILE PRO</span>
        <Info size={24} className="text-white/70 absolute right-0" />
      </div>

      <div className="mb-10">
        {logo ? (
          <img src={logo} alt="App Logo" className="w-32 h-32 object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]" />
        ) : (
          <div className="w-32 h-32 bg-[#1A1A1A] rounded-3xl flex items-center justify-center border border-gray-800">
             <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <rect x="2" y="5" width="20" height="14" rx="3" fill="#F59E0B"/>
                 <circle cx="17" cy="12" r="3" fill="#0F0F0F"/>
             </svg>
          </div>
        )}
      </div>

      <h1 className="text-3xl font-bold text-center mb-4 leading-tight tracking-wide uppercase">
        {isRegistering ? t.register : (
          <>WELCOME TO<br /><span className="text-[#F59E0B]">DEENBILE PRO</span></>
        )}
      </h1>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {isRegistering && (
          <div>
            <label className="block text-sm font-medium text-white/90 mb-3">{t.businessName}</label>
            <div className="relative">
              <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g., Al-Aman Store"
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#F59E0B]"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-white/90 mb-3">{t.phone}</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="061XXXXXXX"
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#F59E0B]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-3">{t.pin}</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type={showPin ? 'text' : 'password'}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="****"
              maxLength={4}
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-[#F59E0B]"
            />
            <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button type="submit" className="w-full bg-[#F59E0B] text-black font-bold py-4 rounded-xl shadow-lg mt-4">
          {isRegistering ? 'Continue' : t.login}
        </button>
      </form>

      <div className="mt-8 text-center space-y-4">
        {!isRegistering && <button className="text-[#F59E0B] font-medium block mx-auto">{t.forgotPin}</button>}
        <p className="text-gray-400 text-sm">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"} 
          <button onClick={() => setIsRegistering(!isRegistering)} className="text-[#F59E0B] font-bold ml-2">
            {isRegistering ? t.login : t.register}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
