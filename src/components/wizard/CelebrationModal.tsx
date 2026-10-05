import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Sparkles,
  ExternalLink,
  RotateCcw,
  ShieldCheck,
  Server,
  Globe,
  Users,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { triggerConfetti, triggerSideCannons } from '../../utils/confetti';
import type { OnboardingFormData } from '../../schema/onboardingSchema';

interface CelebrationModalProps {
  formData: OnboardingFormData;
  onReset: () => void;
}

const PROVISION_STEPS = [
  { label: 'Initializing isolated tenant environment', icon: Server },
  { label: 'Configuring custom DNS & SSL certificates', icon: Globe },
  { label: 'Dispatching member invitation magic links', icon: Users },
  { label: 'Applying enterprise security & audit logs', icon: ShieldCheck },
];

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  formData,
  onReset,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isProvisioningDone, setIsProvisioningDone] = useState(false);
  const [copied, setCopied] = useState(false);

  // Progressive simulated provisioning
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    PROVISION_STEPS.forEach((_, idx) => {
      const t = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, idx]);
      }, 500 * (idx + 1));
      timeouts.push(t);
    });

    const finishTimeout = setTimeout(() => {
      setIsProvisioningDone(true);
      triggerConfetti();
      triggerSideCannons();
    }, 500 * (PROVISION_STEPS.length + 1));
    timeouts.push(finishTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const workspaceUrl = `https://${formData.subdomain || 'acme'}.nexuscloud.io`;

  const handleCopy = () => {
    navigator.clipboard.writeText(workspaceUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl my-8 bg-zinc-900 border border-zinc-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden"
      >
        {/* Glow ambient background behind modal */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Celebration Badge */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-xl shadow-indigo-500/25 mb-4"
          >
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
            </div>
          </motion.div>

          <Badge variant="purple" size="md" className="mb-2">
            Workspace Ready
          </Badge>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome to {formData.workspaceName}!
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-md">
            Your production workspace has been successfully provisioned on the Nexus Cloud infrastructure.
          </p>
        </div>

        {/* Provisioning Progress / Checklist */}
        <div className="my-6 p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-2.5">
          {PROVISION_STEPS.map((step, idx) => {
            const isDone = completedSteps.includes(idx);
            const StepIcon = step.icon;

            return (
              <div
                key={idx}
                className="flex items-center justify-between text-xs transition-opacity duration-300"
                style={{ opacity: isDone ? 1 : 0.4 }}
              >
                <div className="flex items-center gap-2.5">
                  <StepIcon className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-300 font-medium">{step.label}</span>
                </div>
                {isDone ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 text-emerald-400 font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Done</span>
                  </motion.span>
                ) : (
                  <span className="w-3 h-3 rounded-full border-2 border-zinc-600 border-t-transparent animate-spin" />
                )}
              </div>
            );
          })}
        </div>

        {/* Workspace Summary Snapshot */}
        <Card className="p-5 bg-zinc-900/90 border-zinc-800 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Workspace URL
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-base font-bold text-indigo-300 font-mono">
                  {workspaceUrl}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy URL"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="primary" size="md">
                {formData.plan?.toUpperCase()} TIER
              </Badge>
              <Badge variant="neutral" size="md">
                {formData.teamSize} SEATS
              </Badge>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="w-full sm:flex-1"
            rightIcon={<ExternalLink className="w-4 h-4" />}
            onClick={() => {
              triggerConfetti();
              alert(`Navigating to ${workspaceUrl} dashboard!`);
            }}
            disabled={!isProvisioningDone}
          >
            Launch Dashboard
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            leftIcon={<RotateCcw className="w-4 h-4" />}
            onClick={onReset}
          >
            Restart Wizard
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
