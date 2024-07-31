import { RedeemOutlined } from '@mui/icons-material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useTranslation } from "react-i18next"
const BenefitsComponent = () => {
    const { t } = useTranslation()
    let arrayItem = [
        {
            "icon": <EmojiEmotionsIcon sx={{ fontSize: 40, color: "#ffffff"  }}/>,
            "description": t('earn_rewards')
        },
        {
            "icon": <LocalOfferIcon sx={{ fontSize: 40, color: "#ffffff" }}/>,
            "description":  t('cheap_price')
        },
        {
            "icon": <RedeemOutlined sx={{ fontSize: 40, color: "#ffffff" }}/>,
            "description": t('earn_rewards')
        },
    ]
    return (
        <div className="">
            {/* <h1 className="text-3xl font-semibold">Welcome Back</h1> */}
            <div className="md:grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-3 bg-[#e61e43] p-6 gap-2 rounded-lg  ">
                <div className="">
                    <h2 className="text-md py-1 md:mb-2 sm:text-3xl font-bold text-white md:py-2 text-left">{t('halo')}</h2>
                </div>
                <div className="flex justify-between gap-2 overflow-auto rounded-lg md:col-span-2">
                    {
                        arrayItem.map((item, index) => (
                            (
                                <div key={index} className="bg-[#a1122c] rounded-lg px-5 py-6 grid grid-flow-col max-w-60 min-w-60">
                                    <div className="flex items-center text-3xl pr-3 ">{item.icon}</div>
                                    <div className="text-wrap text-white text-sm"><span>{item.description}</span></div>
                                </div>
                            )
                        ))
                    }
                </div>
            </div>
        </div>

    );
}

export default BenefitsComponent;