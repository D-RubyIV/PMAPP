import * as React from 'react'
import { cn } from '../../lib/util'
import { Label } from './label'


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, label, ...props }, ref) => {
        return (
            <div>
                <Label>{label}</Label>
                <input
                    className={cn(
                        'flex w-full rounded-md border border-slate-300 bg-transparent py-1 px-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-500 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }