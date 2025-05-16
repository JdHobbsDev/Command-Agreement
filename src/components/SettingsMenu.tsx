import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Globe, Palette, Volume2, Zap, Eye } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const SettingsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useSettings();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed bottom-4 right-4 p-3 bg-primary-600 hover:bg-primary-700 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Settings"
      >
        <Settings className="h-6 w-6 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={toggleMenu}
            />

            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white">Settings</h2>
                  <button
                    onClick={toggleMenu}
                    className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-slate-400" />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary-400 mb-2">
                      <Globe className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">Language</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => updateSettings({ locale: 'en-GB' })}
                        className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                          settings.locale === 'en-GB'
                            ? 'border-primary-500 bg-primary-500/10'
                            : 'border-slate-700 hover:border-primary-500/50'
                        }`}
                      >
                        <img
                          src="https://flagcdn.com/w40/gb.png"
                          alt="UK Flag"
                          className="w-6 h-4 rounded"
                        />
                        <span>English (UK)</span>
                      </button>
                      <button
                        onClick={() => updateSettings({ locale: 'en-US' })}
                        className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                          settings.locale === 'en-US'
                            ? 'border-primary-500 bg-primary-500/10'
                            : 'border-slate-700 hover:border-primary-500/50'
                        }`}
                      >
                        <img
                          src="https://flagcdn.com/w40/us.png"
                          alt="US Flag"
                          className="w-6 h-4 rounded"
                        />
                        <span>English (US)</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary-400 mb-2">
                      <Palette className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">Theme</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {['system', 'light', 'dark'].map((theme) => (
                        <button
                          key={theme}
                          onClick={() => updateSettings({ theme: theme as 'system' | 'light' | 'dark' })}
                          className={`p-3 rounded-lg border capitalize transition-all ${
                            settings.theme === theme
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-slate-700 hover:border-primary-500/50'
                          }`}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary-400 mb-2">
                      <Zap className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">Preferences</h3>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 rounded-lg border border-slate-700 hover:border-primary-500/50 transition-all">
                        <div className="flex items-center gap-3">
                          <Volume2 className="h-5 w-5 text-slate-400" />
                          <span>Sound Effects</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.soundEffects}
                          onChange={(e) => updateSettings({ soundEffects: e.target.checked })}
                          className="checkbox-primary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-lg border border-slate-700 hover:border-primary-500/50 transition-all">
                        <div className="flex items-center gap-3">
                          <Zap className="h-5 w-5 text-slate-400" />
                          <span>Animations</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.animations}
                          onChange={(e) => updateSettings({ animations: e.target.checked })}
                          className="checkbox-primary"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-lg border border-slate-700 hover:border-primary-500/50 transition-all">
                        <div className="flex items-center gap-3">
                          <Eye className="h-5 w-5 text-slate-400" />
                          <span>High Contrast</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.highContrast}
                          onChange={(e) => updateSettings({ highContrast: e.target.checked })}
                          className="checkbox-primary"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </>
  );
};

export default SettingsMenu;