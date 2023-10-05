import { createContext, useState, useEffect, ReactNode } from 'react';
import IStepContextType from '../../interfaces/stepContext.interface';

const StepContext = createContext<IStepContextType | null>(null);

export function StepsProvider({ children }: {children: ReactNode}) {

  const [currentStep, setCurrentStep] = useState(() => {
    const storedStep = localStorage.getItem('currentStep');
    return storedStep ? parseInt(storedStep, 10) : 0;
  });

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const resetStep = () => {
    setCurrentStep(0);
  };

  useEffect(() => {
    localStorage.setItem('currentStep', currentStep.toString());
  }, [currentStep]);

  return (
    <StepContext.Provider value={{ currentStep, nextStep, previousStep, resetStep }}>
      {children}
    </StepContext.Provider>
  );
}

export default StepContext;
