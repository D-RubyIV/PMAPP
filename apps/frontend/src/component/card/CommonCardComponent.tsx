import { Fragment, useEffect, useState } from "react"
import instance from "../../axios/Instance"
import { Star, StarOutline } from "@mui/icons-material"
import Skeleton from "react-loading-skeleton"



const RENDERSTAR = ({ count }: { count: number }) => {
    const totalStar = 5;
    const starsYellowArray = Array.from({ length: count }, (_, index) => (
        <Star key={`yellow-${index}`} sx={{ color: "#FFF200", fontSize: 16 }} />
    ));
    const countBlackStar = totalStar - starsYellowArray.length 

    const starsBlackArray = Array.from({ length: countBlackStar }, (_, index) => (
        <StarOutline key={`yellow-${index}`} sx={{ color: "#FFF200", fontSize: 16 }} />
    ));
    return(
        <Fragment>
            {starsYellowArray}
            {starsBlackArray}
        </Fragment>
    )
 
}

const CommonCardComponent = ({ product }: { product: CustomModelSpace.CustomProduct }) => {
    const [mediaLink, setMediaLink] = useState("")
    useEffect(() => {
        if (product?.image) {
            instance.get(`/api/cloud/generate-url?file=${product.image}`).then(function (response) {
                if (response.status === 200) {
                    setMediaLink(response.data)
                }
            })
        }
    }, [])

    return (
        <div className="w-64 grid grid-cols-12 text-sm shadow-xl border-1 border-gray-500 bg-white rounded-md h-40">
            <div className="col-span-6">
                {mediaLink !== "" && <img
                    src={mediaLink}
                    className="min-h-32 h-full w-full object-cover object-center rounded-s-md"
                />
                    ||
                    <Skeleton count={3} containerClassName="flex gap-0.5 h-full p-2" />
                }
            </div>

            <div className="col-span-6 px-2 py-1">
                <ul className="font-medium tracking-tight text-gray-500">
                    <li className="line-clamp-3 text-[16.5px] font-semibold text-gray-800">{product?.name}</li>
                    <li className="line-clamp-1 text-[13.5px]">Price: {product?.price} vnd</li>
                    <div>
                        {<RENDERSTAR count={product.totalStar/product.totalComment}></RENDERSTAR>}
                    </div>
                </ul>
            </div>

        </div>
    );
}

export default CommonCardComponent;