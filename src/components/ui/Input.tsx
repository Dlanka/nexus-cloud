import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefixText?: string;
  suffixText?: string;
  requiredIndicator?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      prefixText,
      suffixText,
      requiredIndicator,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={inputId}
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
            >
              {label}
              {requiredIndicator && <span className="text-rose-400 ml-1">*</span>}
            </label>
            {hint && <span className="text-xs text-zinc-500">{hint}</span>}
          </div>
        )}

        <div className="relative flex items-center rounded-xl transition-all duration-200 group">
          {prefixText && (
            <div className="flex items-center px-3.5 bg-zinc-800/80 border-y border-l border-zinc-700/80 rounded-l-xl text-zinc-400 text-sm font-medium select-none h-11">
              {prefixText}
            </div>
          )}

          <div className="relative flex-1 flex items-center">
            {leftIcon && (
              <div className="absolute left-3.5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none">
                {leftIcon}
              </div>
            )}

            <input
              id={inputId}
              ref={ref}
              className={cn(
                'w-full h-11 bg-zinc-900/90 text-zinc-100 placeholder-zinc-500 text-sm rounded-xl border border-zinc-700/80 transition-all duration-200',
                'focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-zinc-900',
                'hover:border-zinc-600',
                leftIcon ? 'pl-10' : 'pl-3.5',
                rightIcon ? 'pr-10' : 'pr-3.5',
                prefixText && 'rounded-l-none border-l-0',
                suffixText && 'rounded-r-none border-r-0',
                error && 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20 text-rose-50',
                className
              )}
              {...props}
            />

            {rightIcon && (
              <div className="absolute right-3.5 text-zinc-500 pointer-events-none">
                {rightIcon}
              </div>
            )}
          </div>

          {suffixText && (
            <div className="flex items-center px-3.5 bg-zinc-800/80 border-y border-r border-zinc-700/80 rounded-r-xl text-zinc-400 text-sm select-none h-11 font-mono">
              {suffixText}
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium mt-1 animate-in fade-in duration-200">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
