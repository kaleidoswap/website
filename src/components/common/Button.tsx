// src/components/common/Button.tsx
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-50 disabled:pointer-events-none active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30',
        secondary: 'bg-gray-800 text-white hover:bg-gray-700 shadow-lg shadow-gray-800/50 hover:shadow-xl hover:shadow-gray-700/60',
        outline: 'border-2 border-gray-600/80 text-gray-300 hover:border-gray-500 hover:bg-gray-800/50 backdrop-blur-sm hover:text-white',
        ghost: 'text-gray-300 hover:bg-gray-800/50 hover:text-white',
      },
      size: {
        default: 'h-11 py-2.5 px-5 text-sm',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-10 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }