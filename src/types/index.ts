export interface FormData {
  discordId: string;
  email: string;
  position: string;
  acceptTerms: boolean;
  acceptRules: boolean;
  acceptConduct: boolean;
  age: number;
  division: 'ERPT' | 'AFO' | 'DSU' | 'RTPC' | 'NHS';
  commandTier: 'Bronze Command' | 'Silver Command' | 'Gold Command';
  professionalConduct: boolean;
  confidentiality: boolean;
  disciplinaryActions: boolean;
  ageConfirmation: boolean;
  inductionAttendance: boolean;
  policyAcknowledgment: boolean;
}

export type FormStep = 'welcome' | 'personal' | 'agreements' | 'information' | 'review' | 'success';
