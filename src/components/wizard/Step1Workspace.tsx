import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Globe, Sparkles, Building, Code2, Palette, Megaphone, Box, Briefcase } from 'lucide-react';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { OnboardingFormData } from '../../schema/onboardingSchema';
import { cn } from '../../utils/cn';

const TEAM_SIZES = [
  { id: '1-5', label: '1 - 5', desc: 'Solo & Seed', icon: '🌱' },
  { id: '6-20', label: '6 - 20', desc: 'Growing Team', icon: '🚀' },
  { id: '21-50', label: '21 - 50', desc: 'Scaling Company', icon: '🏢' },
  { id: '50+', label: '50+', desc: 'Enterprise', icon: '🏛️' },
] as const;

const INDUSTRIES = [
  { id: 'engineering', label: 'Engineering & DevOps', icon: Code2 },
  { id: 'design', label: 'Design & Creative', icon: Palette },
  { id: 'marketing', label: 'Marketing & Growth', icon: Megaphone },
  { id: 'product', label: 'Product & Strategy', icon: Box },
  { id: 'other', label: 'General / Other', icon: Briefcase },
] as const;

export const Step1Workspace: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<OnboardingFormData>();

  const workspaceName = watch('workspaceName');
  const selectedTeamSize = watch('teamSize');
  const selectedIndustry = watch('industry');
  const subdomain = watch('subdomain');

  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  // Auto-generate subdomain from workspace name if user hasn't typed custom slug
  useEffect(() => {
    if (!isSlugManuallyEdited && workspaceName) {
      const generated = workspaceName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 30);
      setValue('subdomain', generated, { shouldValidate: true });
    }
  }, [workspaceName, isSlugManuallyEdited, setValue]);

  return (
    <div className="space-y-7 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header section */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="primary" size="sm">
            <Building className="w-3 h-3" />
            Step 1 of 4
          </Badge>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Create your workspace
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Set up the foundation for your team's real-time projects and collaboration.
        </p>
      </div>

      {/* Main inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Workspace Name */}
        <div className="space-y-1 md:col-span-2">
          <Input
            label="Workspace Name"
            placeholder="e.g. Acme Studio, Linear Labs"
            leftIcon={<Building className="w-4 h-4" />}
            requiredIndicator
            error={errors.workspaceName?.message}
            {...register('workspaceName')}
          />
        </div>

        {/* Subdomain Input */}
        <div className="space-y-1 md:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Workspace URL <span className="text-rose-400">*</span>
            </label>
            <span className="text-xs text-zinc-500 font-mono">
              nexuscloud.io
            </span>
          </div>

          <Input
            placeholder="acme-studio"
            leftIcon={<Globe className="w-4 h-4" />}
            suffixText=".nexuscloud.io"
            error={errors.subdomain?.message}
            {...register('subdomain', {
              onChange: () => setIsSlugManuallyEdited(true),
            })}
          />
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1 pl-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>
              Your team will access the dashboard at:{' '}
              <span className="text-indigo-300 font-mono font-medium">
                https://{subdomain || 'your-subdomain'}.nexuscloud.io
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Team Size Selector */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Team Size <span className="text-rose-400">*</span>
          </label>
          <span className="text-xs text-zinc-500">How many members in your organization?</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TEAM_SIZES.map((size) => {
            const isSelected = selectedTeamSize === size.id;
            return (
              <Card
                key={size.id}
                hoverable
                selected={isSelected}
                onClick={() => setValue('teamSize', size.id, { shouldValidate: true })}
                className={cn(
                  'p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all',
                  isSelected ? 'border-indigo-500 bg-indigo-950/20' : 'hover:border-zinc-700'
                )}
              >
                <span className="text-2xl mb-1">{size.icon}</span>
                <span className="text-sm font-bold text-white">{size.label}</span>
                <span className="text-[11px] text-zinc-400 mt-0.5">{size.desc}</span>
              </Card>
            );
          })}
        </div>
        {errors.teamSize && (
          <p className="text-xs text-rose-400 font-medium">{errors.teamSize.message}</p>
        )}
      </div>

      {/* Primary Use Case / Industry */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Primary Industry / Use Case
          </label>
          <span className="text-xs text-zinc-500">Helps customize your templates</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {INDUSTRIES.map((ind) => {
            const isSelected = selectedIndustry === ind.id;
            const Icon = ind.icon;
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => setValue('industry', ind.id, { shouldValidate: true })}
                className={cn(
                  'flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all text-xs font-medium cursor-pointer',
                  isSelected
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-200'
                    : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                )}
              >
                <Icon className={cn('w-4 h-4 shrink-0', isSelected ? 'text-indigo-400' : 'text-zinc-500')} />
                <span className="truncate">{ind.label}</span>
              </button>
            );
          })}
        </div>
        {errors.industry && (
          <p className="text-xs text-rose-400 font-medium">{errors.industry.message}</p>
        )}
      </div>
    </div>
  );
};
