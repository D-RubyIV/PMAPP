import { useEffect } from "react";
import toast from 'react-hot-toast';
import instance from "../../axios/Instance";
import { useAppContext } from "../../store/AppContext";

const UrlSearchComponent = () => {
    const urlHash = window.location.search || window.location.hash
    const queryString = urlHash.startsWith("#") ? urlHash.substring(1) : urlHash
    const urlParams = new URLSearchParams(queryString);
    const { setIsLoading } = useAppContext()
    const stateParam = urlParams.get("state");
    console.log("STATE PARAM: ", stateParam)

    const handleOAuth = async () => {
        if (stateParam == "google") {
            var code = urlParams.get("code")
            console.log(code)
            instance.get("/api/oauth/google?code=" + code).then(function (response) {
                console.log(response)
                if (response.status == 200) {
                    console.log("GET OAUTH GOOGLE SUCCESS")
                    localStorage.setItem("token", JSON.stringify(response.data))
                    toast("LOGIN SUCCESS")
                    setIsLoading(false)
                    window.location.reload();

                }
            })
        }
        else if (stateParam == "facebook") {
            var code = urlParams.get("code")
            console.log(code)
            instance.get("/api/oauth/facebook?code=" + code).then(function (response) {
                console.log(response)
                if (response.status == 200) {
                    console.log("GET OAUTH FACEBOOK SUCCESS")
                    localStorage.setItem("token", JSON.stringify(response.data))
                    toast("LOGIN SUCCESS")
                    setIsLoading(false)
                    window.location.reload();
                }
            })
        }
        else if (stateParam == "github") {
            var code = urlParams.get("code")
            console.log(code)
            instance.get("/api/oauth/github?code=" + code).then(function (response) {
                console.log(response)
                if (response.status == 200) {
                    console.log("GET OAUTH GITHUB SUCCESS")
                    localStorage.setItem("token", JSON.stringify(response.data))
                    toast("LOGIN SUCCESS")
                    setIsLoading(false)
                    window.location.reload();
                }
            })
        }
    }

    useEffect(() => {
        handleOAuth()
    }, [])

    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <div className="text-2xl text-gray-500 font-semibold">
                Watting...
            </div>
        </div>
    );
}
export default UrlSearchComponent;