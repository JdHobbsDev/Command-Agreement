import React from 'react';
import { FormStep } from '../types';
import { Check, User, FileText, ClipboardCheck, Award, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import Tooltip from './Tooltip';

interface ProgressBarProps {
  currentStep: FormStep;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps: { id: FormStep; label: string; icon: React.ReactNode }[] = [
    { id: 'welcome', label: 'Welcome', icon: <User className="h-5 w-5" /> },
    { id: 'personal', label: 'Details', icon: <FileText className="h-5 w-5" /> },
    { id: 'agreements', label: 'Terms', icon: <ClipboardCheck className="h-5 w-5" /> },
    { id: 'information', label: 'Info', icon: <Info className="h-5 w-5" /> },
    { id: 'review', label: 'Review', icon: <Check className="h-5 w-5" /> },
    { id: 'success', label: 'Complete', icon: <Award className="h-5 w-5" /> },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep);
  };

  return (
    <div className="w-full py-6">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {steps.map((step, index) => {
          const currentIndex = getCurrentStepIndex();
          const isActive = index <= currentIndex;
          const isCurrentStep = step.id === currentStep;

          return (
            <React.Fragment key={step.id}>

              <Tooltip
                content={`${isActive ? 'Completed' : 'Pending'}: ${step.label} step`}
                position="top"
                delay={200}
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full 
                      transition-all duration-500 
                      ${isActive
                        ? 'bg-primary-600 text-white'
                        : 'bg-slate-800 text-slate-400'}
                      ${isCurrentStep ? 'ring-4 ring-primary-500/20' : ''}
                    `}
                  >
                    {step.icon}
                  </motion.div>
                  <motion.span
                    className={`
                      absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium
                      ${isActive ? 'text-primary-400' : 'text-slate-500'}
                    `}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {step.label}
                  </motion.span>
                </div>
              </Tooltip>

              {index < steps.length - 1 && (
                <div className="flex-1 mx-1">
                  <motion.div
                    className={`h-1 rounded ${index < currentIndex
                      ? 'bg-primary-600'
                      : 'bg-slate-800'
                      }`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1 + 0.2,
                      ease: "easeOut"
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ProgressBar;