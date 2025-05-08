import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home } from 'lucide-react';
import confetti from '../../utils/confetti';

interface SuccessStepProps {
  onReset: () => void;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ onReset }) => {

  const [, setShowConfetti] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowConfetti(true);
      confetti();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-8 max-w-2xl mx-auto text-center"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ 
          delay: 0.3,
          duration: 0.8,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="flex justify-center mb-8"
      >
        <div className="p-3 bg-success-500/20 rounded-full">
          <CheckCircle className="h-16 w-16 text-success-500" />
        </div>
      </motion.div>
      
      <motion.h2 
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        Agreement Submitted Successfully!
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p className="text-slate-300 mb-8">
          Thank you for completing your command agreement. Your submission has been sent to our management team for review. You'll receive further instructions via Discord soon.
        </p>
        
        <div className="bg-primary-900/20 border border-primary-800 rounded-lg p-4 mb-8 text-sm text-primary-300">
          <p className="mb-2 font-medium">What happens next?</p>
          <ul className="list-disc list-inside text-left space-y-1">
            <li>Management will verify your details</li>
            <li>You'll receive confirmation in our Discord server</li>
            <li>Access to command systems will be granted</li>
            <li>A welcome briefing will be scheduled</li>
          </ul>
        </div>
        
        <button 
          onClick={onReset}
          className="btn-primary flex items-center justify-center mx-auto"
        >
          <Home className="mr-2 h-5 w-5" />
          Return to Home
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessStep;
