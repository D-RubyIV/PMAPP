
import { useAppContext } from "../../store/AppContext";
import { PuffLoader } from "react-spinners";

const LoadingComponent = () => {
    const { isLoading } = useAppContext()

    return (
        <div className={`fixed top-1/2 left-1/2 flex justify-center flex-col items-center bg-white z-40 w-full h-full -translate-x-1/2 -translate-y-1/2 sweet-loading ${isLoading ? "block" : "hidden"}`}>
            <PuffLoader color="#e61e43" loading={isLoading} />
            <p className="text-gray-500 font-semibold">Loading...</p>
        </div>
    );
}

export default LoadingComponent;