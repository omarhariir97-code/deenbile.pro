
import React, { useState } from 'react';
import { Search, ChevronLeft, User, Phone, Trash2, PlusCircle, MinusCircle, Info } from 'lucide-react';
import { Customer, Transaction } from '../types';

interface CustomersProps {
  customers: Customer[];
  onDelete: (id: string) => void;
  onUpdate: (updated: Customer) => void;
  // Added t prop for translations to fix type error in App.tsx
  t: any;
}

const Customers: React.FC<CustomersProps> = ({ customers, onDelete, onUpdate, t }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [transactionAmount, setTransactionAmount] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  const handleTransaction = (type: 'debt' | 'payment') => {
    if (!selectedCustomer || !transactionAmount) return;
    const amount = parseFloat(transactionAmount);
    const newDebt = type === 'debt' ? selectedCustomer.totalDebt + amount : selectedCustomer.totalDebt - amount;
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      type,
      amount,
      date: new Date().toISOString(),
      description: type === 'debt' ? t.debt : t.payment
    };

    onUpdate({
      ...selectedCustomer,
      totalDebt: newDebt,
      transactions: [newTransaction, ...selectedCustomer.transactions]
    });
    setTransactionAmount('');
  };

  if (selectedCustomerId && selectedCustomer) {
    return (
      <div className="flex-1 flex flex-col pt-6 animate-in slide-in-from-right duration-300">
        <div className="px-6 flex items-center justify-between mb-8">
          <button onClick={() => setSelectedCustomerId(null)} className="text-[#F59E0B]">
            <ChevronLeft size={28} />
          </button>
          <h1 className="font-bold">Customer Info</h1>
          <button onClick={() => { onDelete(selectedCustomer.id); setSelectedCustomerId(null); }} className="text-red-500/50 hover:text-red-500">
            <Trash2 size={20} />
          </button>
        </div>

        <div className="px-6 flex flex-col items-center mb-8">
           <div className={`w-24 h-24 rounded-3xl ${selectedCustomer.color} flex items-center justify-center text-3xl font-bold shadow-2xl mb-4 ring-4 ring-[#1A1A1A]`}>
             {selectedCustomer.initials}
           </div>
           <h2 className="text-2xl font-bold">{selectedCustomer.name}</h2>
           <p className="text-gray-500 flex items-center gap-2 mt-1">
             <Phone size={14} /> {selectedCustomer.phone}
           </p>
        </div>

        <div className="px-6 grid grid-cols-1 gap-4 mb-8">
           <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-gray-800 text-center">
             <p className="text-xs text-gray-500 font-bold uppercase mb-1">{t.outstanding}</p>
             <p className={`text-4xl font-bold ${selectedCustomer.totalDebt > 0 ? 'text-red-500' : 'text-green-500'}`}>
               ${selectedCustomer.totalDebt.toFixed(2)}
             </p>
           </div>
        </div>

        <div className="px-6 mb-10">
          <p className="text-xs font-bold text-gray-500 uppercase mb-3">{t.enterAmount}</p>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input 
                type="number" 
                value={transactionAmount}
                onChange={e => setTransactionAmount(e.target.value)}
                placeholder={t.enterAmount}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl py-4 px-4 text-white outline-none focus:border-[#F59E0B]" 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button 
              onClick={() => handleTransaction('debt')}
              className="bg-red-500/10 text-red-500 border border-red-500/20 py-4 rounded-xl flex items-center justify-center gap-2 font-bold active:scale-95 transition-all"
            >
              <PlusCircle size={20} /> {t.debt}
            </button>
            <button 
              onClick={() => handleTransaction('payment')}
              className="bg-green-500/10 text-green-500 border border-green-500/20 py-4 rounded-xl flex items-center justify-center gap-2 font-bold active:scale-95 transition-all"
            >
              <MinusCircle size={20} /> {t.payment}
            </button>
          </div>
        </div>

        <div className="px-6 flex-1 overflow-y-auto pb-10">
           <h3 className="font-bold text-sm text-gray-400 mb-4 uppercase">{t.transactionHistory}</h3>
           {selectedCustomer.transactions.length === 0 ? (
             <p className="text-gray-600 text-center text-sm italic mt-10">No transactions yet.</p>
           ) : (
             <div className="space-y-4">
               {selectedCustomer.transactions.map(t => (
                 <div key={t.id} className="bg-[#1A1A1A] p-4 rounded-xl flex justify-between items-center border border-gray-800/30">
                    <div>
                      <p className="text-sm font-bold">{t.description}</p>
                      <p className="text-[10px] text-gray-500">{new Date(t.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`font-bold ${t.type === 'debt' ? 'text-red-500' : 'text-green-500'}`}>
                      {t.type === 'debt' ? '+' : '-'}${t.amount.toFixed(2)}
                    </span>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col pt-6 animate-in slide-in-from-right duration-300">
      <div className="px-6 flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{t.customers}</h1>
        <div className="w-10 h-10 rounded-xl bg-[#261A0A] flex items-center justify-center ring-1 ring-[#F59E0B]/30">
          <User size={20} className="text-[#F59E0B]" />
        </div>
      </div>

      <div className="px-6 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder={t.search}
            className="w-full bg-[#1A1A1A] border-none rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-[#F59E0B]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 space-y-2 px-6 pb-24 overflow-y-auto">
        {filteredCustomers.length === 0 ? (
          <div className="text-center mt-20">
            <Info size={48} className="mx-auto text-gray-700 mb-4" />
            <p className="text-gray-500">No customers found.</p>
          </div>
        ) : (
          filteredCustomers.map((c) => (
            <div 
              key={c.id} 
              onClick={() => setSelectedCustomerId(c.id)}
              className="flex items-center justify-between py-4 border-b border-gray-800/30 active:bg-gray-800/20 px-4 rounded-2xl transition-all cursor-pointer bg-[#1A1A1A]/40 mb-2"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${c.color} flex items-center justify-center text-sm font-bold shadow-lg`}>
                  {c.initials}
                </div>
                <div>
                  <p className="font-bold text-sm mb-1">{c.name}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-[10px] font-bold">
                      <Phone size={10} />
                      <span>{c.phone}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm mb-1 ${c.totalDebt > 0 ? 'text-red-500' : 'text-green-500'}`}>
                  ${c.totalDebt.toFixed(2)}
                </p>
                <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">INFO &gt;</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Customers;
