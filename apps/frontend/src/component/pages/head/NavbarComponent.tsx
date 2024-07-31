import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import MenuIcon from '@mui/icons-material/Menu';
import { CloseOutlined, InboxOutlined, PersonOutline, ShoppingBagOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import instance from "../../../axios/Instance";
import { useAppContext } from "../../../store/AppContext";
import ToogleTheme from "../../../ui/ToogleTheme";
import CartComponent from "../cart/CartComponent";
const NavbarComponent = () => {
    const { effLoadingBag, isOpenCart, isOpenChat, setIsOpenCart, setIsOpenChat } = useAppContext();
    const [coutItemInBag, setCoutItemInBag] = useState(0);
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        if (!openMenu && !isOpenCart && !isOpenChat) {
            document.body.style.overflow = "scroll";
        } else {
            document.body.style.overflow = "hidden";
        }
    }, [openMenu, isOpenCart, isOpenChat]);

    const listItem = [
        { "name": "Trang chủ", "link": "/" },
        { "name": "Thông tin cá nhân", "link": "/profile" },
        { "name": "Quản lý", "link": "/manage" },
        { "name": "Lịch sử", "link": "/" },

    ];

    useEffect(() => {
        fetchCarItems();
    }, [effLoadingBag]);

    const fetchCarItems = async () => {
        await instance.get("api/common/me/cart/items").then(function (response) {
            if (response.status === 200) {
                setCoutItemInBag(response.data.length);
            }
        });
    };

    return (
        <Fragment>
            <div>
                <div className="flex justify-between py-3 md:py-4">
                    <div className="inline-flex items-center gap-1">
                        <button className="block" onClick={() => setOpenMenu(true)}><MenuIcon /></button>
                        <Link to={"/"}>
                            <img className="w-auto h-[36px] rounded-full object-cover" src="https://theme.hstatic.net/200000690725/1001078549/14/logo.png?v=418" alt="" />
                            <label htmlFor="" className="hidden">My Project</label>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex gap-5">
                            {listItem.map((item, index) => (
                                <li key={index}>
                                    <Link to={item.link}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:hidden">
                        <div className="flex gap-2 items-center justify-center dark:text-gray-400">
                            <button onClick={() => { }}><PersonOutline /></button>
                            <div className="relative">
                                <button onClick={() => setIsOpenChat(true)}><InboxOutlined /></button>
                                <div className="absolute p-[8px] -top-0.5 -right-1 bg-red-400 rounded-full w-4 h-4 flex justify-center items-center">
                                    <span className="text-[12px] font-semibold tracking-tighter dark:text-white">{coutItemInBag}</span>
                                </div>
                            </div>
                            <div className="relative">
                                <button onClick={() => setIsOpenCart(true)}><ShoppingBagOutlined /></button>
                                <div className="absolute p-[8px] -top-0.5 -right-1 bg-red-400 rounded-full w-4 h-4 flex justify-center items-center">
                                    <span className="text-[12px] font-semibold tracking-tighter dark:text-white">{coutItemInBag}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`fixed h-[100svh] xl:px-20 z-50 top-0 from-indigo-900 bg-gradient-to-r rounded-md w-full transition-all duration-500 ${openMenu ? "block left-0" : "-left-full"}`}>
                            <div className="grid grid-cols-5 h-full">
                                <div className="col-start-1 col-end-5 bg-white px-8 md:px-10 py-4 flex flex-col h-full">
                                    <div className="flex justify-between py-3 md:py-4 row-span-4">
                                        <div className="inline-flex">
                                            <Link to={"/"}>
                                                <img className="w-7 h-7 rounded-full object-cover" src="https://th.bing.com/th/id/OIP.KhXEdjeK786BCg21hNBqEAHaFm?w=219&h=180&c=7&r=0&o=5&cb=11&dpr=1.1&pid=1.7" alt="" />
                                                <label htmlFor="" className="hidden">My Project</label>
                                            </Link>
                                        </div>
                                        <button onClick={() => setOpenMenu(false)} className="text-gray-400">
                                            <CloseOutlined />
                                        </button>
                                    </div>
                                    <div className="h-full flex flex-col justify-between text-[13.5px] font-semibold text-gray-700">
                                        <div>
                                            <ul className="flex flex-col mt-2">
                                                {listItem.map((item, index) => (
                                                    <li key={index} className="text-left border-b px-2 py-2 border-dashed border-gray-400 active:bg-gray-300 active:text-sm active:text-white ease-in-out">
                                                        <Link to={item.link} onClick={() => setOpenMenu(false)}>{item.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="flex items-center justify-between relative">
                                            <div>
                                                <ul className="flex flex-col">
                                                    <li className="text-left px-2 py-2 border-gray-400 active:bg-gray-300 active:text-xl active:text-white ease-in-out">
                                                        <Link to={"/setting"}>Cài đặt</Link>
                                                    </li>
                                                    <li className="text-left px-2 py-2 border-gray-400 active:bg-gray-300 active:text-xl active:text-white ease-in-out">
                                                        <Link to={"/logout"}>Đăng xuất</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="absolute right-0 bottom-0   ">
                                                    <ToogleTheme />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CartComponent />

        </Fragment>
    );
}

export default NavbarComponent;
