import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, ShieldCheck, Sparkles, CreditCard } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { OnboardingFormData } from '../../schema/onboardingSchema';
import { cn } from '../../utils/cn';

interface PlanOption {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number; // per month when billed annually
  icon: React.ComponentType<{ className?: string }>;
  popular?: boolean;
  features: string[];
}

const PLANS: PlanOption[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For individuals & small experiments',
    monthlyPrice: 19,
    annualPrice: 15,
    icon: Zap,
    features: [
      'Up to 5 team members',
      '20GB cloud storage',
      'Basic analytics dashboard',
      'Standard 48-hr support',
      'Community integrations',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For fast-growing scaling teams',
    monthlyPrice: 49,
    annualPrice: 39,
    icon: Sparkles,
    popular: true,
    features: [
      'Unlimited team members',
      '500GB NVMe storage',
      'Real-time metrics & audit trails',
      'Priority 24/7 dedicated support',
      'Custom domains & SSL',
      'Unlimited API webhooks',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For orgs needing security & scale',
    monthlyPrice: 149,
    annualPrice: 119,
    icon: Crown,
    features: [
      'Dedicated private cluster',
      'Unlimited encrypted storage',
      'Custom SAML SSO & SCIM',
      '99.99% uptime guarantee SLA',
      'Dedicated Solutions Architect',
      'Custom contractual compliance',
    ],
  },
];

export const Step2Plan: React.FC = () => {
  const { watch, setValue } = useFormContext<OnboardingFormData>();

  const selectedPlan = watch('plan');
  const billingCycle = watch('billingCycle');

  return (
    <div className="space-y-7 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header section */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="purple" size="sm">
            <CreditCard className="w-3 h-3" />
            Step 2 of 4
          </Badge>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Choose the right plan
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Pick a subscription that grows with your team. Upgrade or switch anytime.
        </p>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center p-1.5 bg-zinc-900/90 border border-zinc-800 rounded-2xl relative shadow-inner">
          <button
            type="button"
            onClick={() => setValue('billingCycle', 'monthly', { shouldValidate: true })}
            className={cn(
              'relative z-10 px-5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer',
              billingCycle === 'monthly' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
            )}
          >
            {billingCycle === 'monthly' && (
              <motion.div
                layoutId="activeBillingPill"
                className="absolute inset-0 bg-zinc-800 border border-zinc-700/80 rounded-xl shadow-md"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">Monthly Billing</span>
          </button>

          <button
            type="button"
            onClick={() => setValue('billingCycle', 'annual', { shouldValidate: true })}
            className={cn(
              'relative z-10 px-5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer',
              billingCycle === 'annual' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
            )}
          >
            {billingCycle === 'annual' && (
              <motion.div
                layoutId="activeBillingPill"
                className="absolute inset-0 bg-zinc-800 border border-zinc-700/80 rounded-xl shadow-md"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">Annual Billing</span>
            <span className="relative z-10 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const PlanIcon = plan.icon;
          const currentPrice =
            billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

          return (
            <Card
              key={plan.id}
              hoverable
              selected={isSelected}
              onClick={() => setValue('plan', plan.id, { shouldValidate: true })}
              className={cn(
                'p-6 flex flex-col justify-between cursor-pointer transition-all relative overflow-hidden',
                plan.popular && !isSelected && 'border-zinc-700/80 hover:border-indigo-500/50',
                isSelected && plan.popular && 'ring-2 ring-indigo-500 shadow-indigo-500/20 shadow-xl'
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-l from-indigo-500 to-purple-600 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-bl-xl shadow-md flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Popular
                  </div>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center border',
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                    )}
                  >
                    <PlanIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{plan.name}</h3>
                    <p className="text-[11px] text-zinc-400">{plan.tagline}</p>
                  </div>
                </div>

                {/* Price Display */}
                <div className="my-5 pb-5 border-b border-zinc-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white tracking-tight">
                      ${currentPrice}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">/ user / mo</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    {billingCycle === 'annual'
                      ? `Billed annually ($${currentPrice * 12}/yr)`
                      : 'Billed monthly, cancel anytime'}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 mb-6">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    What's included:
                  </span>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <div
                        className={cn(
                          'w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                          isSelected
                            ? 'bg-indigo-500/20 text-indigo-400'
                            : 'bg-zinc-800 text-zinc-400'
                        )}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Select Indicator */}
              <div
                className={cn(
                  'w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center transition-all border',
                  isSelected
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-zinc-800/80 border-zinc-700/80 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                )}
              >
                {isSelected ? 'Selected Plan' : 'Select ' + plan.name}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Money back guarantee badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 pt-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>14-day free trial on all plans • No credit card required upfront</span>
      </div>
    </div>
  );
};
