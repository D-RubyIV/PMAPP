import axios from "axios";
import toast from "react-hot-toast";

const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

var token = localStorage.getItem("token")
const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVERURL
});

if (token) {
    instance.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(token)["accessToken"];
    console.log("HAVE TOKEN")
}
else {
    console.log("NO HAVE TOKEN")
}


instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    const accessToken = token ? JSON.parse(token)["accessToken"] : ''
    // const refreshToken = token ? JSON.parse(token)["refreshToken"] : ''
    config.headers.Authorization = token ? `Bearer ${accessToken}` : '';


    const decodedJwt = parseJwt(accessToken);
    localStorage.setItem("me", JSON.stringify(decodedJwt))
    if (decodedJwt?.exp && decodedJwt?.exp * 1000 < Date.now()) {
        console.log("token expried")
    }
    else {
        console.log("token valid")
    }

    return config;
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error)
    if (error.response.status === 403) {

        if (error.response.data?.description === "The JWT token has expired") {
            toast("The JWT token has expired")
            localStorage.removeItem("token")
            window.location.href = "/auth";
        }
        else {
            toast("Người dùng không có quyền")
        }
    }
    if (error.response.status === 401) {
        toast("Unauthorized")
        localStorage.removeItem("token")
        window.location.href = "/auth";

    }
    if (error.response.status === 400) {
        if (error.response.data.message === "Cart not found") {
            toast("Vui lòng đăng nhập")
        }
        else {
            toast(error.response.data.message || error.response.request.responseText)
        }
    }
    return Promise.reject(error);
});

export default instance;

