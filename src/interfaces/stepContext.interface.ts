export default interface IStepContextType {
	currentStep: number;
	nextStep: () => void;
	previousStep: () => void;
	resetStep: () => void;
}