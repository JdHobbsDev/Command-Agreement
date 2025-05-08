import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronRight } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-8 max-w-2xl mx-auto"
    >
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-primary-500/10 rounded-full">
          <Shield className="h-12 w-12 text-primary-500" />
        </div>
      </div>
      
      <motion.h1 
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Welcome to the Command Agreement Portal
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-slate-300 mb-4 text-center">
          Congratulations on becoming a member of our command team! Before you begin your duties, 
          we need you to complete this agreement process.
        </p>
        
        <div className="space-y-4 mb-8 text-slate-300">
          <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
            <h3 className="text-lg font-semibold mb-2 text-primary-400">What to expect:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Verification of your command credentials</li>
              <li>Review of server policies and command protocols</li>
              <li>Submission of your command agreement for approval</li>
            </ul>
          </div>
          
          <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
            <h3 className="text-lg font-semibold mb-2 text-primary-400">What happens next:</h3>
            <p>
              After submission, your agreement will be sent to our management team via Discord for review.
              Once approved, you'll have full access to command systems and responsibilities.
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button 
          onClick={onNext}
          className="btn-primary flex items-center justify-center group"
        >
          Begin Agreement Process
          <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeStep;