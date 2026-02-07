
import React from 'react';
import { LayoutGrid, Users, History, Settings, LogOut, Plus } from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  onPlusClick: () => void;
  logo: string | null;
  t: any;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, onLogout, onPlusClick, logo, t }) => {
  const navItems = [
    { id: 'dashboard' as Page, label: t.dashboard, icon: LayoutGrid },
    { id: 'customers' as Page, label: t.customers, icon: Users },
    { id: 'reports' as Page, label: t.reports, icon: History },
    { id: 'settings' as Page, label: t.settings, icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#1A1A1A] border-r border-gray-800 h-screen sticky top-0">
      <div className="p-8 flex items-center gap-3">
        {logo ? (
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain rounded-lg" />
        ) : (
          <span className="text-[#F59E0B] font-black tracking-widest text-xl">DEENBILE PRO</span>
        )}
      </div>

      <div className="px-4 mb-6">
        <button 
          onClick={onPlusClick}
          className="w-full bg-[#F59E0B] text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#d98c0a] transition-colors"
        >
          <Plus size={20} />
          <span>{t.addCustomer}</span>
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activePage === item.id 
                ? 'bg-[#F59E0B]/10 text-[#F59E0B]' 
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10">
          <LogOut size={20} />
          <span>{t.logout}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
