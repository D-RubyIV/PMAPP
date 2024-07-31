import { Outlet } from "react-router-dom";
import { useAppContext } from "../../store/AppContext";
import instance from "../../axios/Instance";
import { Fragment, useEffect } from "react";
import Toast from "../../toast/Toast";
import axios from "axios";


const ProtectRouter = () => {

    const { setIsLoading } = useAppContext()

    const refreshToken = async () => {
        const tokenString = localStorage.getItem("token");
        if (tokenString) {
            axios.post(`${import.meta.env.VITE_SERVERURL}/api/auth/refresh-token`, null, {
                params: {
                    token: JSON.parse(tokenString)["refreshToken"]
                }
            }).then(function (response) {
                console.log(response)
                if (response.status == 200 && response.data.accessToken && response.data.refreshToken) {
                    localStorage.setItem("token", JSON.stringify(response.data))
                }
            });
        }
    };

    useEffect(() => {
        const intervalId = setInterval(refreshToken, 100000);
        return () => clearInterval(intervalId);
    }, []);

    const initSetup = async () => {
        instance.get("api/auth/me").then(function (response) {
            console.log(response)
            if (response.status === 200) {
                if (response.data === "anonymousUser") {
                    localStorage.setItem("isLogin", "0")
                }
                else{
                    localStorage.setItem("isLogin", "1")
                }
            }
        })
        setIsLoading(false)
    }

    useEffect(() => {
        initSetup()
    }, [])

    return (
        <Fragment>
            <Toast></Toast>
            <Outlet></Outlet>
            {/* <LoadingComponent/> */}
        </Fragment>

    );
}

export default ProtectRouter;