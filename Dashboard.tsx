
import React from 'react';
import { Bell, TrendingUp, User, Calendar, CreditCard } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Customer } from '../types';

interface DashboardProps {
  customers: Customer[];
  logo: string | null;
  t: any;
}

const Dashboard: React.FC<DashboardProps> = ({ customers, logo, t }) => {
  const totalDebt = customers.reduce((acc, c) => acc + c.totalDebt, 0);

  return (
    <div className="flex-1 flex flex-col px-4 sm:px-8 py-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#261A0A] flex items-center justify-center ring-1 ring-[#F59E0B]/30 overflow-hidden">
            {logo ? <img src={logo} className="w-full h-full object-cover" /> : <User size={20} className="text-[#F59E0B]" />}
          </div>
          <div>
            <p className="text-gray-400 text-xs">{t.welcome},</p>
            <p className="font-bold">{t.merchant}</p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-1">{t.overview}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-[#1A1A1A] rounded-2xl p-6 relative border border-gray-800">
          <p className="text-gray-400 text-[10px] font-bold uppercase mb-6 tracking-wider">{t.outstanding}</p>
          <h3 className="text-4xl sm:text-5xl font-bold text-[#FF4D4D] mb-4">
            ${totalDebt.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
          <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-gray-800">
            <p className="text-gray-400 text-[9px] font-bold uppercase mb-3">{t.income}</p>
            <p className="text-2xl font-bold text-[#10B981]">$2,100.00</p>
          </div>
          <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-gray-800">
            <p className="text-gray-400 text-[9px] font-bold uppercase mb-3">{t.activeCustomers}</p>
            <p className="text-2xl font-bold">{customers.length}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-6 px-2">{t.recentActivity}</h3>
        <div className="space-y-4">
          <ActivityItem name="Ahmed Hassan" sub="2 mins ago" amount="-$120.00" isNegative icon={<User size={18} />} />
          <ActivityItem name="Fartuun Ali" sub="1 hour ago" amount="+$45.00" icon={<CreditCard size={18} />} />
        </div>
      </div>
    </div>
  );
};

const ActivityItem: React.FC<{ name: string; sub: string; amount: string; isNegative?: boolean; icon: React.ReactNode }> = ({ name, sub, amount, isNegative, icon }) => (
  <div className="bg-[#1A1A1A] rounded-xl p-5 flex items-center justify-between border border-gray-800">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-[#262626] rounded-xl flex items-center justify-center text-gray-500">{icon}</div>
      <div>
        <p className="font-bold text-sm">{name}</p>
        <p className="text-gray-500 text-[10px]">{sub}</p>
      </div>
    </div>
    <span className={`font-bold ${isNegative ? 'text-red-500' : 'text-[#10B981]'}`}>{amount}</span>
  </div>
);

export default Dashboard;
