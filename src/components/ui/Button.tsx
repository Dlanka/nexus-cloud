import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

    const variants = {
      primary:
        'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30 focus:ring-indigo-500',
      secondary:
        'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 focus:ring-zinc-500 shadow-sm',
      outline:
        'bg-transparent hover:bg-zinc-800/60 text-zinc-300 hover:text-white border border-zinc-700/80 focus:ring-zinc-600',
      ghost:
        'bg-transparent hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-100 focus:ring-zinc-600',
      danger:
        'bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 focus:ring-rose-500',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
      md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
      lg: 'text-base px-6 py-3.5 rounded-xl gap-2.5 font-semibold',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled && !isLoading ? { scale: 1.01 } : undefined}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
