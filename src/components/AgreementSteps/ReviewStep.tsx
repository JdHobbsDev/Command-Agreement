import React from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../../types';
import { ChevronLeft, ClipboardList, Send } from 'lucide-react';

interface ReviewStepProps {
  formData: FormData;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  onNext,
  onPrev,
  isSubmitting
}) => {
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
          <ClipboardList className="h-12 w-12 text-primary-500" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">
        Review Your Agreement
      </h2>

      <p className="text-slate-300 mb-6 text-center">
        Please review your information below before submitting your command agreement.
      </p>

      <div className="space-y-6">
        <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
          <h3 className="text-lg font-semibold mb-3 text-primary-400">Personal Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400">Discord ID</p>
              <p className="font-medium text-white">{formData.discordId}</p>
            </div>

            <div>
              <p className="text-slate-400">Age</p>
              <p className="font-medium text-white">{formData.age}</p>
            </div>

            <div>
              <p className="text-slate-400">Email Address</p>
              <p className="font-medium text-white">{formData.email}</p>
            </div>

            <div>
              <p className="text-slate-400">Division</p>
              <p className="font-medium text-white">{formData.division}</p>
            </div>

            <div>
              <p className="text-slate-400">Command Tier</p>
              <p className="font-medium text-white">{formData.commandTier}</p>
            </div>
          </div>
        </div>

        <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
          <h3 className="text-lg font-semibold mb-3 text-primary-400">Agreements Accepted</h3>

          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-success-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-300">Terms and Conditions</span>
            </li>

            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-success-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-300">Server Rules</span>
            </li>

            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-success-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-300">Code of Conduct</span>
            </li>
          </ul>
        </div>

        <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
          <h3 className="text-lg font-semibold mb-3 text-primary-400">Additional Acknowledgments</h3>

          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-success-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-300">Professional Conduct</span>
            </li>

            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-success-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-300">Server Confidentiality</span>
            </li>

            <li className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-success-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-300">Command Induction</span>
            </li>
          </ul>
        </div>

        <div className="bg-primary-900/20 border border-primary-800 rounded-lg p-4 text-sm text-primary-300">
          <p>
            By submitting this agreement, you confirm that all information provided is accurate
            and that you understand and accept all terms. Your agreement will be sent to the management team for review.
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onPrev}
            disabled={isSubmitting}
            className="btn-ghost flex items-center"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={isSubmitting}
            className="btn-primary flex items-center group"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit Agreement
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewStep;