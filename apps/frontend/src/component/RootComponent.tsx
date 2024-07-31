import { Outlet } from "react-router-dom";
import NavbarComponent from "./pages/head/NavbarComponent";
import ScrollToTop from "react-scroll-to-top";
import { useAppContext } from "../store/AppContext";
import ChatRoomComponent from "./pages/chat/ChatRoomComponent";
import { lazy, Suspense } from "react";
import { PuffLoader } from "react-spinners";

const sleep = (ms: number) => {
    return new Promise((res) => setTimeout(res, ms));
}

const LoadedComponent = () => {
    const { isDarkMode } = useAppContext();
    return (
        <div className={`${isDarkMode ? "dark" : ""}`}>
            <div className={`relative px-8 py-4 md:px-10 xl:px-20 dark:bg-[#18191a] dark:text-white min-h-screen`}>
                <ScrollToTop smooth top={60} width="18" height="15" style={{ "borderRadius": 100 }} className="flex items-center justify-center border-2 !bg-slate-200 !ring-1 !bg-opacity-75" />
                <NavbarComponent />
                <ChatRoomComponent />
                <Outlet />
            </div>
        </div>

    );
}

const LoadedableComponent = lazy(async () => {
    await sleep(1000);
    return { default: LoadedComponent };
});

const LoadingComponent = () => {
    return (
        <div className={`fixed top-1/2 left-1/2 flex justify-center flex-col items-center bg-white z-40 w-full h-full -translate-x-1/2 -translate-y-1/2 sweet-loading `}>
            <PuffLoader color="#e61e43" loading={true} />
            <p className="text-gray-500 font-semibold">Loading...</p>
        </div>
    )
}

const RootComponent = () => {
    return (
        <Suspense fallback={<LoadingComponent></LoadingComponent>}>
            <LoadedableComponent></LoadedableComponent>
        </Suspense>

    );
}

export default RootComponent;