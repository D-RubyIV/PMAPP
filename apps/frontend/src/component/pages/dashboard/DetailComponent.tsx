import { Fragment, useEffect, useState } from "react";
import instance from "../../../axios/Instance";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion"
import SmallCardProductDetail from "./SmallCardProductDetail";
import { Add, Remove, Star, StarOutlineOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useAppContext } from "../../../store/AppContext";

const DetailComponent = () => {
    const { effLoadingBag, setEffLoadingBag } = useAppContext();

    const [listComment, setListComment] = useState<ModelModule.Comment[]>([])
    const [myCart, setMyCart] = useState<Cart>();
    const [primaryImageUrl, setPrimaryImageUrl] = useState<string>();
    const { id } = useParams();
    const [quantity, setQuantity] = useState<number>(1)

    const [object, setObject] = useState<ProductDetail>()
    const [productDetails, setProductDetails] = useState<ProductDetail[]>([])

    const handleAddQuatity = () => {
        if ((object as ProductDetail)?.quantity > quantity) {
            setQuantity(quantity + 1)
        }
    }

    const handleAddToCart = async () => {
        const data = {
            "quantity": quantity,
            "productDetail": (object as ProductDetail)?.id,
            "cart": (myCart as Cart)?.id
        }
        await instance.post("/api/manage/cart-details", data).then(function (response) {
            if (response.status === 200) {
                toast("Add To Bag Success")
                setEffLoadingBag(!effLoadingBag)
            }

        })

    }

    const handleRemoveQuatity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleGetImageUrl = async () => {
        if ((object?.media as Media)?.name) {
            await instance.get(`/api/cloud/generate-url?file=${(object?.media as Media)?.name}`).then(function (response) {
                if (response.status === 200) {
                    setPrimaryImageUrl(response.data)
                }
            })
        }
    }
    const handleGetComments = async () => {
        if ((object?.product as Product)?.id) {
            await instance.get(`/api/manage/comment/product/${(object?.product as Product)?.id}`).then(function (response) {
                if (response.status === 200) {
                    setListComment(response.data)
                }
            })
        }
    }

    useEffect(() => {
        console.log("DETAIL: ", object)
        console.log("ID: ", id)
        handleGetImageUrl();
        handleGetComments()
    }, [object])

    useEffect(() => {
        const fetchData = async () => {
            await instance.get(`/api/manage/product-details/product/${id}`).then(function (reponse) {
                if (reponse.status === 200 && reponse.data) {
                    setProductDetails(reponse.data)
                    setObject(reponse.data[0])
                }
            })
            await instance.get('/api/manage/carts/me').then(function (reponse) {
                if (reponse.status === 200 && reponse.data) {
                    setMyCart(reponse.data)
                }
            })
        }
        fetchData();
    }, [])

    return (
        <div>
            {/*  */}
            <div className="md:flex md:justify-between md:gap-5 md:p-12 mt-2">

                <div className="flex flex-col w-full gap-4 md:flex-row justify-center">
                    <div className="">
                        <img src={primaryImageUrl} className="aspect-square object-cover rounded-md" style={{ width: "100%" }}></img>
                    </div>
                    <div className="md:hidden">
                        <TittleComponent object={(object as ProductDetail)}></TittleComponent>
                    </div>
                    <div className="flex text-sm items-center gap-2">
                        <div className="flex ">
                            <button disabled={(object as ProductDetail)?.quantity < quantity} className="border-2 px-2 py-1 flex items-center" onClick={() => handleAddQuatity()}><Add sx={{ fontSize: 12 }}></Add></button>
                            <span className="border-2 px-2 py-1 flex items-center">{quantity}</span>
                            <button disabled={(object as ProductDetail)?.quantity <= 1} className="border-2 px-2 py-1 flex items-center" onClick={() => handleRemoveQuatity()}><Remove sx={{ fontSize: 12 }}></Remove></button>
                        </div>
                        <div className="text-gray-600">
                            {object?.quantity} sản phẩm đang có sẵn
                        </div>
                    </div>
                </div>

                <div className="w-full mt-3 md:mt-0">
                    <div className="hidden md:block">
                        <TittleComponent object={(object as ProductDetail)}></TittleComponent>
                    </div>
                    <div className="grid grid-cols-2 text-center gap-2">
                        {
                            productDetails.map((item, index) => (
                                <button onClick={() => setObject(item)} key={index} className={`rounded-md ${(object as ProductDetail)?.id === item.id ? "ring-1" : ""}`}>
                                    <SmallCardProductDetail productDetail={item} />
                                </button>
                            ))
                        }
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <motion.div
                            transition={{
                                active: {
                                    backgroundColor: "#f00"
                                },
                                inactive: {
                                    backgroundColor: "#fff",
                                    transition: { duration: 2 }
                                }
                            }} animate="active"
                        >


                            <button onClick={() => handleAddToCart()} className="py-3 bg-white border-2 border-black w-full rounded-md text-gray-500 font-semibold">
                                Add to Bag
                            </button>
                        </motion.div>
                        <button className="py-3 bg-black border-2 border-white w-full rounded-md text-white font-semibold">
                            Add to fa
                        </button>
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: (object?.product as Product)?.description }}></div>
                        </div>
                    </div>
                </div>


            </div>
            {/*  */}
            <div className="text-[13.5px] flex flex-col gap-2">
                <div>
                    <p className="pt-4">
                        Each Craft we release puts a handmade feel on the AJ1, and this Mid is no exception. Sandy neutrals come together in kicks that beg to be a part of every outfit. Premium suede adds texture, while a speckled outsole grounds it all with subtle detail.
                    </p>
                </div>
                <div>
                    <div className="pt-4">
                        <ul>
                            <li>Colour Shown: Pale Ivory/Legend Light Brown/Sail</li>
                            <li>Style: FQ3224-100</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <button className="underline underline-offset-2 font-medium text-[15.5px]">
                        <span>View Product Details</span>
                    </button>
                </div>
                <div>
                    <ReviewComponent listComment={listComment} />
                </div>

            </div>
        </div>
    );
}

