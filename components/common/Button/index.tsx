import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'button' | 'text';
  className?: string;
}

export const Button = ({ 
  children, 
  variant = 'button',
  className = '',
  ...props 
}: ButtonProps) => {
  if (variant === 'text') {
    return (
      <button 
        className={`${styles.textLink} ${className}`}
        type="button"
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button 
      className={`${styles.button} ${className}`}
      type="button" 
      {...props}
    >
      {children}
    </button>
  );
}; 