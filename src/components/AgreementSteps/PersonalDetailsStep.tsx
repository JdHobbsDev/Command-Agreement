import React from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../../types';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

interface PersonalDetailsStepProps {
  formData: FormData;
  updateFormData: (fields: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

const PersonalDetailsStep: React.FC<PersonalDetailsStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
  canProceed
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-8 max-w-2xl mx-auto"
    >
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-primary-500/10 rounded-full">
          <User className="h-12 w-12 text-primary-500" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">
        Your Command Details
      </h2>

      <p className="text-slate-300 mb-6 text-center">
        Please provide your accurate information below. This will be used for command
        identification and communications.
      </p>

      <form className="space-y-6">

        <div>
          <label htmlFor="discordId" className="block text-sm font-medium text-slate-300 mb-1">
            Discord ID
          </label>
          <input
            type="text"
            id="discordId"
            name="discordId"
            value={formData.discordId}
            onChange={handleChange}
            placeholder="16 Digit number. Use /myid in UKRP Discord."
            className="input-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-slate-300 mb-1">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            min="13"
            value={formData.age}
            onChange={handleChange}
            className="input-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@gmail.com (Must be a gmail address)"
            className="input-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="division" className="block text-sm font-medium text-slate-300 mb-1">
            Division
          </label>
          <select
            id="division"
            name="division"
            value={formData.division}
            onChange={handleChange}
            className="input-primary"
            required
          >
            <option value="">Select your division</option>
            <option value="ERPT">ERPT</option>
            <option value="AFO">AFO</option>
            <option value="DSU">DSU</option>
            <option value="RTPC">RTPC</option>
            <option value="LAS">LAS</option>
            <option value="HEMS">HEMS</option>
            <option value="NHS">NHS (Silver+)</option>
            <option value="MPS">MPS (Silver+)</option>
          </select>
        </div>

        <div>
          <label htmlFor="commandTier" className="block text-sm font-medium text-slate-300 mb-1">
            Command Tier
          </label>
          <select
            id="commandTier"
            name="commandTier"
            value={formData.commandTier}
            onChange={handleChange}
            className="input-primary"
            required
          >
            <option value="">Select command tier</option>
            <option value="Bronze Command">Bronze Command</option>
            <option value="Silver Command">Silver Command</option>
            <option value="Gold Command">Gold Command</option>
          </select>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onPrev}
            className="btn-ghost flex items-center group"
          >
            <ChevronLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className="btn-primary flex items-center group relative"
          >
            <span className={`flex items-center ${!canProceed ? 'opacity-70' : ''}`}>
              Continue
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
            {!canProceed && (
              <span className="absolute -top-8 right-0 text-xs text-error-500 whitespace-nowrap">
                Please fill all required fields
              </span>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PersonalDetailsStep;