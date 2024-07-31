import * as React from 'react'
import { cn } from '../../lib/util'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div>
        <label
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </label>
      </div>
    )
  })

export { Label }
