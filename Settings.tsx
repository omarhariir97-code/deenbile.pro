
import React, { useState } from 'react';
import { Store, Lock, Moon, Cloud, HelpCircle, LogOut, ChevronRight, X, Loader2, Check, Globe } from 'lucide-react';
import { Language } from '../types';

interface SettingsProps {
  onLogout: () => void;
  logo: string | null;
  onLogoUpdate: (newLogo: string | null) => void;
  language: Language;
  onLanguageUpdate: (lang: Language) => void;
  t: any;
}

const Settings: React.FC<SettingsProps> = ({ onLogout, logo, language, onLanguageUpdate, t }) => {
  const [isDark, setIsDark] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCloudSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 2500);
  };

  const handleSupport = () => {
    window.open('https://wa.me/252771654723', '_blank');
  };

  const handlePinUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPinModal(false);
    alert(language === 'en' ? 'PIN changed successfully!' : 'PIN-ka si guul leh ayaa loo baddelay!');
  };

  return (
    <div className="flex-1 flex flex-col pt-6 animate-in slide-in-from-bottom duration-300">
      <div className="px-6 flex items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold flex-1">{t.settings}</h1>
      </div>

      <div className="px-6 mb-10">
        <div className="bg-[#1A1A1A] rounded-2xl p-6 flex items-center gap-5 border border-gray-800/50">
          <div className="w-16 h-16 rounded-xl bg-cyan-700/20 flex items-center justify-center text-cyan-500 overflow-hidden border border-gray-800">
            {logo ? (
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <Store size={32} />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold">Al-Huda Store</h2>
                <span className="bg-[#F59E0B] text-black text-[9px] font-black px-1.5 py-0.5 rounded uppercase">PRO</span>
            </div>
            <p className="text-gray-500 text-sm">ID: 482931-DB</p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-8 px-6 pb-12 overflow-y-auto">
        <section>
          <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">
            {language === 'en' ? 'SECURITY & APPEARANCE' : 'AMNIGA IYO MUUQAALKA'}
          </h3>
          <div className="space-y-4">
            <button onClick={() => setShowPinModal(true)} className="w-full">
              <SettingRow icon={<Lock className="text-[#F59E0B]" />} label={t.changePin} iconBg="bg-[#261A0A]" />
            </button>
            
            {/* Language Selection Row */}
            <div className="bg-[#1A1A1A] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#261A0A] flex items-center justify-center">
                  <Globe className="text-[#F59E0B]" size={20} />
                </div>
                <span className="font-bold text-sm">{t.language}</span>
              </div>
              <div className="flex bg-[#262626] rounded-lg p-1 border border-gray-800">
                <button 
                  onClick={() => onLanguageUpdate('en')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${language === 'en' ? 'bg-[#F59E0B] text-black' : 'text-gray-500'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => onLanguageUpdate('so')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${language === 'so' ? 'bg-[#F59E0B] text-black' : 'text-gray-500'}`}
                >
                  SO
                </button>
              </div>
            </div>

            <div className="bg-[#1A1A1A] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#261A0A] flex items-center justify-center">
                  <Moon className="text-[#F59E0B]" size={20} />
                </div>
                <span className="font-bold text-sm">{t.darkMode}</span>
              </div>
              <div 
                onClick={() => setIsDark(!isDark)}
                className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${isDark ? 'bg-[#F59E0B]' : 'bg-gray-700'}`}
              >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isDark ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">
            {language === 'en' ? 'DATA MANAGEMENT' : 'MAAMULKA XOGTA'}
          </h3>
          <div className="bg-[#1A1A1A] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#261A0A] flex items-center justify-center">
                  {isSyncing ? <Loader2 className="text-[#F59E0B] animate-spin" size={20} /> : showSuccess ? <Check className="text-green-500" size={20} /> : <Cloud className="text-[#F59E0B]" size={20} />}
                </div>
                <div>
                    <p className="font-bold text-sm">{t.cloudSync}</p>
                    <p className="text-gray-500 text-[10px]">
                      {isSyncing ? (language === 'en' ? 'Syncing...' : 'Caynaya...') : showSuccess ? (language === 'en' ? 'Done!' : 'Dhammaystiran!') : (language === 'en' ? 'Last sync: Just now' : 'Kaydkii u dambeeyay: Hadda')}
                    </p>
                </div>
              </div>
              <button 
                onClick={handleCloudSync}
                disabled={isSyncing}
                className="bg-[#262626] text-[#F59E0B] text-[10px] font-bold px-3 py-1.5 rounded-lg border border-gray-800 disabled:opacity-50"
              >
                {language === 'en' ? 'Sync Now' : 'Hadda kaydi'}
              </button>
          </div>
        </section>

        <section>
          <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">
            {language === 'en' ? 'SUPPORT' : 'TAAGEERADA'}
          </h3>
          <div className="space-y-4">
            <button onClick={handleSupport} className="w-full">
              <SettingRow icon={<HelpCircle className="text-[#F59E0B]" />} label={t.help} iconBg="bg-[#261A0A]" />
            </button>
            <button 
                onClick={onLogout}
                className="w-full bg-[#1A1A1A] rounded-xl p-4 flex items-center gap-4 active:bg-red-900/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-red-900/10 flex items-center justify-center">
                <LogOut className="text-red-500" size={20} />
              </div>
              <span className="font-bold text-sm text-red-500">{t.logout}</span>
            </button>
          </div>
        </section>
      </div>

      {showPinModal && (
        <div className="fixed inset-0 z-[110] bg-black/90 flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="w-full bg-[#1A1A1A] rounded-3xl p-8 border border-gray-800">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{t.changePin}</h2>
                <button onClick={() => setShowPinModal(false)}><X size={24} /></button>
             </div>
             <form onSubmit={handlePinUpdate} className="space-y-6">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500">
                    {language === 'en' ? 'Current PIN' : 'PIN-ka Hadda'}
                   </label>
                   <input type="password" maxLength={4} className="w-full bg-[#262626] py-4 px-4 rounded-xl outline-none focus:ring-1 focus:ring-[#F59E0B]" placeholder="****" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500">
                    {language === 'en' ? 'New PIN' : 'PIN-ka Cusub'}
                   </label>
                   <input type="password" maxLength={4} className="w-full bg-[#262626] py-4 px-4 rounded-xl outline-none focus:ring-1 focus:ring-[#F59E0B]" placeholder="****" />
                </div>
                <button type="submit" className="w-full bg-[#F59E0B] text-black font-bold py-4 rounded-xl active:scale-95 transition-transform">
                  {language === 'en' ? 'Change Now' : 'Hadda Baddel'}
                </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

const SettingRow: React.FC<{ icon: React.ReactNode; label: string; iconBg: string }> = ({ icon, label, iconBg }) => (
  <div className="bg-[#1A1A1A] rounded-xl p-4 flex items-center justify-between cursor-pointer active:bg-gray-800 transition-colors">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
        {icon}
      </div>
      <span className="font-bold text-sm">{label}</span>
    </div>
    <ChevronRight className="text-gray-600" size={20} />
  </div>
);

export default Settings;
