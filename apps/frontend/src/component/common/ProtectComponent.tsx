import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const ProtectComponent = ({ children }: { children: ReactNode }) => {
    const redirect = useNavigate();
    useEffect(() => {
        const isLogin = localStorage.getItem("isLogin") || 0

        console.log("IS LOGIN: " + isLogin)
        if (isLogin === "0") {
            redirect("/auth")
        }
    }, [])
    return (
        <Fragment>
            {children}
        </Fragment>
    );
}
export default ProtectComponent;