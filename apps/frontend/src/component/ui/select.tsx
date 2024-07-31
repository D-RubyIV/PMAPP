import React from "react";
import { cn } from "../../lib/util";
import { Label } from "./label";


export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string,
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, children, ...props }, ref) => {
        return (
            <div>
                <Label>{label}</Label>
                <select
                    className={cn("flex w-full rounded-md border border-slate-300 bg-transparent text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-500 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 px-2 py-1.5", className)}
                    ref={ref}
                    title="select something"
                    {...props}
                >
                    <option value={""}>Choose a salutation ...</option>
                    {children}
                </select>
            </div>
        )
    }
)
Select.displayName = 'Select'

export { Select }
