import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Globe, Palette, Volume2, Zap, Eye } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { cn } from '../utils/cn';

const SettingsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useSettings();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0 },
  };

  const buttonVariants = {
    hover: { scale: 1.1, rotate: 90 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <motion.button
        onClick={toggleMenu}
        className="fixed bottom-4 right-4 p-3 bg-primary-600 hover:bg-primary-700 rounded-full shadow-lg z-50"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label="Settings"
      >
        <Settings className="h-6 w-6 text-white" />
      </motion.button>

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
              className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900/95 backdrop-blur-md shadow-xl z-50 overflow-y-auto border-l border-slate-800"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Settings className="h-6 w-6 text-primary-400" />
                    Settings
                  </h2>
                  <motion.button
                    onClick={toggleMenu}
                    className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-6 w-6 text-slate-400" />
                  </motion.button>
                </div>

                <div className="space-y-8">
                  <section className="space-y-4">
                    <div className="flex items-center gap-3 text-primary-400 mb-2">
                      <Globe className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">Language</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { code: 'en-GB', label: 'English (UK)', flag: 'gb' },
                        { code: 'en-US', label: 'English (US)', flag: 'us' },
                      ].map(({ code, label, flag }) => (
                        <motion.button
                          key={code}
                          onClick={() => updateSettings({ locale: code as 'en-GB' | 'en-US' })}
                          className={cn(
                            'flex items-center gap-2 p-3 rounded-lg border transition-all',
                            settings.locale === code
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-slate-700 hover:border-primary-500/50'
                          )}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <img
                            src={`https://flagcdn.com/w40/${flag}.png`}
                            alt={`${label} Flag`}
                            className="w-6 h-4 rounded"
                          />
                          <span>{label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-3 text-primary-400 mb-2">
                      <Palette className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">Theme</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {['system', 'light', 'dark'].map((theme) => (
                        <motion.button
                          key={theme}
                          onClick={() => updateSettings({ theme: theme as 'system' | 'light' | 'dark' })}
                          className={cn(
                            'p-3 rounded-lg border capitalize transition-all',
                            settings.theme === theme
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-slate-700 hover:border-primary-500/50'
                          )}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {theme}
                        </motion.button>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-3 text-primary-400 mb-2">
                      <Zap className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">Preferences</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { key: 'soundEffects', icon: Volume2, label: 'Sound Effects' },
                        { key: 'animations', icon: Zap, label: 'Animations' },
                        { key: 'highContrast', icon: Eye, label: 'High Contrast' },
                      ].map(({ key, icon: Icon, label }) => (
                        <motion.label
                          key={key}
                          className="flex items-center justify-between p-3 rounded-lg border border-slate-700 hover:border-primary-500/50 transition-all cursor-pointer"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-slate-400" />
                            <span>{label}</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings[key as keyof typeof settings] as boolean}
                            onChange={(e) => updateSettings({ [key]: e.target.checked })}
                            className="checkbox-primary"
                          />
                        </motion.label>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SettingsMenu;