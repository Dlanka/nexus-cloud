import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  onboardingFormSchema,
  defaultOnboardingValues,
  type OnboardingFormData,
} from './schema/onboardingSchema';
import { Header } from './components/Header';
import { Stepper, WIZARD_STEPS } from './components/wizard/Stepper';
import { StepNavigation } from './components/wizard/StepNavigation';
import { Step1Workspace } from './components/wizard/Step1Workspace';
import { Step2Plan } from './components/wizard/Step2Plan';
import { Step3Team } from './components/wizard/Step3Team';
import { Step4Review } from './components/wizard/Step4Review';
import { CelebrationModal } from './components/wizard/CelebrationModal';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [maxStepVisited, setMaxStepVisited] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const methods = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: defaultOnboardingValues,
    mode: 'onTouched',
  });

  const { trigger, handleSubmit, reset } = methods;

  // Validate fields relevant to each step before proceeding
  const validateCurrentStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger(['workspaceName', 'subdomain', 'teamSize', 'industry']);
      case 2:
        return await trigger(['plan', 'billingCycle']);
      case 3:
        return await trigger(['invites']);
      case 4:
        return await trigger(['termsAccepted']);
      default:
        return true;
    }
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep(currentStep);
    if (!isValid) return;

    if (currentStep < WIZARD_STEPS.length) {
      setDirection(1);
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setMaxStepVisited((prev) => Math.max(prev, nextStep));
    } else {
      // Final Submit on Step 4
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = async (targetStep: number) => {
    if (targetStep === currentStep) return;

    if (targetStep > currentStep) {
      const isValid = await validateCurrentStep(currentStep);
      if (!isValid) return;
    }

    setDirection(targetStep > currentStep ? 1 : -1);
    setCurrentStep(targetStep);
    setMaxStepVisited((prev) => Math.max(prev, targetStep));
  };

  const handleFinalSubmit = handleSubmit(async (_data) => {
    setIsSubmitting(true);
    // Simulate brief API call / provisioning initiation
    await new Promise((res) => setTimeout(res, 1200));
    setIsSubmitting(false);
    setShowCelebration(true);
  });

  const handleReset = () => {
    reset(defaultOnboardingValues);
    setCurrentStep(1);
    setMaxStepVisited(1);
    setShowCelebration(false);
  };

  // Slide transition variants for Framer Motion AnimatePresence
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative selection:bg-indigo-500 selection:text-white">
        {/* Ambient background glows */}
        <div className="fixed top-0 left-1/4 w-[600px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-[600px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Global SaaS Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-center justify-start py-8 px-4 sm:px-6 relative z-10">
          {/* Stepper Progress */}
          <Stepper
            currentStep={currentStep}
            onStepClick={handleStepClick}
            maxStepVisited={maxStepVisited}
          />

          {/* Wizard Card Container */}
          <div className="w-full max-w-3xl">
            <div className="relative rounded-3xl border border-zinc-800/90 bg-zinc-900/75 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
              {/* Step Content with Directional Animated Slide */}
              <div className="overflow-hidden">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {currentStep === 1 && <Step1Workspace />}
                    {currentStep === 2 && <Step2Plan />}
                    {currentStep === 3 && <Step3Team />}
                    {currentStep === 4 && <Step4Review onGoToStep={handleStepClick} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Action Buttons */}
              <StepNavigation
                currentStep={currentStep}
                totalSteps={WIZARD_STEPS.length}
                onBack={handleBack}
                onNext={handleNext}
                isNextLoading={isSubmitting}
                nextLabel={currentStep === 4 ? 'Complete Setup' : undefined}
              />
            </div>

            {/* Sub footer hint */}
            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-zinc-500">
              <span>Secure SSL 256-Bit</span>
              <span>•</span>
              <span>SOC2 Type II Certified</span>
              <span>•</span>
              <span>Instant Cloud Deployment</span>
            </div>
          </div>
        </main>

        {/* Celebration / Finish Modal */}
        {showCelebration && (
          <CelebrationModal
            formData={methods.getValues()}
            onReset={handleReset}
          />
        )}
      </div>
    </FormProvider>
  );
};

export default App;
