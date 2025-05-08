import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSubmission, StoredSubmission } from '../utils/submissionStorage';
import { Shield, CheckCircle, AlertTriangle, ArrowLeft, ExternalLink } from 'lucide-react';

const SubmissionView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [submission, setSubmission] = useState<StoredSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEmbedded, setIsEmbedded] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const result = await getSubmission(id!);
        setSubmission(result ? result : null);
      } catch (error) {
        console.error("Error fetching submission:", error);
        setError('An error occurred while retrieving the submission.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubmission();
  }, [id]);


  useEffect(() => {
    try {
      setIsEmbedded(window.self !== window.top);
    } catch (e) {
        setIsEmbedded(true);
        console.log(e);
    }
  }, []);

  if (isEmbedded) {
    return (
      <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-center">
        <h2 className="text-xl font-bold mb-2">Command Agreement Submission</h2>
        <p className="text-slate-300 mb-4">
          A command agreement has been submitted and requires review.
        </p>
        <a 
          href={window.location.href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center justify-center"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View Full Submission
        </a>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <div className="glass-card p-8 max-w-2xl mx-auto text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-primary-500/20 rounded-full mb-4"></div>
            <div className="h-6 w-48 bg-slate-700 rounded mb-4"></div>
            <div className="h-4 w-64 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <div className="glass-card p-8 max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-error-500/20 rounded-full">
              <AlertTriangle className="h-12 w-12 text-error-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Submission Not Found</h2>
          <p className="text-slate-300 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  if (!submission || !submission.data) {
    return null;
  }

  const { data, submittedAt } = submission;
  const submittedDate = new Date(submittedAt).toLocaleString();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="glass-card p-8 max-w-3xl w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary-500/10 rounded-full mr-3">
                <Shield className="h-8 w-8 text-primary-500" />
              </div>
              <h1 className="text-2xl font-bold">Command Agreement Submission</h1>
            </div>
            <div className="bg-success-500/10 px-3 py-1 rounded-full flex items-center">
              <CheckCircle className="h-4 w-4 text-success-500 mr-1" />
              <span className="text-xs font-medium text-success-400">Verified</span>
            </div>
          </div>

          <div className="mb-6 text-sm text-slate-400">
            Submitted on {submittedDate}
          </div>

          <div className="space-y-6">
            <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/50">
              <h3 className="text-lg font-semibold mb-3 text-primary-400">Personal Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Discord ID</p>
                  <p className="font-medium text-white">{data?.discordId}</p>
                </div>

                <div>
                  <p className="text-slate-400">Age</p>
                  <p className="font-medium text-white">{data?.age}</p>
                </div>

                <div>
                  <p className="text-slate-400">Email Address</p>
                  <p className="font-medium text-white">{data?.email}</p>
                </div>

                <div>
                  <p className="text-slate-400">Division</p>
                  <p className="font-medium text-white">{data?.division}</p>
                </div>

                <div>
                  <p className="text-slate-400">Command Tier</p>
                  <p className="font-medium text-white">{data?.commandTier}</p>
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
                This submission has been verified and recorded in the UKRP Command System.
                For any questions or concerns, please contact the management team.
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleGoBack}
                className="btn-primary flex items-center justify-center group"
              >
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Return to Form
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubmissionView;