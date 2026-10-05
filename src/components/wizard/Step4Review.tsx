import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  CheckCircle2,
  Building,
  CreditCard,
  Users,
  Pencil,
  ShieldCheck,
  Zap,
  Globe,
  Mail,
  AlertCircle,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { OnboardingFormData } from '../../schema/onboardingSchema';

interface Step4ReviewProps {
  onGoToStep: (step: number) => void;
}

export const Step4Review: React.FC<Step4ReviewProps> = ({ onGoToStep }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<OnboardingFormData>();

  const formData = watch();
  const validInvites = (formData.invites || []).filter(
    (inv) => inv.email && inv.email.trim().length > 0
  );

  const planPrices = {
    starter: { monthly: 19, annual: 15 },
    pro: { monthly: 49, annual: 39 },
    enterprise: { monthly: 149, annual: 119 },
  };

  const selectedPlanKey = formData.plan || 'pro';
  const price =
    formData.billingCycle === 'annual'
      ? planPrices[selectedPlanKey].annual
      : planPrices[selectedPlanKey].monthly;

  return (
    <div className="space-y-7 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header section */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="success" size="sm">
            <CheckCircle2 className="w-3 h-3" />
            Step 4 of 4
          </Badge>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Review & Launch
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Double-check your workspace setup details before provisioning your environment.
        </p>
      </div>

      {/* Summary Grid Cards */}
      <div className="space-y-4">
        {/* Workspace Summary */}
        <Card className="p-5 bg-zinc-900/60 border-zinc-800">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Building className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Workspace Configuration
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(1)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Pencil className="w-3 h-3" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-zinc-500 block">Workspace Name</span>
              <span className="font-semibold text-zinc-100 text-sm mt-0.5 block">
                {formData.workspaceName || 'Not configured'}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block">Domain URL</span>
              <span className="font-mono text-indigo-300 font-medium text-xs mt-0.5 flex items-center gap-1">
                <Globe className="w-3 h-3 text-zinc-500" />
                {formData.subdomain || 'app'}.nexuscloud.io
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block">Team Size</span>
              <span className="font-medium text-zinc-200 mt-0.5 block">
                {formData.teamSize || '1-5'} members ({formData.industry || 'general'})
              </span>
            </div>
          </div>
        </Card>

        {/* Plan Summary */}
        <Card className="p-5 bg-zinc-900/60 border-zinc-800">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Selected Subscription
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(2)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Pencil className="w-3 h-3" />
              Edit
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold">
                <Zap className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white capitalize">
                    {formData.plan || 'Pro'} Plan
                  </span>
                  <Badge variant="purple" size="sm">
                    {formData.billingCycle === 'annual' ? 'Billed Annually' : 'Billed Monthly'}
                  </Badge>
                </div>
                <p className="text-zinc-400 text-[11px] mt-0.5">
                  14-day free trial included. No upfront charge.
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xl font-extrabold text-white">${price}</span>
              <span className="text-zinc-400 text-xs"> / user / mo</span>
            </div>
          </div>
        </Card>

        {/* Team Invites Summary */}
        <Card className="p-5 bg-zinc-900/60 border-zinc-800">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Team Invitations ({validInvites.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(3)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Pencil className="w-3 h-3" />
              Edit
            </button>
          </div>

          {validInvites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {validInvites.map((inv, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="text-zinc-200 truncate">{inv.email}</span>
                  </div>
                  <Badge
                    variant={
                      inv.role === 'Admin'
                        ? 'primary'
                        : inv.role === 'Member'
                        ? 'success'
                        : 'neutral'
                    }
                    size="sm"
                    className="shrink-0 ml-2"
                  >
                    {inv.role}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-500 italic">
              No pending email invites. You can invite team members anytime via your workspace settings.
            </p>
          )}
        </Card>
      </div>

      {/* Terms & Conditions Checkbox */}
      <div className="space-y-3 pt-2">
        <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all">
          <input
            type="checkbox"
            {...register('termsAccepted')}
            className="w-4 h-4 mt-0.5 rounded border-zinc-700 bg-zinc-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-zinc-900 accent-indigo-600 cursor-pointer"
          />
          <div className="text-xs text-zinc-300">
            <span className="font-semibold text-white">I agree to the Terms of Service & Privacy Policy</span>
            <p className="text-zinc-400 text-[11px] mt-0.5">
              By launching your workspace, you accept the Nexus Cloud SaaS Master Services Agreement and acknowledge data processing guidelines.
            </p>
          </div>
        </label>
        {errors.termsAccepted && (
          <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium pl-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.termsAccepted.message}</span>
          </div>
        )}

        {/* Optional Newsletter Opt-in */}
        <label className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs text-zinc-400 hover:text-zinc-300 cursor-pointer">
          <input
            type="checkbox"
            {...register('newsletterOptIn')}
            className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
          />
          <span>Receive product announcements, new features, and engineering digests (Optional)</span>
        </label>
      </div>

      {/* Security note */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs">
        <ShieldCheck className="w-4 h-4 shrink-0 text-indigo-400" />
        <span>End-to-end 256-bit encryption active. Your workspace will deploy immediately upon submission.</span>
      </div>
    </div>
  );
};
