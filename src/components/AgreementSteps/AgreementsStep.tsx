import React, { useState } from 'react'; 
import { motion } from 'framer-motion';
import { FormData } from '../../types';
import { ChevronLeft, ChevronRight, FileText, X } from 'lucide-react';

interface AgreementsStepProps {
  formData: FormData;
  updateFormData: (fields: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

const UKRP_TERMS = `United Kingdom Roleplay (UKRP) - Terms and Conditions 
Effective Date: 8/5/2025 

Welcome to United Kingdom Roleplay (UKRP), a FiveM server community. By accessing and using UKRP, you agree to the following terms and conditions ("Terms"). These Terms form a legal agreement between you and the operators of UKRP. If you do not agree with any part of these Terms, you must refrain from accessing or using the server. 

1. Eligibility 
Minimum Age Requirement: You must be at least 13 years old to access and use UKRP. If you are under 18 years old, you must have permission from a parent or guardian to use UKRP. By accessing the server, you confirm that you meet these age requirements. 

Parental Consent: If you are under 18, it is your responsibility to ensure that your parent or guardian has read and agrees to these Terms on your behalf. 

2. Account Responsibility 
You are solely responsible for the security of your account and any activity that occurs under your account. UKRP is not liable for any loss or damage caused by unauthorized access to your account. 

If you believe your account has been compromised, you must contact UKRP immediately. UKRP is not responsible for any loss or damage caused by unauthorized use of your account, including any data loss. 

3. Limitations of Liability 
No Liability for Disruptions or Damages: UKRP does not guarantee that the server will be error-free or uninterrupted. We are not liable for any technical issues, data loss, server downtime, or any damages arising from such disruptions. 

Use of the Server is at Your Own Risk: By using UKRP, you understand and agree that your use of the server is entirely at your own risk. UKRP is not responsible for any loss of in-game items, accounts, or any other losses that may occur. 

No Warranty: UKRP is provided "as is" without any warranty, express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. 

4. Indemnification 
You agree to indemnify and hold harmless UKRP, its administrators, staff, and affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the server or violation of these Terms. 

This includes any third-party claims resulting from your actions within the server, whether intentional or not. 

5. Server Maintenance and Availability 
UKRP may occasionally undergo maintenance or upgrades that could result in server downtime. We make no guarantees regarding the availability or uptime of the server and are not responsible for any inconvenience caused during such periods. 

UKRP reserves the right to modify, suspend, or discontinue the server at any time without prior notice. You agree that UKRP will not be liable for any loss or damage arising from such actions. 

6. Data Collection and Privacy 
By using UKRP, you acknowledge that we may collect certain personal information, including but not limited to your in-game name, Discord ID, and activity logs. This data will be used solely for the purposes of server administration, performance improvement, and ensuring compliance with these Terms. 

We are committed to protecting your privacy and handling your data in accordance with applicable laws. However, you acknowledge that no data transmission over the internet is completely secure, and we cannot guarantee the security of your data. 

7. Changes to Terms and Conditions 
UKRP reserves the right to modify, update, or change these Terms at any time. Any changes will be posted on this page with an updated effective date. It is your responsibility to review these Terms periodically for any changes. 

By continuing to use UKRP after such changes, you agree to be bound by the updated Terms. 

8. Governing Law and Jurisdiction 
These Terms are governed by the laws of the United Kingdom. Any disputes arising from or in connection with these Terms will be subject to the exclusive jurisdiction of the courts in the United Kingdom. 

If any provision of these Terms is found to be invalid or unenforceable by a court, the remaining provisions will remain in full force and effect. 

9. Contact Information 
For any questions or concerns about these Terms or your use of UKRP, please contact us through the appropriate channels on our server or website. 

By joining UKRP, you agree to these Terms and Conditions. 

If you do not agree with any part of these Terms, you must immediately cease using the server and leave the community.`;

const DISCORD_RULES = `Discord Rules
1. No Spamming Soundboards in Public VCs
2. No discriminatory language or behaviours based on race, gender, ethnicity, religion, or sexual orientation will be tolerated.
3. Be respectful towards all members of the community and their opinions and beliefs.
4. Do not share or post any explicit or offensive content, such as nudity, violence, or hate speech.
5. No harassment of any kind towards other members is permitted.
6. Sharing personal information of other members without their consent is strictly prohibited.
7. Any form of cheating or hacking in games or contests is not allowed.
8. Do not spam or flood channels with repetitive or meaningless messages.
9. Any discussion or promotion of illegal activities will result in an immediate ban.
10. Respect intellectual property rights. Do not share or distribute copyrighted material.
11. Only share links and content that are safe, family-friendly, and relevant to the community.
12. Do not share any personal information or photos of minors without their parents' permission.
13. Do not impersonate any other person or member of the community unless you have their consent and you don't mean to cause any harm.
14. Do not engage in any form of political discussions or debates.
15. Please refrain from posting any affiliate or referral links.
16. Any violations of the rules will be subject to disciplinary action, including warnings and account suspensions or bans.
17. Respect the decisions of moderators, and do not argue or be disruptive in response to their decisions.
18. Listen to Moderators Follow the instructions of the moderators. If you have an issue, Create a Support Ticket.
19. Keep Avatars and Nicknames Appropriate, Ensure that profile pictures and display names are inoffensive and adhere to the server's guidelines.
20. No Begging or Soliciting, Avoid asking for roles, permissions, or special treatment.
21. No Backseat Moderating, Let the moderators handle rule enforcement. If you have concerns, report them rather than trying to enforce rules yourself.
22. No Pinging Staff or Command without Valid Reasoning. Please also Refrain from Pinging at late/early Times in the Morning/Evening
23. Acknowledge Warnings, Take warnings from moderators seriously. Repeated infractions may lead to more severe consequences.
24. No Alt Accounts for Rule Evasion, Do not create alternate accounts to bypass restrictions or bans.
25. Respect Pronouns Use the correct pronouns for others as specified in their Bios or Pronoun Section. Respect and support diversity.
26. No streaming other roleplay community's in a VC
27. No impersonating command/moderator personnel
29. Follow Discord's Community Guidelines
30. The promotion of other establishments or guilds is not permitted.
31. No Back Stage Recruiting or unsolicited DM Promotion.
32. Follow Discord TOS (Terms of Service)`;

const FIVEM_RULES = `FiveM Rules
1.0 RDM/VDM/NITRP/FRP is Not Tolerated and Consequences Will be Provided.
1.1 Do Not argue with Game Moderators. Their Decision is Final.
1.2 Absolutely No Sexual RP, Offenders will be Banned.
1.3 No Hacking/Cheating, Offenders Will be Permanently Banned without Appeal.
1.4 No Exploiting or Using Bugged Game Mechanics to Gain a Unfair Advantage in Situations.
1.5 No Cop-Baiting.
1.6 No Voice Changers unless it is to enhance RP in a Realistic Way.
1.7 No Harrassment or Bullying.
1.8 No Mental Health Roleplay.
1.9 No Stealing Emergency Vehicles unless it has been Authorized.
2.0 Stick to Realistic and Sensible RP Names, No Names Like "Ben Dover".
2.1 No Forced Roleplay, If a Member does not Want to Participate in a RP then Do not Force it on them.
2.2 Realistic Roleplay, Meaning if You Crash at a Relatively High Speed You Should RP Your injuries.
2.3 Do Not Commit Crimes in Greenzones (All Police/LAS/LFB Stations are Greenzones.)
2.4 No Revenge Reporting.
2.5 No Gang RP without Authorization.
2.6 Treat All Members the Same Regardless of Rank, Position & Power.`;

const SERVER_RULES = `${DISCORD_RULES}\n\n${FIVEM_RULES}`;

const CODE_OF_CONDUCT = `Command Code of Conduct

1. Professional Conduct
   - Maintain professionalism in all interactions
   - Use appropriate language and tone
   - Remain calm and composed in all situations
   - Lead by example for other community members

2. Fair Treatment
   - Treat all community members equally
   - Avoid favoritism or bias
   - Make decisions based on facts, not personal feelings
   - Give warnings before taking action when appropriate

3. Communication Standards
   - Use clear and professional communication
   - Respond promptly to inquiries and reports
   - Keep relevant parties informed of decisions
   - Document important interactions and decisions

4. Confidentiality
   - Maintain confidentiality of sensitive information
   - Do not share private details about community members
   - Keep command discussions private
   - Report security breaches immediately

5. Command Responsibilities
   - Attend required command meetings
   - Stay updated on server changes and policies
   - Complete assigned duties in a timely manner
   - Participate in command training sessions

6. Conflict Resolution
   - Address conflicts professionally and promptly
   - Follow established procedures for disputes
   - Seek assistance when needed
   - Document conflict resolution processes

7. Anti-Corruption
   - Refuse any bribes or special favors
   - Report attempted corruption immediately
   - Maintain transparency in decision-making
   - Avoid conflicts of interest

8. Active Participation
   - Maintain regular activity in the community
   - Participate in community events
   - Support other command members
   - Contribute to community improvement

9. Professional Development
   - Seek to improve command skills
   - Accept feedback constructively
   - Stay updated on best practices
   - Share knowledge with other command members

10. Compliance
    - Follow all server rules and policies
    - Report rule violations consistently
    - Maintain accurate records
    - Accept responsibility for mistakes`;

const AgreementsStep: React.FC<AgreementsStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
  canProceed
}) => {
  const [showFullTerms, setShowFullTerms] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showConduct, setShowConduct] = useState(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateFormData({ [name]: checked });
  };

  const renderTermsModal = () => {
    if (!showFullTerms) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-900 rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-slate-800">
            <h3 className="text-lg font-semibold text-white">Terms and Conditions</h3>
            <button
              onClick={() => setShowFullTerms(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto flex-grow">
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm text-slate-300">
                {UKRP_TERMS}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRulesModal = () => {
    if (!showRules) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-900 rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-slate-800">
            <h3 className="text-lg font-semibold text-white">Server Rules</h3>
            <button
              onClick={() => setShowRules(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto flex-grow">
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm text-slate-300">
                {SERVER_RULES}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderConductModal = () => {
    if (!showConduct) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-900 rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-slate-800">
            <h3 className="text-lg font-semibold text-white">Code of Conduct</h3>
            <button
              onClick={() => setShowConduct(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto flex-grow">
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm text-slate-300">
                {CODE_OF_CONDUCT}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        className="glass-card p-8 max-w-2xl mx-auto"
      >
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-primary-500/10 rounded-full">
            <FileText className="h-12 w-12 text-primary-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          Command Agreements
        </h2>

        <p className="text-slate-300 mb-6 text-center">
          Please review each agreement carefully. You must accept all terms to proceed.
        </p>

        <div className="space-y-6">
          <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-primary-400">Terms and Conditions</h3>
              <button
                type="button"
                className="text-xs text-primary-400 hover:text-primary-300"
                onClick={() => setShowFullTerms(true)}
              >
                View Full Terms
              </button>
            </div>

            <div className="h-32 overflow-y-auto mb-4 text-sm text-slate-300 border border-slate-800 rounded p-3 bg-slate-950/50">
              <p className="mb-2">
                By accepting these terms, you agree to uphold the standards of UKRP. Key points include:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Minimum age requirement of 13 years</li>
                <li>Personal responsibility for account security</li>
                <li>No liability for server disruptions</li>
                <li>Data collection practices</li>
                <li>Governing UK law</li>
              </ul>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mr-3 h-5 w-5 rounded border-slate-700 bg-slate-800 checked:bg-primary-500 
                  checked:border-primary-500 focus:ring-primary-500 focus:ring-offset-slate-900"
              />
              <label htmlFor="acceptTerms" className="text-sm font-medium text-slate-300">
                I have read and accept the Terms and Conditions
              </label>
            </div>
          </div>

          <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-primary-400">Server Rules</h3>
              <button
                type="button"
                className="text-xs text-primary-400 hover:text-primary-300"
                onClick={() => setShowRules(true)}
              >
                View Full Rules
              </button>
            </div>

            <div className="h-32 overflow-y-auto mb-4 text-sm text-slate-300 border border-slate-800 rounded p-3 bg-slate-950/50">
              <p className="mb-2">
                As a member of the command team, you're expected to exemplify the highest standards of
                adherence to server rules. You will:
              </p>
              <ul className="list-disc list-inside space-y-1 mb-2">
                <li>Follow and enforce all server rules consistently</li>
                <li>Demonstrate fair and impartial judgment</li>
                <li>Not abuse your command permissions or status</li>
                <li>Report rule violations appropriately</li>
                <li>Stay updated on any rule changes</li>
              </ul>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="acceptRules"
                name="acceptRules"
                checked={formData.acceptRules}
                onChange={handleChange}
                className="mr-3 h-5 w-5 rounded border-slate-700 bg-slate-800 checked:bg-primary-500 
                  checked:border-primary-500 focus:ring-primary-500 focus:ring-offset-slate-900"
              />
              <label htmlFor="acceptRules" className="text-sm font-medium text-slate-300">
                I have read and accept the Server Rules
              </label>
            </div>
          </div>

          <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-primary-400">Code of Conduct</h3>
              <button
                type="button"
                className="text-xs text-primary-400 hover:text-primary-300"
                onClick={() => setShowConduct(true)}
              >
                View Full Code
              </button>
            </div>

            <div className="h-32 overflow-y-auto mb-4 text-sm text-slate-300 border border-slate-800 rounded p-3 bg-slate-950/50">
              <p className="mb-2">
                The Command Code of Conduct establishes behavioral expectations. As a command member, you will:
              </p>
              <ul className="list-disc list-inside space-y-1 mb-2">
                <li>Treat all community members with respect and dignity</li>
                <li>Avoid conflicts of interest</li>
                <li>Maintain appropriate communication and language</li>
                <li>Cooperate with other command members</li>
                <li>Participate regularly in community and command activities</li>
                <li>Uphold the server's reputation in all interactions</li>
              </ul>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="acceptConduct"
                name="acceptConduct"
                checked={formData.acceptConduct}
                onChange={handleChange}
                className="mr-3 h-5 w-5 rounded border-slate-700 bg-slate-800 checked:bg-primary-500 
                  checked:border-primary-500 focus:ring-primary-500 focus:ring-offset-slate-900"
              />
              <label htmlFor="acceptConduct" className="text-sm font-medium text-slate-300">
                I have read and accept the Code of Conduct
              </label>
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
              className="btn-primary flex items-center group"
            >
              Continue
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
      {renderTermsModal()}
      {renderRulesModal()}
      {renderConductModal()}
    </>
  );
};

export default AgreementsStep;

