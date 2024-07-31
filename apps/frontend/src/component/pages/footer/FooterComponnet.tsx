import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
const FooterComponent = () => {

    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true })
    const mainControls = useAnimation()
    const { scrollYProgress } = useScroll()

    const paragraphOneValue = useTransform(
        scrollYProgress,
        [0, 1],
        ["-100%", "0%"]
    )

    const paragraphTwoValue = useTransform(
        scrollYProgress,
        [0, 1],
        ["100%", "0%"]
    )


    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
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
        <div className="overflow-scroll">
            <section ref={containerRef} className="flex flex-col gap-10 mb-10" >
                <motion.h1
                    className="text-sm tracking-wide text-slate-400 text-center"
                    animate={mainControls}
                    initial="hidden"
                    variants={{
                        hidden: { opacity: 0, y: 75 },
                        visible: {
                            opacity: 1,
                            y: 0,
                        },
                    }}
                    transition={{ delay: 0.3 }}
                >
                    Just Keep Scrolling
                </motion.h1>
                <motion.p
                    style={{ translateX: paragraphOneValue }}
                    className="text-slate-400 font-thin text-sm w-1/2 mx-auto"
                >
                    This is a basic tutorial on how to get up and running with Framer
                    Motion with some TailwindCSS. If you enjoyed this video, please leave
                    a like and also subscribe.
                </motion.p>
                <motion.p
                    style={{ translateX: paragraphTwoValue }}
                    className="text-slate-400 font-thin text-sm w-1/2 mx-auto"
                >
                    Have fun playing with Framer Motion. It is a very powerful library,
                    when used properly. Add some life to your websites.
                </motion.p>
            </section>

            <section className="mt-5" ref={containerRef}>
                <br />
                <motion.div
                    className="grid grid-cols-2 text-[11px] text-center gap-x-1 gap-y-"
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
            </section>
        </div>
    );
}

export default FooterComponent;