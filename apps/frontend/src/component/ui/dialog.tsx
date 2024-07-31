import * as React from 'react'
import { CloseOutlined } from '@mui/icons-material'
import { cn } from '../../lib/util'
import { Method } from '../manage/enum/Method'

export interface DialogProps {
  className?: string,
  open: boolean,
  handleclose: () => void,
  method: Method
  children: React.ReactNode
}

const Dialog: React.FC<DialogProps> = ({ className, open, method, handleclose, children }) => {
  return (
    <div className="px-8 py-4 md:px-10 xl:px-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-3/5" style={{ display: open ? 'block' : 'none' }}>
      <div className={cn("bg-gray-300 text-gray-500 rounded-md border-2 p-2", className)}>
        <div className="flex justify-between">
          <div>
            <span className='font-medium text-[18px]'>{method}</span>
          </div>
          <div>
            <button onClick={handleclose}>
              <CloseOutlined />
            </button>
          </div>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export { Dialog }
