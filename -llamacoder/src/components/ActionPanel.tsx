import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Zap, Shield, Settings, Home, User, Upload, Download, Trash, Edit } from 'lucide-react';

export function ActionPanel() {
  const [toggles, setToggles] = useState({
    autoTeleport: false,
    autoSteal: false,
    esp: false,
    antiLag: false,
    optimizer: false,
    notifications: true
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
    // In a real app, this would trigger the appropriate action
  };

  return (
    <Card className="bg-gray-800 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            onClick={() => handleAction('teleport')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
          >
            <Zap className="w-4 h-4 mr-2" />
            Teleport to Highest
          </Button>
          
          <Button 
            onClick={() => handleAction('cloner')}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
          >
            <Upload className="w-4 h-4 mr-2" />
            Instant Cloner
          </Button>
          
          <Button 
            onClick={() => handleAction('rejoin')}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
          >
            <Home className="w-4 h-4 mr-2" />
            Rejoin Server
          </Button>
        </div>

        {/* Toggle Switches */}
        <div className="space-y-3 pt-4 border-t border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">SETTINGS</h3>
          
          {Object.entries(toggles).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <Label className="text-sm text-gray-300 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Label>
              <button
                onClick={() => handleToggle(key as keyof typeof toggles)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Danger Zone */}
        <div className="space-y-2 pt-4 border-t border-gray-700">
          <h3 className="text-sm font-semibold text-red-400 mb-2">DANGER ZONE</h3>
          
          <Button 
            onClick={() => handleAction('kick')}
            variant="outline"
            className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <Trash className="w-4 h-4 mr-2" />
            Kick Self
          </Button>
          
          <Button 
            onClick={() => handleAction('desync')}
            variant="outline"
            className="w-full border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
          >
            <Shield className="w-4 h-4 mr-2" />
            Desync Mode
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}