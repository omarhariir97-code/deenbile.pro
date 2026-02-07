
import React, { useState } from 'react';
import { ChevronLeft, Calendar, FileText, TrendingUp, CheckCircle2, Loader2, Download } from 'lucide-react';
import { Customer } from '../types';

interface ReportsProps {
  customers: Customer[];
  // Added t prop for translations to fix type error in App.tsx
  t: any;
}

const Reports: React.FC<ReportsProps> = ({ customers, t }) => {
  const [activeTab, setActiveTab] = useState('Week');
  const [isExporting, setIsExporting] = useState(false);
  const tabs = ['Day', 'Week', 'Month'];

  const totalDebt = customers.reduce((acc, c) => acc + c.totalDebt, 0);
  const allTransactions = customers.flatMap(c => c.transactions).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('PDF report has been generated and saved!');
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col px-4 sm:px-8 py-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">{t.reports}</h1>
        <button className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-gray-800">
            <Calendar size={20} className="text-[#F59E0B]" />
        </button>
      </div>

      <div className="mb-8 max-w-sm">
        <div className="bg-[#1A1A1A] p-1 rounded-xl flex border border-gray-800">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab ? 'bg-[#262626] text-[#F59E0B] shadow-lg' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-gray-800">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">{t.outstanding}</p>
          <p className="text-3xl font-bold mb-2">${totalDebt.toLocaleString()}</p>
          <p className="text-[#10B981] text-xs font-bold">+12% vs last month</p>
        </div>
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-gray-800">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">{t.income}</p>
          <p className="text-3xl font-bold mb-2">$2,100</p>
          <p className="text-red-500 text-xs font-bold">-5% less income</p>
        </div>
        <div className="hidden lg:block bg-[#1A1A1A] rounded-2xl p-6 border border-gray-800">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">HIGHEST DEBT CUSTOMER</p>
          <p className="text-lg font-bold truncate mb-2">{customers.length > 0 ? customers.reduce((prev, current) => (prev.totalDebt > current.totalDebt) ? prev : current).name : 'N/A'}</p>
          <p className="text-gray-500 text-xs">Long-term reward</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">{t.recentActivity}</h3>
        <button 
          onClick={handleExport}
          className="hidden md:flex bg-[#F59E0B] text-black font-bold px-6 py-3 rounded-xl items-center gap-3 shadow-lg hover:bg-[#d98c0a] transition-all"
        >
          <Download size={18} />
          {t.exportPdf}
        </button>
      </div>

      <div className="flex-1 space-y-4 pb-32 md:pb-10">
        {allTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-600">
            <FileText size={48} className="mb-4 opacity-20" />
            <p className="italic">There are no transactions.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {allTransactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between bg-[#1A1A1A]/60 p-5 rounded-xl border border-gray-800/50 hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${t.type === 'debt' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                    {t.type === 'debt' ? <TrendingUp size={24} /> : <CheckCircle2 size={24} />}
                  </div>
                  <div>
                    <p className="font-bold text-sm sm:text-base mb-1">{t.customerName}</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-wide">{t.type === 'debt' ? 'Debt' : 'Payment'} • {new Date(t.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`font-bold text-base sm:text-lg ${t.type === 'debt' ? 'text-red-500' : 'text-[#10B981]'}`}>
                  {t.type === 'debt' ? '+' : '-'}${t.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Export Button for Mobile Only */}
      <div className="md:hidden fixed bottom-24 left-6 right-6 z-10">
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="w-full bg-[#F59E0B] text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all disabled:opacity-70"
        >
          {isExporting ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
          {isExporting ? 'Preparing PDF...' : t.exportPdf}
        </button>
      </div>
    </div>
  );
};

export default Reports;
