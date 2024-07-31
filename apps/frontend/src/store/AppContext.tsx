import { ReactNode, createContext, useContext, useState } from "react";

type AppContextType = {
    isDarkMode: boolean,
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    effLoadingBag: boolean;
    setEffLoadingBag: React.Dispatch<React.SetStateAction<boolean>>;
    isOpenCart: boolean;
    setIsOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
    isOpenChat: boolean;
    setIsOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
    isConnectWebsocket: boolean;
    setIsConnectWebsocket: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({
    isDarkMode: false,
    setIsDarkMode: () => { },
    isLoading: false,
    setIsLoading: () => { },
    effLoadingBag: false,
    setEffLoadingBag: () => { },
    isOpenCart: false,
    setIsOpenCart: () => { },
    isOpenChat: false,
    setIsOpenChat: () => { },
    isConnectWebsocket: false,
    setIsConnectWebsocket: () => { },
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [effLoadingBag, setEffLoadingBag] = useState(false);
    const [isOpenCart, setIsOpenCart] = useState(false);
    const [isOpenChat, setIsOpenChat] = useState(false)
    const [isConnectWebsocket, setIsConnectWebsocket] = useState(false)

    return (
        <AppContext.Provider value={{isOpenCart, setIsOpenCart, isDarkMode, setIsDarkMode, isLoading, setIsLoading, effLoadingBag, setEffLoadingBag, isOpenChat, setIsOpenChat, isConnectWebsocket, setIsConnectWebsocket }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

export default AuthProvider;
