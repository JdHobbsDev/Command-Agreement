import { FormData } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../config/firebase';
import { collection, getDoc, getDocs, doc, setDoc } from 'firebase/firestore';

export interface StoredSubmission {
  id: string;
  data: FormData | null; 
  submittedAt: string;
}

export const saveSubmission = async (formData: Partial<FormData>): Promise<string> => {
  const id = uuidv4();
  const submissionData = {
    id,
    data: formData,
    submittedAt: new Date().toISOString()
  };

  try {
    await setDoc(doc(db, 'submissions', id), submissionData);
    return id;
  } catch (error) {
    console.error('Failed to save to Firebase:', error);
    throw error;
  }
};

export const getSubmission = async (id: string): Promise<StoredSubmission | undefined> => {
  try {
    const docRef = doc(db, 'submissions', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as StoredSubmission;
      return data;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Failed to read from Firebase:', error);
    throw error;
  }
};

export const getAllSubmissions = async (): Promise<StoredSubmission[]> => {
  try {
    const submissionsRef = collection(db, 'submissions');
    const querySnapshot = await getDocs(submissionsRef);
    
    return querySnapshot.docs.map(doc => doc.data() as StoredSubmission);
  } catch (error) {
    console.error('Failed to get all submissions from Firebase:', error);
    throw error;
  }
};