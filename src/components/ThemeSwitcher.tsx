import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Palette } from 'lucide-react';
import { setSoundEnabled, getSoundEnabled, playUiSound } from '../utils/audio';

export const ThemeSwitcher: React.FC = () => {
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    setSoundOn(getSoundEnabled());
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) {
      playUiSound('success');
    }
  };

  return (
    <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-full border border-slate-800 backdrop-blur-md">
      <button
        onClick={toggleSound}
        className={`p-1.5 rounded-full transition-colors flex items-center justify-center ${
          soundOn ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400 hover:text-slate-200'
        }`}
        title={soundOn ? 'Mute UI sounds' : 'Enable tactile audio feedback'}
        data-cursor="Sound"
      >
        {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
