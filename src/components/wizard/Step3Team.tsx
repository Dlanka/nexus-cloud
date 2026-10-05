import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  Trash2,
  Mail,
  Shield,
  Copy,
  Check,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import type { OnboardingFormData } from '../../schema/onboardingSchema';

export const Step3Team: React.FC = () => {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext<OnboardingFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'invites',
  });

  const [copied, setCopied] = useState(false);
  const subdomain = watch('subdomain') || 'acme';
  const inviteUrl = `https://${subdomain}.nexuscloud.io/invite/join-${Math.random().toString(36).substring(2, 8)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddMember = () => {
    append({ email: '', role: 'Member' });
  };

  return (
    <div className="space-y-7 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header section */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="primary" size="sm">
            <Users className="w-3 h-3" />
            Step 3 of 4
          </Badge>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Invite your teammates
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Add collaborators to your workspace. You can assign roles and manage permissions anytime.
        </p>
      </div>

      {/* Dynamic Invites List */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Team Member Invitations ({fields.length})
          </label>
          <span className="text-xs text-zinc-500">Optional: invite now or later</span>
        </div>

        <div className="space-y-2.5">
          <AnimatePresence initial={false}>
            {fields.map((field, index) => {
              const fieldError = errors.invites?.[index]?.email;

              return (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2.5 bg-zinc-900/60 p-3 rounded-2xl border border-zinc-800/80 hover:border-zinc-700/80 transition-all"
                >
                  {/* Email Input */}
                  <div className="flex-1">
                    <Input
                      placeholder={`colleague-${index + 1}@company.com`}
                      leftIcon={<Mail className="w-4 h-4" />}
                      error={fieldError?.message}
                      {...register(`invites.${index}.email` as const)}
                    />
                  </div>

                  {/* Role Select Dropdown */}
                  <div className="w-full sm:w-44 flex items-center gap-2">
                    <div className="relative flex-1">
                      <select
                        {...register(`invites.${index}.role` as const)}
                        className="w-full h-11 bg-zinc-900 text-zinc-200 text-xs font-medium rounded-xl border border-zinc-700/80 px-3 pr-8 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer appearance-none"
                      >
                        <option value="Admin">Admin (Full Access)</option>
                        <option value="Member">Member (Editor)</option>
                        <option value="Viewer">Viewer (Read Only)</option>
                      </select>
                      <Shield className="w-3.5 h-3.5 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Delete button (allow delete if more than 1) */}
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        title="Remove invite"
                        className="w-11 h-11 rounded-xl bg-zinc-800/60 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 border border-zinc-700/60 hover:border-rose-500/30 flex items-center justify-center transition-all cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Add another member button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddMember}
          leftIcon={<Plus className="w-4 h-4" />}
          className="mt-2 border-dashed border-zinc-700 hover:border-indigo-500/50 hover:bg-indigo-500/10 text-zinc-300 hover:text-indigo-300"
        >
          Add another collaborator
        </Button>
      </div>

      {/* Quick Invite Link Card */}
      <Card className="p-4 bg-zinc-900/40 border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Shareable Invite Link</span>
              <Badge variant="success" size="sm">Active</Badge>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5 font-mono truncate max-w-xs sm:max-w-md">
              {inviteUrl}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleCopyLink}
          leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          className="shrink-0 w-full sm:w-auto"
        >
          {copied ? 'Copied Link!' : 'Copy Link'}
        </Button>
      </Card>

      {/* Role explanation */}
      <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-400 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-start gap-2">
          <UserCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-zinc-200">Admin</span>
            <p className="text-[11px] text-zinc-500 mt-0.5">Manage billing, integrations & team permissions.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-zinc-200">Member</span>
            <p className="text-[11px] text-zinc-500 mt-0.5">Can create projects, edit files & deploy.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <UserCheck className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-zinc-200">Viewer</span>
            <p className="text-[11px] text-zinc-500 mt-0.5">Read-only access to workspaces and logs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
