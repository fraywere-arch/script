import React from 'react';
import { Card, CardContent } from '../components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="bg-gray-800 border-purple-500/30 hover:border-purple-500/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <p className="text-xl font-bold text-white">{value}</p>
          </div>
          <div className="text-purple-400">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}