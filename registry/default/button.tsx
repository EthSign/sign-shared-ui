import { Loader2 } from 'lucide-react';
import React from 'react';
import { cn } from './cn';

export type ButtonVariant = 'primary' | 'secondary' | 'transparent';
export type ButtonSize = 'default' | 'sm';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDark?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  variant = 'primary',
  size = 'default',
  isDark = false
}) => {
  const baseStyles =
    'flex items-center justify-center font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50';

  const sizeStyles = {
    default:
      'w-full rounded-[6px] px-4 py-3 text-[16px] leading-[1.18] tracking-[-0.2px] md:px-[32px] md:py-[16px] md:text-[20px]',
    sm: '!h-[38px] rounded-sm px-4 text-[14px] md:text-[16px] active:scale-95'
  };

  const variantStyles = {
    primary: 'bg-[#FF7801] text-white hover:bg-[#e66c01] active:scale-[0.98]',
    secondary: cn(
      'bg-[#E66616] text-white hover:bg-[#FF7801]',
      isDark && 'hover:shadow-[0_0_20px_rgba(240,101,35,0.3)]'
    ),
    transparent: 'bg-white text-[#FF7801]'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
    >
      {loading && <Loader2 className="mr-2 size-5 animate-spin" />}
      {children}
    </button>
  );
};
