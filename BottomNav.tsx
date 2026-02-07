
import React from 'react';
import { LayoutGrid, Users, History, Settings, Plus } from 'lucide-react';
import { Page } from '../types';

interface BottomNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onPlusClick?: () => void;
  t: any;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate, onPlusClick, t }) => {
  const navItems = [
    { id: 'dashboard' as Page, label: t.home, icon: LayoutGrid },
    { id: 'customers' as Page, label: t.customers, icon: Users },
    { id: 'reports' as Page, label: t.history, icon: History },
    { id: 'settings' as Page, label: t.settings, icon: Settings },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-gray-800 flex justify-around items-center h-20 px-4 z-50">
      {navItems.slice(0, 2).map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex-1 flex flex-col items-center gap-1 ${activePage === item.id ? 'text-[#F59E0B]' : 'text-gray-400'}`}
        >
          <item.icon size={24} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}

      <div className="relative -top-6 flex justify-center flex-1">
        <button onClick={onPlusClick} className="bg-[#F59E0B] w-14 h-14 rounded-full flex items-center justify-center border-4 border-[#0F0F0F] shadow-lg">
          <Plus size={32} color="black" strokeWidth={3} />
        </button>
      </div>

      {navItems.slice(2).map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex-1 flex flex-col items-center gap-1 ${activePage === item.id ? 'text-[#F59E0B]' : 'text-gray-400'}`}
        >
          <item.icon size={24} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
