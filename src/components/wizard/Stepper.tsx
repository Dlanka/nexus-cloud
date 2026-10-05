import React from 'react';
import { motion } from 'framer-motion';
import { Check, Building2, CreditCard, Users, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface StepItem {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const WIZARD_STEPS: StepItem[] = [
  {
    id: 1,
    title: 'Workspace Details',
    shortTitle: 'Workspace',
    description: 'Name, subdomain & size',
    icon: Building2,
  },
  {
    id: 2,
    title: 'Select Plan',
    shortTitle: 'Plan',
    description: 'Tier & billing frequency',
    icon: CreditCard,
  },
  {
    id: 3,
    title: 'Team Members',
    shortTitle: 'Team',
    description: 'Invite collaborators',
    icon: Users,
  },
  {
    id: 4,
    title: 'Review & Launch',
    shortTitle: 'Review',
    description: 'Confirm & provision',
    icon: CheckCircle2,
  },
];

interface StepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
  maxStepVisited: number;
}

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  onStepClick,
  maxStepVisited,
}) => {
  const progressPercent = ((currentStep - 1) / (WIZARD_STEPS.length - 1)) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-2">
      {/* Mobile view progress text */}
      <div className="flex sm:hidden items-center justify-between mb-3 text-xs">
        <span className="text-zinc-400 font-medium">
          Step {currentStep} of {WIZARD_STEPS.length}:{' '}
          <span className="text-white font-semibold">{WIZARD_STEPS[currentStep - 1].title}</span>
        </span>
        <span className="text-indigo-400 font-mono font-medium">{Math.round(progressPercent)}%</span>
      </div>

      {/* Stepper items with segment connecting lines */}
      <div className="flex items-start justify-between relative">
        {WIZARD_STEPS.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isAccessible = step.id <= maxStepVisited;
          const StepIcon = step.icon;
          const hasNextStep = index < WIZARD_STEPS.length - 1;

          return (
            <div key={step.id} className="flex-1 flex flex-col items-center relative">
              {/* Connector line between this step center and the next step center */}
              {hasNextStep && (
                <div className="hidden sm:block absolute top-[22px] left-1/2 w-full -translate-y-1/2 h-[2px] bg-zinc-800 z-0">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    initial={false}
                    animate={{
                      width: step.id < currentStep ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  />
                </div>
              )}

              {/* Step Button */}
              <button
                type="button"
                onClick={() => isAccessible && onStepClick?.(step.id)}
                disabled={!isAccessible}
                className={cn(
                  'group flex flex-col items-center focus:outline-none transition-all relative z-10',
                  isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'
                )}
              >
                {/* Node Circle */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.08 : 1,
                  }}
                  className={cn(
                    'w-11 h-11 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 shadow-md',
                    isCompleted &&
                      'bg-indigo-600 border-indigo-500 text-white shadow-indigo-600/30 shadow-lg',
                    isCurrent &&
                      'bg-zinc-950 border-indigo-500 text-indigo-400 ring-4 ring-indigo-500/20 shadow-indigo-500/30 shadow-lg',
                    !isCompleted &&
                      !isCurrent &&
                      'bg-zinc-950 border-zinc-800 text-zinc-500 group-hover:border-zinc-700 group-hover:text-zinc-400'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white stroke-[2.5]" />
                  ) : (
                    <StepIcon className={cn('w-5 h-5', isCurrent ? 'text-indigo-400' : 'text-zinc-500')} />
                  )}
                </motion.div>

                {/* Step Labels for desktop */}
                <div className="hidden sm:flex flex-col items-center mt-2.5 text-center">
                  <span
                    className={cn(
                      'text-xs font-semibold tracking-tight transition-colors',
                      isCurrent && 'text-white font-bold',
                      isCompleted && 'text-zinc-300',
                      !isCompleted && !isCurrent && 'text-zinc-500'
                    )}
                  >
                    {step.shortTitle}
                  </span>
                  <span className="text-[10px] text-zinc-500 max-w-[110px] truncate">
                    {step.description}
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Mobile progress bar */}
      <div className="sm:hidden mt-2 w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          animate={{ width: `${Math.max(10, progressPercent)}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};
