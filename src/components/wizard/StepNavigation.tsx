import React from 'react';
import { ArrowLeft, ArrowRight, Rocket } from 'lucide-react';
import { Button } from '../ui/Button';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isNextLoading?: boolean;
  isNextDisabled?: boolean;
  nextLabel?: string;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isNextLoading = false,
  isNextDisabled = false,
  nextLabel,
}) => {
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  return (
    <div className="flex items-center justify-between pt-6 mt-8 border-t border-zinc-800/80">
      <div>
        {!isFirstStep ? (
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onBack}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            disabled={isNextLoading}
          >
            Back
          </Button>
        ) : (
          <div className="text-xs text-zinc-500 font-mono">
            Step {currentStep} of {totalSteps}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={onNext}
          isLoading={isNextLoading}
          disabled={isNextDisabled}
          rightIcon={
            isLastStep ? (
              <Rocket className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )
          }
        >
          {nextLabel || (isLastStep ? 'Launch Workspace' : 'Continue')}
        </Button>
      </div>
    </div>
  );
};
