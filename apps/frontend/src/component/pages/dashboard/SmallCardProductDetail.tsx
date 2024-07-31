import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import instance from "../../../axios/Instance";

const SmallCardProductDetail = ({ productDetail }: { productDetail: ProductDetail }) => {

    const [mediaLink, setMediaLink] = useState("")
    useEffect(() => {
        if ((productDetail?.media as Media)?.name) {
            instance.get(`/api/cloud/generate-url?file=${(productDetail?.media as Media)?.name}`).then(function (response) {
                if (response.status === 200) {
                    setMediaLink(response.data)
                }
            })
        }
    }, [])

    return (
        <Fragment>
            <div className="flex gap-2 items-center text-sm border-2 py-0.5 px-1 rounded-md ">
                <div>
                    <img src={mediaLink} className="w-10 h-10 object-cover rounded-md"></img>
                </div>
                <div>
                    <p>{productDetail.name}</p>
                </div>
            </div>
        </Fragment>
    );
}

export default SmallCardProductDetail;