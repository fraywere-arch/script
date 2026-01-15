import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Star, StarFilled, Search, Zap, Shield, Settings, Home, User, Bell } from 'lucide-react';
import { AnimalList } from '../components/AnimalList';
import { ActionPanel } from '../components/ActionPanel';
import { StatCard } from '../components/StatCard';
import { TabBar } from '../components/TabBar';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { mockAnimals } from '../data/animals';
import { formatNumber } from '../utils/formatNumber';

export default function App() {
  const [animals] = useState(mockAnimals);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMutationsOnly, setShowMutationsOnly] = useLocalStorage('showMutationsOnly', false);
  const [showTraitsOnly, setShowTraitsOnly] = useLocalStorage('showTraitsOnly', false);
  const [minGenValue, setMinGenValue] = useLocalStorage('minGenValue', 0);
  const [favorites, setFavorites] = useLocalStorage('favorites', [] as string[]);
  const [activeTab, setActiveTab] = useState('animals');
  const [isMinimized, setIsMinimized] = useState(false);

  const filteredAnimals = useMemo(() => {
    return animals.filter(animal => {
      const matchesSearch = !searchQuery || 
        animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.mutation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.traits.some(trait => trait.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const hasMutation = animal.mutation !== 'None';
      const hasTraits = animal.traits.length > 0;
      const meetsMinGen = animal.genValue >= minGenValue;
      
      if (showMutationsOnly && !hasMutation) return false;
      if (showTraitsOnly && !hasTraits) return false;
      if (!meetsMinGen) return false;
      
      return matchesSearch;
    });
  }, [animals, searchQuery, showMutationsOnly, showTraitsOnly, minGenValue]);

  const stats = useMemo(() => {
    const totalValue = filteredAnimals.reduce((sum, animal) => sum + animal.genValue, 0);
    const highestGen = Math.max(...filteredAnimals.map(a => a.genValue), 0);
    const mutationCount = filteredAnimals.filter(a => a.mutation !== 'None').length;
    const traitCount = filteredAnimals.filter(a => a.traits.length > 0).length;
    
    return {
      totalAnimals: filteredAnimals.length,
      totalValue,
      highestGen,
      mutationCount,
      traitCount
    };
  }, [filteredAnimals]);

  const toggleFavorite = (uid: string) => {
    setFavorites(prev => 
      prev.includes(uid) 
        ? prev.filter(id => id !== uid)
        : [...prev, uid]
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
              Brainrot Tracker
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Animals" 
            value={stats.totalAnimals.toString()} 
            icon={<User className="w-5 h-5" />}
          />
          <StatCard 
            title="Total Value/s" 
            value={formatNumber(stats.totalValue)} 
            icon={<Zap className="w-5 h-5" />}
          />
          <StatCard 
            title="Highest Gen" 
            value={formatNumber(stats.highestGen)} 
            icon={<Star className="w-5 h-5" />}
          />
          <StatCard 
            title="Mutations/Traits" 
            value={`${stats.mutationCount}/${stats.traitCount}`} 
            icon={<Shield className="w-5 h-5" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'animals' && (
              <Card className="bg-gray-800 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400">Animal Collection</CardTitle>
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search animals, mutations, or traits..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="mutations"
                          checked={showMutationsOnly}
                          onChange={(e) => setShowMutationsOnly(e.target.checked)}
                          className="rounded bg-gray-700 border-gray-600 text-purple-500"
                        />
                        <Label htmlFor="mutations" className="text-sm text-gray-300">
                          Show Mutations Only
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="traits"
                          checked={showTraitsOnly}
                          onChange={(e) => setShowTraitsOnly(e.target.checked)}
                          className="rounded bg-gray-700 border-gray-600 text-purple-500"
                        />
                        <Label htmlFor="traits" className="text-sm text-gray-300">
                          Show Traits Only
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Label htmlFor="minGen" className="text-sm text-gray-300">
                          Min Gen: {formatNumber(minGenValue)}
                        </Label>
                        <input
                          type="range"
                          id="minGen"
                          min="0"
                          max="100000000"
                          step="1000000"
                          value={minGenValue}
                          onChange={(e) => setMinGenValue(Number(e.target.value))}
                          className="w-32"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <AnimalList 
                    animals={filteredAnimals}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                  />
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'settings' && (
              <Card className="bg-gray-800 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400">Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Appearance</h3>
                      <p className="text-gray-400">Customize your dashboard appearance</p>
                    </div>
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                      <p className="text-gray-400">Manage alert preferences</p>
                    </div>
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Data</h3>
                      <p className="text-gray-400">Export/import your collection data</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-1">
            <ActionPanel />
          </div>
        </div>
      </div>

      {/* Floating Status Indicator */}
      <div className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg shadow-2xl animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          <span className="text-sm font-semibold">System Active</span>
        </div>
      </div>
    </div>
  );
}