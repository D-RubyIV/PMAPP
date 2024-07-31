import React, { useState } from 'react';
import { cn } from '../../../../lib/util';
import { LockOpenOutlined, LockOutlined } from '@mui/icons-material';


interface IProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    label: string
    options: IProvince[] | IDistrict[] | IWard[],
    locked?: boolean
}

const SelectWithFocusDiv = React.forwardRef<HTMLSelectElement, IProps>(

    ({ label, locked, options, className, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);

        const handleFocus = () => {
            setIsFocused(true);
        };

        const handleBlur = () => {
            setIsFocused(false);
        };

        return (
            <div
                className={`p-2 mt-2 rounded-md flex flex-col border-2  ${isFocused ? 'ring-1 ring-blue-500' : ''} `}
            >
                <label className='text-[12.5px] font-semibold text-gray-500 flex justify-between items-center'>
                    <span>{label}</span>
                    <span className='text-sm'>{locked ? <LockOutlined color="error" sx={{ fontSize: 20 }} /> : <LockOpenOutlined color="primary" sx={{ fontSize: 20 }} />}</span>
                </label>
                <select title='title' disabled={locked} ref={ref} {...props} className={cn("focus:outline-none text-sm ", className)} onFocus={handleFocus} onBlur={handleBlur}>
                    <option defaultChecked>
                        ---------
                    </option>
                    {options.map((option, index) => (
                        <option
                            key={index}
                            value={
                                (option as IWard)?.WardCode ||
                                (option as IDistrict)?.DistrictID ||
                                (option as IProvince)?.ProvinceID
                            }
                        >
                            {
                                (option as IDistrict)?.DistrictName ||
                                (option as IProvince)?.ProvinceName ||
                                (option as IWard)?.WardName
                            }
                        </option>
                    ))}

                </select>
            </div>
        );

    }
)

export default SelectWithFocusDiv;
