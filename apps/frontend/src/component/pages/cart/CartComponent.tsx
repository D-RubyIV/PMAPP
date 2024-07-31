import { AddCircleOutline, CloseOutlined, DeleteOutlineRounded, RemoveCircleOutline } from "@mui/icons-material";
import { useEffect, useState, Fragment } from "react";
import instance from "../../../axios/Instance";
import { useAppContext } from "../../../store/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



const CartComponent = () => {
    const navigate = useNavigate()

    const [listCartDetail, setListCartDetail] = useState<CartDetail[]>([]);
    const { isOpenCart, setIsOpenCart } = useAppContext();
    const [listGroupCardDetail, setListGroupCardDetail] = useState<GroupCartDetail[]>([]);
    const [listSelectedId, setListSelectedId] = useState<number[]>([])
    const baseImage = "https://product.hstatic.net/200000690725/product/social_post_3_-_12.06-04_58b026e298c9484c8baa13a1ef538757_master.jpg";

    useEffect(() => {
        let calculatedTotal = 0;
        listCartDetail.forEach((item) => {
            calculatedTotal += item.quantity * ((item.productDetail as ProductDetail).product as Product).price;
        });

        let listIdProduct: number[] = [];
        listCartDetail.forEach((s) => {
            let id = ((s.productDetail as ProductDetail)?.product as Product)?.id;
            if (!listIdProduct.includes(id)) {
                listIdProduct.push(id);
            }
        });
        console.log(listIdProduct);

        setListGroupCardDetail([]);
        listIdProduct.forEach((currentIdProduct) => {
            let object: GroupCartDetail = { id: currentIdProduct, carts: [] };
            listCartDetail.forEach((s) => {
                let idProduct = ((s.productDetail as ProductDetail)?.product as Product)?.id;
                if (idProduct === currentIdProduct) {
                    object.carts.push(s);
                }
            });
            console.log(object);
            setListGroupCardDetail((prev) => [...prev, object]);
        });

        console.log("listCartDetail")
        console.log(listCartDetail)
    }, [listCartDetail]);


    const handleDeleteCardDetail = async (id: number) => {
        await instance.delete(`api/manage/cart-details/${id}`).then(function (response) {
            if (response?.status === 200) {
                fetchCartItems();
            }
        })
    }

    const fetchCartItems = async () => {
        await instance.get("api/common/me/cart/items").then((response) => {
            if (response?.status === 200) {
                setListCartDetail(response.data);
            }
        });
    };

    const handleAddQuantity = async (id: number) => {
   
        await instance.get(`api/manage/cart-details/increase/${id}`).then((response) => {
            if (response?.status === 200) {
                fetchCartItems();
            }
        });
    };

    const handleMinusQuantity = async (id: number) => {

        await instance.get(`api/manage/cart-details/decrease/${id}`).then((response) => {
            if (response?.status === 200) {
                fetchCartItems();
            }
        });
    };

    const handleSelectCartDetail = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { checked } = event.target;
        setListSelectedId(prev => {
            if (checked) {
                return [...prev, id];
            } else {
                return prev.filter(selectedId => selectedId !== id);
            }
        });
    
    };

    const handleCheckout = async () => {
        const url = `${import.meta.env.VITE_SERVERURL}/api/manage/orders/confirm`;
        console.log(listSelectedId.length)
        if(listSelectedId.length === 0){
            toast("Vui lòng chọn sản phẩm")
        }
        else{
            try {
                const response = await instance.post(url, listSelectedId);
                console.log(response);
                setIsOpenCart(false);
                console.log(response?.data?.code)
                if(response?.data?.code){
                    navigate(`/checkout?code=${response?.data?.code}`);
                }
            } catch (error) {
                console.error("Error during checkout:", error);
            }
        }
    };

    const handleSelectAll = () => {
        setListSelectedId(pre => [...pre, ...listCartDetail.map((s) => s.id)]);
    }
    const handleUnSelectAll = () => {
        setListSelectedId([]);
    }

    useEffect(() => {
        if (isOpenCart === true) {
            fetchCartItems();
        }
    }, [isOpenCart]);
    useEffect(() => {
        console.log("LIST ID: ")
        console.log(listSelectedId)
    }, [listSelectedId]);

    return (
        <Fragment>
            <div className={`z-40 fixed h-[100svh] xl:px-20 top-0 from-indigo-900 bg-gradient-to-l rounded-md w-full transition-all duration-500 block ${isOpenCart ? "right-0" : "-right-full"}`}>
                <div className="grid grid-cols-6 h-[100svh]">
                    <div className="col-end-2 col-start-7 dark:text-gray-500 bg-white px-6 md:px-10 py-4 flex flex-col justify-between">
                        <div>
                            {/* TOP */}
                            <div className="flex justify-between py-3 md:py-4 row-span-4">
                                <div><span className="text-xl font-semibold text-gray-600">Giỏ hàng</span></div>
                                <div><button onClick={() => setIsOpenCart(false)}><CloseOutlined /></button></div>
                            </div>
                            {/* CENTER */}
                            <div className={`overflow-y-auto h-[calc(100svh-10.75rem)]`}>
                                <div className="flex justify-between">
                                    <button onClick={() => handleSelectAll()} className="underline underline-offset-2 font-thin text-[13.5px] text-blue-700">Chọn tất cả</button>
                                    <button onClick={() => handleUnSelectAll()} className="underline underline-offset-2 font-thin text-[13.5px] text-red-700">Hủy chọn tất cả</button>
                                </div>
                                {listGroupCardDetail.length > 0 && listGroupCardDetail.map((item, index) => (
                                    <Fragment key={index}>
                                        {item.carts.map((cart, cartIndex) => (
                                            <Fragment key={cartIndex}>
                                                <div className="text-[13.5px] grid grid-cols-12 gap-2 border-b border-dashed border-gray-400 py-3">
                                                    <div className="inline-flex justify-center items-center col-span-4 gap-1">
                                                        <div className="flex items-center justify-center">
                                                            <input type="checkbox" checked={listSelectedId.includes(cart.id) ? true : false} onChange={(event) => handleSelectCartDetail(event, cart.id)} />
                                                        </div>
                                                        <div>
                                                            <img src={baseImage} className="w-[25vw] object-cover" alt="Product" />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-8">
                                                        <div className="flex items-center">
                                                            <span className="font-medium text-[12.5px]">
                                                                {(cart.productDetail as ProductDetail)?.name || ((cart.productDetail as ProductDetail)?.product as Product)?.name}
                                                            </span>
                                                            <span className="font-medium text-red-600 ">
                                                                <button className="active:bg-red-400 p-1 rounded-full" onClick={() => handleDeleteCardDetail(cart.id)}><DeleteOutlineRounded /></button>
                                                            </span>
                                                        </div>
                                                        <div className="text-sm font-thin">
                                                            <span>{((cart.productDetail as ProductDetail)?.color as Color)?.name}</span>
                                                            {" / "}
                                                            <span>{((cart.productDetail as ProductDetail)?.size as Size)?.name}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <div className="flex gap-2 text-gray-400 duration-100 items-center">
                                                                <button className="active:text-gray-900 active:text-[15px] ease-in-out" onClick={() => { handleAddQuantity(cart.id); }}><AddCircleOutline /></button>
                                                                <div className="text-gray-900">
                                                                    <span>{cart?.quantity}</span>
                                                                </div>
                                                                <button className="active:text-gray-900 active:text-[15px] ease-in-out" onClick={() => { handleMinusQuantity(cart.id); }}><RemoveCircleOutline /></button>
                                                            </div>
                                                            <div>
                                                                <span className="font-semibold">{(cart.productDetail as ProductDetail)?.price.toLocaleString("vi-VN") + "₫"}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <span className="text-[12.5px]">Kho: {(cart.productDetail as ProductDetail).quantity}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        ))}
                                    </Fragment>
                                ))
                                    ||
                                    (
                                        <Fragment>
                                            <div className="flex flex-col justify-center items-center h-full">
                                                <div>
                                                    <img className="w-24 h-24 object-cover" src="./OIP-removebg-preview.png"></img>
                                                </div>
                                                <div>
                                                    <span className="font-thin">No have any product in your cart</span>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )
                                }
                            </div>
                        </div>
                        {/* BOTTOM */}
                        <div className="text-sm">

                            <div className="py-2 flex justify-between">
                                <span>Tổng tiền:</span>
                                <span className="text-red-500 font-semibold">
                                    {(() => {
                                        let quantity = 0;
                                        listCartDetail.filter(s => listSelectedId.includes(s.id)).forEach((item) => {
                                            quantity += item.quantity * (item.productDetail as ProductDetail)?.price;
                                        });
                                        return quantity.toLocaleString("vi-VN") + "₫";
                                    })()}
                                </span>
                            </div>
                            <button onClick={() => { handleCheckout() }} className="bg-black w-full py-2 font-thin rounded-md text-white">Thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CartComponent;
