import { useState } from 'react';
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

const Toggle = () => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    return (
        <button onClick={handleToggle} className={`w-12 h-5 flex items-center bg-gray-300 rounded-full duration-300 ease-in-out ${isToggled ? 'bg-green-400' : 'bg-gray-300'}`}>
            <div className={`bg-white text-gray-500 rounded-full shadow-md flex justify-center items-center duration-300 ease-in-out ${isToggled ? 'translate-x-full' : 'translate-x-0'}`}>
                {
                    isToggled ? <DarkModeOutlined />: <LightModeOutlined/>
                }
            </div>
        </button>
    );
};

export default Toggle;
