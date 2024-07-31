import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SettingComponent = () => {
    const { i18n } = useTranslation();

    const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");

    useEffect(() => {
        console.log("Language: ", language)
        i18n.changeLanguage(language)
    }, [language])

    const toggleLanguage = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        setLanguage(value);
        i18n.changeLanguage(value)
        localStorage.setItem("lang", value)
    };

    return (
        <div>
            <h2>Settings</h2>
            <div>
                <form>
                    <label>Language:</label>
                    <select title='select' name="language" className='p-2' onChange={toggleLanguage} value={language}>
                        <option value={"vi"}>VN</option>
                        <option value={"en"}>EN</option>
                    </select>
                </form>
            </div>

        </div>
    );
};

export default SettingComponent;
