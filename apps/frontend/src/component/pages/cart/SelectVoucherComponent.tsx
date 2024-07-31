import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import instance from "../../../axios/Instance";
import { DiscountOutlined } from "@mui/icons-material";

const SelectVoucherComponent = () => {
    const [vocherList, setVocherList] = useState<Voucher[]>([])
    const fetchVouchers = async () => {
        await instance.get("/api/manage/vouchers?limit=1000").then(function (response) {
            if (response.status === 200 && response?.data?.content) {
                setVocherList(response.data.content)
            }
        })
    }
    useEffect(() => {
        fetchVouchers();
    }, [])

    return (
        <Fragment>
            <div>
                <div className="flex flex-col gap-2 max-h-96 overflow-auto">
                    {
                        Array.isArray(vocherList) && vocherList.map((item, index) => (
                            <Fragment key={index}>
                                <div className="rounded-md p-2 shadow-md border-2 flex justify-between items-center">
                                    <div className="text-[13.5px] flex gap-5 items-center">
                                        <div>
                                            <DiscountOutlined sx={{fontSize: 32}}/>
                                        </div>
                                        <div>
                                            <div className="text-lg font-semibold text-gray-500"><span >{item.name}</span></div>
                                            <div>{item.endDate > item.startDate ? (<span className="text-blue-700">Còn hiệu lực</span>) : (<span className="text-red-700">Hết hiệu lực</span>)}</div>
                                            <div><span>Giảm {item.minimize} tối đa {item.percent} </span></div>
                                        </div>
                                    </div>
                                    <div>
                                        <input type="checkbox" className="w-4 me-2"></input>
                                    </div>
                                </div>
                            </Fragment>
                        ))
                    }
                </div>
                <div className="text-center py-2">
                    <button className="p-2 bg-orange-300 font-medium w-full rounded-md">Xác Nhận</button>
                </div>

            </div>
        </Fragment>
    );
}

export default SelectVoucherComponent;