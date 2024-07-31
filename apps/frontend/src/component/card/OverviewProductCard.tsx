import { ShoppingCartOutlined } from "@mui/icons-material";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const OverviewProductCard = ({ item }: { item: OverviewProductV3 }) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const baseImage = "https://product.hstatic.net/200000690725/product/social_post_3_-_12.06-04_58b026e298c9484c8baa13a1ef538757_master.jpg";
    return (
        <Link to={`product/${item.product.id}`}>
            <div className="shadow-xl p-1.5 md:p-6 rounded-md text-sm relative dark:text-gray-300">
                {item.quantity === 0 && (
                    <div className="absolute mt-1 z-20 font-thin bg-gray-800 text-white py-1 px-2 text-[12px] rounded-2xl inline-flex items-center">
                        <span>Hết hàng</span>
                    </div>
                )}
                <div className="w-full h-54 relative">
                    {!loaded && <Skeleton count={9} />}
                    <img
                        className="object-cover w-full h-full"
                        onLoad={() => setLoaded(true)}
                        src={item?.product?.media?.name || baseImage}
                        alt="Product Image"
                    />
                </div>
                <div className="mt-2">
                    <span className="font-sans text-[13px] line-clamp-3 min-h-14">{item.product.name}</span>
                </div>
                <div className="flex justify-between text-[13px] py-0.5 tracking-tighter font-thin">
                    <div>
                        <span>+{item.totalColor} Màu sắc</span>
                    </div>
                    <div>
                        <span>+{item.totalSize} Kích thước</span>
                    </div>
                </div>
                <div className="flex justify-between mt-1">
                    <div>
                        <span className="font-semibold tracking-tight">{`${item.product.price.toLocaleString('de-DE')}₫` || "Chưa niêm giá"}</span>
                    </div>
                    <div>
                        <div className="p-1 rounded-full bg-gray-200 text-blue-500 items-center inline-flex ring-1">
                            <ShoppingCartOutlined sx={{ fontSize: 16 }} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default OverviewProductCard;
