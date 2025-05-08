import { useState } from 'react';
import { FormData, FormStep } from '../types';
import { sendToDiscord } from '../utils/discord';

const defaultFormData: FormData = {
  discordId: '',
  email: '',
  position: '',
  acceptTerms: false,
  acceptRules: false,
  acceptConduct: false,
  age: 0,
  division: 'ERPT',
  commandTier: 'Bronze Command',
  professionalConduct: false,
  confidentiality: false,
  disciplinaryActions: false,
  ageConfirmation: false,
  inductionAttendance: false,
  policyAcknowledgment: false
};

export const useAgreementForm = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState<FormStep>('welcome');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFormData = (fields: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => {
    switch (currentStep) {
      case 'welcome':
        setCurrentStep('personal');
        break;
      case 'personal':
        setCurrentStep('agreements');
        break;
      case 'agreements':
        setCurrentStep('information');
        break;
      case 'information':
        setCurrentStep('review');
        break;
      case 'review':
        submitForm();
        break;
      default:
        break;
    }
  };

  const prevStep = () => {
    switch (currentStep) {
      case 'personal':
        setCurrentStep('welcome');
        break;
      case 'agreements':
        setCurrentStep('personal');
        break;
      case 'information':
        setCurrentStep('agreements');
        break;
      case 'review':
        setCurrentStep('information');
        break;
      default:
        break;
    }
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setCurrentStep('welcome');
    setError(null);
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const success = await sendToDiscord(formData);
      
      if (success) {
        setCurrentStep('success');
      } else {
        setError('Failed to submit your agreement. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 'welcome':
        return true;
      case 'personal':
        return !!formData.discordId && 
               formData.age >= 13 &&
               !!formData.email &&
               !!formData.division &&
               !!formData.commandTier;
      case 'agreements':
        return formData.acceptTerms && 
               formData.acceptRules && 
               formData.acceptConduct;
      case 'information':
        return formData.professionalConduct &&
               formData.confidentiality &&
               formData.disciplinaryActions &&
               formData.ageConfirmation &&
               formData.inductionAttendance &&
               formData.policyAcknowledgment;
      case 'review':
        return true;
      default:
        return false;
    }
  };

  return {
    formData,
    currentStep,
    isSubmitting,
    error,
    updateFormData,
    nextStep,
    prevStep,
    resetForm,
    canProceed
  };
};