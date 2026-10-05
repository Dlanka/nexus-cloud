import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLMotionProps<'div'> {
  selected?: boolean;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  selected = false,
  hoverable = false,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -2, transition: { duration: 0.15 } } : undefined}
      className={cn(
        'relative rounded-2xl border transition-all duration-200 backdrop-blur-xl',
        'bg-zinc-900/80 border-zinc-800/90 text-zinc-100 shadow-xl',
        hoverable && 'hover:border-zinc-700 hover:bg-zinc-900/95 cursor-pointer',
        selected && 'border-indigo-500 bg-gradient-to-b from-indigo-950/40 to-zinc-900/90 ring-1 ring-indigo-500 shadow-indigo-500/10 shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
