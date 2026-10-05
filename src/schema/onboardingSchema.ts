import { z } from 'zod';

// Step 1: Workspace Schema
export const step1Schema = z.object({
  workspaceName: z
    .string()
    .trim()
    .min(2, { message: 'Workspace name must be at least 2 characters' })
    .max(50, { message: 'Workspace name cannot exceed 50 characters' }),
  subdomain: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, { message: 'Subdomain must be at least 3 characters' })
    .max(30, { message: 'Subdomain cannot exceed 30 characters' })
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
      message: 'Subdomain can only contain lowercase letters, numbers, and hyphens (no trailing/leading hyphens)',
    }),
  teamSize: z.enum(['1-5', '6-20', '21-50', '50+'], {
    errorMap: () => ({ message: 'Please select your team size' }),
  }),
  industry: z.enum(['engineering', 'design', 'marketing', 'product', 'other'], {
    errorMap: () => ({ message: 'Please select an industry/use case' }),
  }),
});

// Step 2: Plan Schema
export const step2Schema = z.object({
  plan: z.enum(['starter', 'pro', 'enterprise'], {
    errorMap: () => ({ message: 'Please select a subscription plan' }),
  }),
  billingCycle: z.enum(['monthly', 'annual'], {
    errorMap: () => ({ message: 'Please select a billing interval' }),
  }),
});

// Step 3: Team Invites Schema
export const inviteItemSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address' })
    .or(z.literal('')),
  role: z.enum(['Admin', 'Member', 'Viewer']),
});

export const step3Schema = z.object({
  invites: z
    .array(inviteItemSchema)
    .superRefine((items, ctx) => {
      const nonEmpties = items.filter((item) => item.email && item.email.length > 0);
      const seen = new Set<string>();
      
      nonEmpties.forEach((item, index) => {
        const emailLower = item.email.toLowerCase();
        if (seen.has(emailLower)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Duplicate email address',
            path: [index, 'email'],
          });
        }
        seen.add(emailLower);
      });
    }),
});

// Step 4: Review & Terms Schema
export const step4Schema = z.object({
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the Terms of Service & Privacy Policy' }),
  }),
  newsletterOptIn: z.boolean().default(false),
});

// Complete Master Form Schema
export const onboardingFormSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type Step4FormData = z.infer<typeof step4Schema>;
export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;

export const defaultOnboardingValues: OnboardingFormData = {
  workspaceName: '',
  subdomain: '',
  teamSize: '1-5',
  industry: 'engineering',
  plan: 'pro',
  billingCycle: 'annual',
  invites: [
    { email: '', role: 'Admin' },
    { email: '', role: 'Member' },
  ],
  termsAccepted: true,
  newsletterOptIn: true,
};
