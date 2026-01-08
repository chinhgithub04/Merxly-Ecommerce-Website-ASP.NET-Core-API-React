import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className='w-full'>
        {label && (
          <label
            htmlFor={id}
            className='block text-sm font-medium text-neutral-700 mb-2'
          >
            {label}
          </label>
        )}
        <div className='relative'>
          <input
            ref={ref}
            id={id}
            type={inputType}
            className={`
              flex h-10 w-full rounded-lg border bg-white px-4 py-2 text-sm placeholder:text-neutral-400 
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
              disabled:cursor-not-allowed disabled:opacity-50 transition-colors
              ${
                error
                  ? 'border-error-500 focus:ring-error-500'
                  : 'border-neutral-300'
              }
              ${isPassword ? 'pr-10' : ''}
              ${className}
            `}
            {...props}
          />
          {isPassword && (
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer'
            >
              {showPassword ? (
                <EyeSlashIcon className='h-5 w-5' />
              ) : (
                <EyeIcon className='h-5 w-5' />
              )}
            </button>
          )}
        </div>
        {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
