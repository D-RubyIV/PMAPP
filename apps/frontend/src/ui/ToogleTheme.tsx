import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useAppContext } from '../store/AppContext';

const ToogleTheme = () => {
    const { isDarkMode, setIsDarkMode } = useAppContext();



    return (
        <button onClick={() => setIsDarkMode(!isDarkMode)} className={`items-center bg-gray-300 rounded-full duration-300 ease-in-out ${isDarkMode ? 'bg-green-400' : 'bg-gray-300'}`}>
            <div className={`bg-white text-gray-500 rounded-full shadow-md flex justify-center items-center duration-300 ease-in-out p-1 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-yellow-100 text-gray-700'}`}>
                {
                    isDarkMode ? <DarkModeOutlined /> : <LightModeOutlined />
                }
            </div>
        </button>
    );
};

export default ToogleTheme;
