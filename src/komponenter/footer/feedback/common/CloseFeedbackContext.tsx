import { createContext, Dispatch, SetStateAction } from 'react';

interface CloseFeedbackProps {
  closeFeedback: boolean;
  setCloseFeedback: Dispatch<SetStateAction<boolean>>;
}

export const CloseFeedbackContext = createContext<CloseFeedbackProps | null>(null);
