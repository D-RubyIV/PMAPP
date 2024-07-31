import React from 'react';
import { cn } from '../lib/util';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RoundCheckbox = React.forwardRef<HTMLInputElement, IProps>(
    ({ label, checked, className, onChange, ...props }, ref) => {
        return (
            <label className="flex items-center cursor-pointer w-2">
                <div className="relative">
                    <input
                        className='p-2 ring-2 '
                        type="checkbox"
                        // className="hidden"
                        ref={ref}
                        checked={checked}
                        onChange={onChange}
                        {...props}
                    />
                    <div className={cn("w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center", className)}>
                        {checked === true && (
                            <svg
                                className="w-4 h-4 text-black fill-current"
                                viewBox="0 0 20 18"
                            >
                                <path d="M6 11.8l3 2.5 5-6.5-1.2-1.1-3.8 5-2.2-1.8-1.8 2.2z" />
                            </svg>
                        )}
                    </div>
                </div>
                <span className="ml-2 text-gray-700">{label}</span>
            </label>
        );
    }
);

export default RoundCheckbox;
