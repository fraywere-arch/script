import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Star, StarFilled } from 'lucide-react';
import { formatNumber } from '../utils/formatNumber';

interface Animal {
  uid: string;
  name: string;
  genValue: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  mutation: string;
  traits: string[];
}

interface AnimalListProps {
  animals: Animal[];
  favorites: string[];
  onToggleFavorite: (uid: string) => void;
}

export function AnimalList({ animals, favorites, onToggleFavorite }: AnimalListProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-500/50';
      case 'epic': return 'border-purple-500/50';
      case 'rare': return 'border-blue-500/50';
      default: return 'border-gray-500/50';
    }
  };

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
      {animals.map((animal) => {
        const isFavorite = favorites.includes(animal.uid);
        
        return (
          <Card 
            key={animal.uid} 
            className={`bg-gray-700/50 border-2 ${getRarityBorder(animal.rarity)} hover:bg-gray-700 transition-all duration-200`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${getRarityColor(animal.rarity)}`}>
                      {animal.name}
                    </h3>
                    {isFavorite && <StarFilled className="w-4 h-4 text-yellow-400" />}
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <div className="text-green-400 font-semibold">
                      {formatNumber(animal.genValue)}/s
                    </div>
                    
                    {animal.mutation !== 'None' && (
                      <div className="text-purple-400">
                        Mutation: {animal.mutation}
                      </div>
                    )}
                    
                    {animal.traits.length > 0 && (
                      <div className="text-cyan-400">
                        Traits: {animal.traits.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleFavorite(animal.uid)}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  {isFavorite ? (
                    <StarFilled className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Star className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {animals.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No animals found matching your filters
        </div>
      )}
    </div>
  );
}