const ReviewComponent = ({ listComment }: { listComment: ModelModule.Comment[] }) => {
    const [countStart, setCountStart] = useState<number>()
    useEffect(() => {
        let total = 0;
        listComment.forEach(s => {
            total += s.star;
        })
        setCountStart(total / listComment.length);
    }, [listComment])

    // from GPT 3.5
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
    // from GPT 3.5
    const StarChildComponent = ({ starCount }: { starCount: number }) => {
        const starsArray = Array.from({ length: starCount }, (_, index) => (
            <Star key={`yellow-${index}`} sx={{ color: "#FFF200", fontSize: 16 }} />
        ));

        const totalStars = 5;
        const blackStarsCount = totalStars - starCount;

        const blackStarsArray = Array.from({ length: blackStarsCount }, (_, index) => (
            <StarOutlineOutlined key={`black-${index}`} sx={{ color: "black", fontSize: 16 }} />
        ));

        return (
            <Fragment>
                <span>
                    {starsArray}
                    {blackStarsArray}
                </span>
            </Fragment>
        );
    };


    return (
        <Fragment>
            <div className="text-[18px] font-medium flex justify-between">
                <span>Reviews ({listComment.length})</span>
                <div>
                    {
                        listComment.length > 0
                        && <StarChildComponent starCount={Math.round(countStart || 0)} />
                        || <p className="text-sm font-normal">Chưa có đánh giá nào</p>
                    }

                </div>
            </div>
            <div>
                {listComment.map((item, index) => (
                    <Fragment key={index}>
                        <div className="py-3">
                            <div className="flex gap-3 items-center rounded-md">
                                <div>
                                    <img
                                        src="https://th.bing.com/th/id/OIP.Zmki3GIiRk-XKTzRRlxn4QHaER?rs=1&pid=ImgDetMain"
                                        className="w-10 object-cover aspect-square rounded-full"
                                    />
                                </div>
                                <span className="font-medium text-gray-600">{item?.user?.name || "Người dùng ẩn danh"}</span>
                            </div>
                            <div>
                                <StarChildComponent starCount={item.star}></StarChildComponent>
                            </div>
                            <div className="py-1">
                                <span>{item.content}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">{formatDate(item.time.toString())}</span>
                            </div>
                        </div>
                    </Fragment>
                ))}
            </div>
        </Fragment>
    )
}

const TittleComponent = ({ object }: { object: ProductDetail }) => {
    return (
        <div className="">
            <p className="text-[20px] font-medium">{object?.name || (object?.product as Product)?.name}</p>
            <p className="text-[16px] text-orange-600 font-semibold">{object?.price} VND</p>
        </div>
    )
}
export default DetailComponent;