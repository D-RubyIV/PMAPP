import { Fragment } from "react/jsx-runtime";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../axios/Instance";
import Skeleton from "react-loading-skeleton";



const ProductCardComponent = ({ product }: { product: Product }) => {
    const [mediaLink, setMediaLink] = useState()
    useEffect(() => {
        if(product?.media?.name){
            instance.get(`/api/cloud/generate-url?file=${product.media.name}`).then(function (response) {
                if (response.status === 200) {
                    setMediaLink(response.data)
                }
            })
        }
    }, [])

    return (
        <Fragment>
            <Link to={`/product/${product.id}`}>
                <motion.div
                    className="group relative p-0.5 shadow-md rounded-md gap-0 flex flex-col"
                    variants={{ hidden: { opacity: 0.8 }, show: { opacity: 1 } }}
                >
                    <div className="w-full overflow-hiddenlg:aspect-none group-hover:opacity-75 lg:h-80 relative">
                        {mediaLink &&
                            <img
                                src={mediaLink}
                                className="h-auto aspect-square object-cover lg:h-full lg:w-full rounded-md"
                                style={{ height: '200px' }}
                            />
                            ||
                            <Skeleton count={2} height={200} containerClassName="flex gap-0.5"/>
                        }

                    </div>
                    <div className="mt-4 flex justify-between">
                        <div>

                            <h3 className="text-sm text-gray-700">
                                {/* <span aria-hidden="true" className="absolute top-0.5 left-0.5 h-4 "><SellOutlined /><span className="text-gray-800">5%</span></span> */}
                                {product.name}
                            </h3>
                        </div>
                        <p className="text-sm font-medium text-gray-400">20USDT</p>
                    </div>
                </motion.div>
            </Link>
        </Fragment>
    );
}

export default ProductCardComponent;