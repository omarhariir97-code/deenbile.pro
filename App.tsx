
import React, { useState, useEffect } from 'react';
import { Page, Customer, Transaction, Language } from './types';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import { X, User, Phone, DollarSign } from 'lucide-react';

const INITIAL_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Ahmed Mohamed', phone: '0615123456', totalDebt: 450, initials: 'AM', color: 'bg-yellow-600', transactions: [] },
  { id: '2', name: 'Fartuun Ali', phone: '0615998877', totalDebt: 1200, initials: 'FA', color: 'bg-indigo-600', transactions: [] },
  { id: '3', name: 'Jaamac Diiriye', phone: '0612001122', totalDebt: 75.5, initials: 'JD', color: 'bg-green-700', transactions: [] },
];

const TRANSLATIONS = {
  en: {
    dashboard: "Dashboard",
    customers: "Customers",
    reports: "Reports",
    settings: "Settings",
    addCustomer: "Add Customer",
    logout: "Log Out",
    save: "Save",
    name: "Full Name",
    phone: "Phone Number",
    initialDebt: "Initial Debt",
    home: "Home",
    history: "History",
    welcome: "Welcome back",
    merchant: "Merchant",
    overview: "General Overview",
    outstanding: "OUTSTANDING DEBT",
    income: "INCOME",
    activeCustomers: "ACTIVE CUSTOMERS",
    recentActivity: "Recent Activity",
    search: "Search customers...",
    debt: "Debt",
    payment: "Payment",
    changePin: "Change PIN",
    language: "Language",
    darkMode: "Dark Mode",
    cloudSync: "Cloud Sync",
    help: "Help (WhatsApp)",
    exportPdf: "Export PDF",
    login: "Log In",
    register: "Register",
    businessName: "Business Name",
    pin: "PIN (4-digits)",
    forgotPin: "Forgot PIN?",
    newCustomer: "New Customer",
    enterAmount: "Enter amount",
    transactionHistory: "TRANSACTION HISTORY"
  },
  so: {
    dashboard: "Guud ahaan",
    customers: "Macaamiisha",
    reports: "Warbixinada",
    settings: "Habaynta",
    addCustomer: "Ku dar Macmiil",
    logout: "Ka Bax",
    save: "Keydi",
    name: "Magaca Buuxa",
    phone: "Taleefanka",
    initialDebt: "Deyn Bilow ah",
    home: "Hoyga",
    history: "Taariikhda",
    welcome: "Ku soo dhawaaw",
    merchant: "Ganacsade",
    overview: "Warbixinta Guud",
    outstanding: "DEYNTA MAQAN",
    income: "LACAGTA SOO GASHAY",
    activeCustomers: "MACAAMIISHA ACTIVE",
    recentActivity: "Dhaqdhaqaaqii ugu dambeeyay",
    search: "Raadi macmiil...",
    debt: "Deyn",
    payment: "Bixin",
    changePin: "Baddel PIN-ka",
    language: "Luqadda",
    darkMode: "Habka Mugdiga ah",
    cloudSync: "Kaydinta Cloud-ka",
    help: "Caawinaad (WhatsApp)",
    exportPdf: "Soo saar PDF",
    login: "Soo Gal",
    register: "Is-diiwaangeli",
    businessName: "Magaca Ganacsiga",
    pin: "PIN-ka (4-god)",
    forgotPin: "Ma ilowday PIN-ka?",
    newCustomer: "Macmiil Cusub",
    enterAmount: "Geli cadadka",
    transactionHistory: "TAARIIKHDA DHAKDHAQAAQA"
  }
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [logo, setLogo] = useState<string | null>(localStorage.getItem('app_logo'));
  const [language, setLanguage] = useState<Language>((localStorage.getItem('app_lang') as Language) || 'en');

  const t = TRANSLATIONS[language];

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  const updateLogo = (newLogo: string | null) => {
    if (newLogo) {
      localStorage.setItem('app_logo', newLogo);
    } else {
      localStorage.removeItem('app_logo');
    }
    setLogo(newLogo);
  };

  const updateLanguage = (newLang: Language) => {
    localStorage.setItem('app_lang', newLang);
    setLanguage(newLang);
  };

  // New Customer Form State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;
    
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: newName,
      phone: newPhone,
      totalDebt: parseFloat(newAmount) || 0,
      initials: newName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      color: 'bg-orange-600',
      transactions: parseFloat(newAmount) > 0 ? [{
        id: Date.now().toString() + '-init',
        customerId: '', 
        customerName: newName,
        type: 'debt',
        amount: parseFloat(newAmount),
        date: new Date().toISOString(),
        description: language === 'en' ? 'Initial debt' : 'Deyn bilow ah'
      }] : []
    };
    
    setCustomers([newCustomer, ...customers]);
    setShowAddModal(false);
    setNewName('');
    setNewPhone('');
    setNewAmount('');
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const updateCustomerData = (updatedCustomer: Customer) => {
    setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} logo={logo} t={t} />;
      case 'dashboard':
        return <Dashboard customers={customers} logo={logo} t={t} />;
      case 'customers':
        return <Customers customers={customers} onDelete={deleteCustomer} onUpdate={updateCustomerData} t={t} />;
      case 'reports':
        return <Reports customers={customers} t={t} />;
      case 'settings':
        return <Settings onLogout={handleLogout} logo={logo} onLogoUpdate={updateLogo} language={language} onLanguageUpdate={updateLanguage} t={t} />;
      default:
        return <Dashboard customers={customers} logo={logo} t={t} />;
    }
  };

  if (!isAuthenticated || currentPage === 'login') {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col items-center">
        <div className="w-full max-w-md flex flex-col flex-1">
          <Login onLogin={handleLogin} logo={logo} t={t} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0F0F0F] text-white">
      <Sidebar 
        activePage={currentPage} 
        onNavigate={setCurrentPage} 
        onLogout={handleLogout}
        onPlusClick={() => setShowAddModal(true)}
        logo={logo}
        t={t}
      />

      <main className="flex-1 flex flex-col relative pb-24 md:pb-0">
        <div className="max-w-7xl mx-auto w-full flex-1">
          {renderPage()}
        </div>

        <div className="md:hidden">
          <BottomNav 
            activePage={currentPage} 
            onNavigate={setCurrentPage} 
            onPlusClick={() => setShowAddModal(true)} 
            t={t}
          />
        </div>
      </main>

      {showAddModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-end md:items-center justify-center animate-in fade-in duration-200 p-0 md:p-4">
          <div className="w-full max-w-md bg-[#1A1A1A] rounded-t-3xl md:rounded-3xl p-8 animate-in slide-in-from-bottom md:slide-in-from-top duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{t.newCustomer}</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 p-2 hover:bg-gray-800 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 font-bold uppercase">{t.name}</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    autoFocus
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    type="text" placeholder={t.name + "..."} 
                    className="w-full bg-[#262626] rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-1 focus:ring-[#F59E0B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-500 font-bold uppercase">{t.phone}</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    type="tel" placeholder="061XXXXXXX" 
                    className="w-full bg-[#262626] rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-1 focus:ring-[#F59E0B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-500 font-bold uppercase">{t.initialDebt} ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    value={newAmount}
                    onChange={e => setNewAmount(e.target.value)}
                    type="number" placeholder="0.00" 
                    className="w-full bg-[#262626] rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-1 focus:ring-[#F59E0B]"
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#F59E0B] text-black font-bold py-4 rounded-xl mt-4 shadow-lg active:scale-95 transition-transform hover:bg-[#d98c0a]">
                {t.save}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
