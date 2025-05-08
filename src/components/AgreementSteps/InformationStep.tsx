import React from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../../types';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface InformationStepProps {
  formData: FormData;
  updateFormData: (fields: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

const InformationStep: React.FC<InformationStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
  canProceed
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateFormData({ [name]: checked });
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
          <Info className="h-12 w-12 text-primary-500" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">
        Command Information Acknowledgment
      </h2>

      <p className="text-slate-300 mb-6 text-center">
        Please review and acknowledge the following statements regarding your role as a command member.
      </p>

      <div className="space-y-6">
        <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
          <h3 className="text-lg font-semibold mb-4 text-primary-400">Professional Standards</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="professionalConduct"
                name="professionalConduct"
                checked={formData.professionalConduct || false}
                onChange={handleChange}
                className="mt-1 mr-3 h-5 w-5 rounded border-slate-700 bg-slate-800 checked:bg-primary-500 
                  checked:border-primary-500 focus:ring-primary-500 focus:ring-offset-slate-900"
              />
              <label htmlFor="professionalConduct" className="text-sm font-medium text-slate-300">
                I commit to maintaining professional conduct at all times
              </label>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="confidentiality"
                name="confidentiality"
                checked={formData.confidentiality || false}
                onChange={handleChange}
                className="mt-1 mr-3 h-5 w-5 rounded border-slate-700 bg-slate-800 checked:bg-primary-500 
                  checked:border-primary-500 focus:ring-primary-500 focus:ring-offset-slate-900"
              />
              <label htmlFor="confidentiality" className="text-sm font-medium text-slate-300">
                I understand and will protect server confidentiality
              </label>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="disciplinaryActions"
                name="disciplinaryActions"
                checked={formData.disciplinaryActions || false}
                onChange={handleChange}
                className="mt-1 mr-3 h-5 w-5 rounded border-slate-700 bg-slate-800 checked:bg-primary-500 
                  checked:border-primary-500 focus:ring-primary-500 focus:ring-offset-slate-900"
              />
              <label htmlFor="disciplinaryActions" className="text-sm font-medium text-slate-300">
                I acknowledge potential disciplinary actions for misconduct
              </label>
            </div>
          </div>
        </div>

        <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
          <h3 className="text-lg font-semibold mb-4 text-primary-400">Eligibility & Training</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="ageConfirmation"
                name="ageConfirmation"
                checked={formData.ageConfirmation || false}
                onChange={handleChange}
                className="mt-1 mr-3 h-5 w-5 rounded border-slate-700 bg-slate-800 checked:bg-primary-500 
                  checked:border-primary-500 focus:ring-primary-500 focus:ring-offset-slate-900"
              />
              <label htmlFor="ageConfirmation" className="text-sm font-medium text-slate-300">
                I confirm I am at least 13 years old and fully responsible
              </label>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="inductionAttendance"
                name="inductionAttendance"
                checked={formData.inductionAttendance || false}
                onChange={handleChange}
                className="mt-1 mr-3 h-5 w-5 rounded border-slate-700 bg-slate-800 checked:bg-primary-500 
                  checked:border-primary-500 focus:ring-primary-500 focus:ring-offset-slate-900"
              />
              <label htmlFor="inductionAttendance" className="text-sm font-medium text-slate-300">
                I have attended the command induction and understand the contents within it
              </label>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="policyAcknowledgment"
                name="policyAcknowledgment"
                checked={formData.policyAcknowledgment || false}
                onChange={handleChange}
                className="mt-1 mr-3 h-5 w-5 rounded border-slate-700 bg-slate-800 checked:bg-primary-500 
                  checked:border-primary-500 focus:ring-primary-500 focus:ring-offset-slate-900"
              />
              <label htmlFor="policyAcknowledgment" className="text-sm font-medium text-slate-300">
                I have read the Command Overview document and acknowledge the policies displayed
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onPrev}
            className="btn-ghost flex items-center"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
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
                Please acknowledge all statements
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default InformationStep;