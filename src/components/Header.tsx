import React from 'react';
import { Layers, Sparkles } from 'lucide-react';
import { Badge } from './ui/Badge';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-6 px-4 md:px-8 border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1px] flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
            <Layers className="w-5 h-5 text-indigo-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-white font-mono">NEXUS</span>
            <span className="text-zinc-500 font-normal text-sm">Cloud</span>
            <Badge variant="purple" size="sm" className="hidden sm:inline-flex">
              <Sparkles className="w-2.5 h-2.5" />
              v2.4
            </Badge>
          </div>
          <p className="text-[11px] text-zinc-400">Workspace Setup & Provisioning</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-zinc-400">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="hidden sm:inline font-mono">US-EAST-1 (Active)</span>
      </div>
    </header>
  );
};
