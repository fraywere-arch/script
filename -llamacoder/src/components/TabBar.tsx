import React from 'react';
import { Button } from '../components/ui/button';
import { Home, Users, Settings, BarChart } from 'lucide-react';

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function TabBar({ activeTab, setActiveTab }: TabBarProps) {
  const tabs = [
    { id: 'animals', label: 'Animals', icon: <Home className="w-4 h-4" /> },
    { id: 'stats', label: 'Statistics', icon: <BarChart className="w-4 h-4" /> },
    { id: 'trades', label: 'Trades', icon: <Users className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}