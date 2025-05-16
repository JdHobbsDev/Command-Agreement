import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'en-GB' | 'en-US';
type Theme = 'system' | 'light' | 'dark';

interface Settings {
  locale: Locale;
  theme: Theme;
  animations: boolean;
  soundEffects: boolean;
  highContrast: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  locale: 'en-GB',
  theme: 'system',
  animations: true,
  soundEffects: true,
  highContrast: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const stored = localStorage.getItem('ukrp-settings');
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply theme
    if (settings.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', settings.theme === 'dark');
    }

    // Apply high contrast
    root.classList.toggle('high-contrast', settings.highContrast);

    // Apply animations
    root.style.setProperty('--enable-animations', settings.animations ? '1' : '0');
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('ukrp-settings', JSON.stringify(updated));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};