import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react";
const PolicyComponent = () => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: false })
    const mainControls = useAnimation()
    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        } else {
            mainControls.start("hidden");
        }
    }, [isInView])

    const arrayItem = [
        {
            "name": "CHÍNH SÁCH BẢO MẬT",
            "icon": "https://down-vn.img.susercontent.com/file/8ee559562d123cf132a7cec374784442",
        },
        {
            "name": "QUY CHẾ HOẠT ĐỘNG",
            "icon": "https://down-vn.img.susercontent.com/file/5e2ef7014b7a5004ebc7383e115364d5",
        },
        {
            "name": "CHÍNH SÁCH VẬN CHUYỂN",
            "icon": "https://down-vn.img.susercontent.com/file/b334ced59fb923afa9f6cc41be2c2e14",
        },
        {
            "name": "CHÍNH SÁCH HOÀN TIỀN VÀ TRẢ HÀNG",
            "icon": "https://down-vn.img.susercontent.com/file/9055ca43afee3425736586fd115cb197",
        },
    ]
    return (
        <div className="overflow-scroll mt-5" ref={containerRef}>
            <motion.div
                className="grid grid-cols-2 text-[11px] text-center gap-x-1"
                animate={mainControls}
                initial="hidden"
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                        opacity: 1,
                        y: 0,
                    },
                }}
                transition={{ delay: 0.3 }}
            >
                {
                    arrayItem.map((item, index) => {
                        return (
                            <div key={index} className="text-center gap-1 flex justify-center">
                                <img src={item.icon} className="w-3 h-3 mt-0.5"></img>
                                <span>{item.name}</span>
                            </div>
                        )
                    })
                }
            </motion.div>
            <div className="text-[11.5px] text-center mt-2">
                <div>
                    <span>
                        Địa chỉ: Tòa nhà trung tâm Lotte Hà Nội, 50 Liễu Giai, Quận Ba Đình, Hà Nội
                    </span>
                </div>
                <div>
                    <span className="text-nowrap">
                        Số điện thoại hỗ trợ: 0123456789 - Email: cskh@hotro.shopee.vn
                    </span>
                </div>
            </div>
        </div>
    );

}

export default PolicyComponent;