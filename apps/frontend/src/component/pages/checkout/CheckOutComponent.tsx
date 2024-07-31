import { ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import InputWithFocusDiv from "./component/input";
import SelectWithFocusDiv from "./component/select";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import instance from "../../../axios/Instance";
import instanceGHN from "../../../axios/InstanceGHN";
import toast from "react-hot-toast";

interface IFormVoucher {
    voucherCode?: string | null; // Allow voucherCode to be null or undefined
}

const schemaVoucher: yup.ObjectSchema<IFormVoucher> = yup.object({
    voucherCode: yup.string().default("").required('Mã giảm giá không được để trống')
});

const schema: yup.ObjectSchema<IForm> = yup.object({
    fullName: yup.string().default("").required('Họ tên không được để trống'),
    address: yup.string().default("").nullable(),
    tempAddressDetail: yup.string().default("").required('Địa chỉ 2 không được để trống'),
    email: yup.string().default("").email('Email không hợp lệ').nullable(),
    phone: yup.string().default("").required('Số điện thoại không được để trống').matches(/^[0-9]+$/, 'Số điện thoại phải là số'),
    deliveryType: yup.number().default(1).required('Phương thức giao hàng không được để trống'),
    paymentMethod: yup.number().default(1).required('Phương thức thanh toán không được để trống'),
});

interface IForm {
    fullName: string;
    address: string | null;
    tempAddressDetail: string;
    email?: string | null;
    phone: string;
    deliveryType: number;
    paymentMethod: number;
}


interface IResponse {
    total: number,
    listCartDetails: CartDetail[]
}

const CheckOutComponent = () => {
    const navigate = useNavigate();
    const [feeShip, setFeeShip] = useState<number>(0)
    const [totalBill, setTotalBill] = useState<number>(0);
    const [listPayment, setListPayment] = useState<Payment[]>([])
    const location = useLocation();
    const baseImage = "https://product.hstatic.net/200000690725/product/social_post_3_-_12.06-04_58b026e298c9484c8baa13a1ef538757_master.jpg";
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | {}>({})
    const [isDisableBtnVoucher, setIsDisableBtnVoucher] = useState<boolean>(true)
    const [listCartDetail, setListCartDetail] = useState<CartDetail[]>([]);
    const [isCollapse, setIsCollapse] = useState<boolean>(true);
    // ADDRESS
    const [IAddress, setIAddress] = useState<IAddress>()
    const [provinces, setProvinces] = useState<IProvince[]>([])
    const [districts, setDistricts] = useState<IDistrict[]>([])
    const [wards, setWards] = useState<IWard[]>([])
    const [tempAddressOverview, setTempAddressOverview] = useState<string>("")
    // 

    const { register, handleSubmit, getValues, watch, setValue, formState: { errors } } = useForm<IForm>({
        resolver: yupResolver(schema)
    });


    const { register: registerFormVoucher, handleSubmit: handleSubmitFormVoucher, getValues: getValuesFormVoucher, formState: { errors: errorsFormVoucher } } = useForm<IFormVoucher>({
        resolver: yupResolver(schemaVoucher)
    });

    const initListPayment = async () => {
        await instance.get("api/manage/payment").then(function (response) {
            if (response.status === 200) {
                setListPayment(response.data)
            }
        })
    }
    const handleOverviewCheckout = async (code: string) => {
        await instance.post(`api/manage/orders/checkout`, {"key": code}).then(function (response) {
            console.log(response)
            if (response?.data as IResponse) {
                setListCartDetail(response?.data?.listCartDetails)
                setTotalBill(response.data.total)
            }
        })
    }

    useEffect(() => {
        const code = decodeURIComponent(location.search).split('code=')[1];
        handleFindAllProvinces()
        initListPayment()
        { code && handleOverviewCheckout(code) }
    }, [])

    useEffect(() => {
        setValue("address", getValues("tempAddressDetail") + " - " + tempAddressOverview)
    }, [watch('tempAddressDetail')])

    useEffect(() => {
        console.log(getValues())
        if (IAddress?.idistrict !== undefined && IAddress?.iprovince !== undefined && IAddress?.iward !== undefined) {
            console.log("Đủ data")
            calculateFee()
        }
    }, [watch('address'), IAddress])


    const calculateFee = async () => {
        const data = {
            "service_type_id": 2,
            "from_district_id": 1680,
            "to_district_id": IAddress?.idistrict?.DistrictID,
            "to_ward_code": IAddress?.iward?.WardCode,
            "weight": 5000,
            "insurance_value": 0,
            "items": [
                {
                    "name": "TEST1",
                    "quantity": 1,
                    "height": 200,
                    "weight": 5000,
                    "length": 200,
                    "width": 200
                }
            ]
        }
        await instanceGHN.post("shiip/public-api/v2/shipping-order/fee", data).then(function (response) {
            console.log(response)
            if (response.status === 200) {
                setFeeShip(response.data.data.total)
            }
        })
    }

    const onSubmitCheckout = async () => {
        console.log(getValues())
        await instance.post(`/api/manage/orders/give`, getValues()).then(function (response) {
            console.log(response)
            if (response.status === 200) {
                toast("Gửi yêu cầu thành công")
                navigate("/")
            }
        })
    }


    useEffect(() => {
        console.log(IAddress)
        if (IAddress?.iprovince?.ProvinceID) {
            handleFindAllDistricts(IAddress.iprovince.ProvinceID)
        }
        if (IAddress?.idistrict?.DistrictID) {
            handleFindAllWards(IAddress?.idistrict?.DistrictID)
        }
        setTempAddressOverview(`${IAddress?.iward?.WardName || ""} - ${IAddress?.idistrict?.DistrictName || ""} - ${IAddress?.iprovince?.ProvinceName || ""}`)
    }, [IAddress])

    const handleFindAllProvinces = async () => {
        instanceGHN.get("shiip/public-api/master-data/province").then(function (response) {
            if (response.status === 200 && response?.data?.data) {
                setProvinces(response.data.data)
                console.log(response.data.data)
            }
        })
    }
    const handleFindAllDistricts = async (idProvince: string) => {
        instanceGHN.get(`shiip/public-api/master-data/district?province_id=${idProvince}`).then(function (response) {
            if (response.status === 200 && response?.data?.data) {
                setDistricts(response.data.data)
            }
        })
    }
    const handleFindAllWards = async (idDistrict: string) => {
        instanceGHN.get(`shiip/public-api/master-data/ward?district_id=${idDistrict}`).then(function (response) {
            if (response.status === 200 && response?.data?.data) {
                setWards(response.data.data)
            }
        })
    }

    const onChangeVoucherCode = (code: string) => {
        if (code.length > 0) {
            setIsDisableBtnVoucher(false)
        }
        else {
            setIsDisableBtnVoucher(true);
        }
    }

    const handleUseVoucher = () => {
        setSelectedVoucher({})
        let code = getValuesFormVoucher("voucherCode")
        instance.get(`/api/manage/vouchers/${code}`).then(function (response) {
            console.log(response)
            if (response?.data) {
                setSelectedVoucher(response.data)
            }
        })
    }

    return (
        <Fragment>
            <div className="relative px-8 py-4 md:px-10 xl:px-20 dark:bg-[#18191a] dark:text-white min-h-screen overflow-auto h-screen">

                <div>
                    <Link to={"/"}>
                        <img className="w-auto h-[56px] rounded-full object-cover" src="https://theme.hstatic.net/200000690725/1001078549/14/logo.png?v=418" alt="Logo" />
                        <label htmlFor="" className="hidden">My Project</label>
                    </Link>
                </div>

                <button onClick={() => setIsCollapse(!isCollapse)} className="flex justify-between items-center py-2 border-t-2 border-b-2 w-full px-2">
                    <div>
                        <span className="text-sm text-blue-400 underline underline-offset-2">{isCollapse ? 'Hiện thông tin đơn hàng' : 'Ẩn thông tin đơn hàng'}</span>
                        <span>{isCollapse ? <ExpandMoreOutlined /> : <ExpandLessOutlined />}</span>
                    </div>
                    <div className="text-red-600 text-[14px]">
                        <span>{totalBill.toLocaleString("vi-VN")}₫</span>
                    </div>
                </button>

                <div>
                    {listCartDetail.map((cart, cartIndex) => (
                        <Fragment key={cartIndex}>
                            <div className={`text-[13.5px] grid grid-cols-12 gap-2 border-b border-dashed border-gray-400 py-3 ${isCollapse ? "hidden" : ""}`}>
                                <div className="inline-flex justify-center items-center col-span-4 gap-1 relative">
                                    <div>
                                        <img src={baseImage} className="w-[18vw] object-cover" alt="Product" />
                                    </div>
                                    <div className="absolute right-1 top-1 text-[12px] border bg-red-700 rounded-full p-1 w-5 h-5 justify-center flex gap-2 duration-100 items-center">
                                        <div className="text-white">
                                            <span>{cart?.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="flex items-center">
                                        <span className="font-medium text-[12.5px]">
                                            {(cart.productDetail as ProductDetail)?.name || ((cart.productDetail as ProductDetail)?.product as Product)?.name}
                                        </span>
                                    </div>
                                    <div className="text-sm font-thin">
                                        <span>{((cart.productDetail as ProductDetail)?.color as Color)?.name}</span>
                                        {" / "}
                                        <span>{((cart.productDetail as ProductDetail)?.size as Size)?.name}</span>
                                    </div>

                                </div>
                                <div className="flex justify-between items-center col-span-2">
                                    <div>
                                        <span className="font-semibold">{((cart.productDetail as ProductDetail)?.price * cart.quantity).toLocaleString("vi-VN") + "₫"}</span>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </div>
                <div>
                    <div className="grid grid-cols-12 py-2 gap-2 items-center">
                        <input {...registerFormVoucher("voucherCode")} onChange={(el) => onChangeVoucherCode(el.target.value)} className={`col-span-8 py-2 px-2 focus:outline-none border text-sm rounded-sm ${errorsFormVoucher.voucherCode ? "border-red-400" : ""}`} placeholder="Mã giảm giá" />
                        <button onClick={handleSubmitFormVoucher(handleUseVoucher)} className={`col-span-4 p-2 rounded-sm text-sm text-white font-thin ${isDisableBtnVoucher ? "disabled bg-gray-500" : "bg-[#013a57]"}`}>Sử dụng</button>
                    </div>
                    <p className="text-[12.5px] text-red-500">{errorsFormVoucher.voucherCode?.message}</p>
                </div>
                <div>
                    {(selectedVoucher as Voucher)?.id && (
                        <Fragment>
                            <div className="text-sm">
                                <div>
                                    <span>Phần trăm tối đa</span>
                                    {" "}
                                    <span>{(selectedVoucher as Voucher)?.percent}</span>
                                </div>
                                <div>
                                    <span>Tổng giá trị tối thiểu</span>
                                    {" "}
                                    <span>{(selectedVoucher as Voucher)?.minimize.toLocaleString("vi-VN")}₫</span>
                                </div>
                                <div>
                                    <span>Giá trị tối đa</span>
                                    {" "}
                                    <span>{(selectedVoucher as Voucher)?.maximum.toLocaleString("vi-VN")}₫</span>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </div>
                <div className="">
                    <div className="text-sm">
                        <div className="py-2 text-[18px] font-semibold">
                            <label>Thông tin giao hàng</label>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-blue-500 underline underline-offset-2">Bạn đã có tài khoản?</span>
                            <span>Đăng nhập</span>
                        </div>
                    </div>
                    <div>
                        <InputWithFocusDiv isValidation={errors.fullName ? false : true} required={true} {...register("fullName")} label="Họ tên" placeholder="Vui lòng nhập họ tên"></InputWithFocusDiv>
                        <p className="text-[12.5px] text-red-500">{errors.fullName?.message}</p>
                        <InputWithFocusDiv isValidation={errors.email ? false : true} required={false} {...register("email")} label="Email" placeholder="Vui lòng nhập email"></InputWithFocusDiv>
                        <InputWithFocusDiv isValidation={errors.phone ? false : true} required={true} {...register("phone")} label="Số điện thoại" placeholder="Vui lòng nhập số điện thoại"></InputWithFocusDiv>
                        <p className="text-[12.5px] text-red-500">{errors.phone?.message}</p>
                        <InputWithFocusDiv isValidation={errors.tempAddressDetail ? false : true} required={true} {...register("tempAddressDetail")} label="Địa chỉ" placeholder="Vui lòng nhập địa chỉ" >
                            <span className="text-sm">{tempAddressOverview}</span>
                        </InputWithFocusDiv>
                        <p className="text-[12.5px] text-red-500">{errors.tempAddressDetail?.message}</p>
                        <SelectWithFocusDiv value={IAddress?.iprovince?.ProvinceID} options={provinces} label="Tỉnh" onChange={(el) => { setIAddress((pre) => ({ ...pre, iprovince: provinces.find((s) => s.ProvinceID.toString() === el.target.value.toString()) })) }}></SelectWithFocusDiv>
                        <SelectWithFocusDiv locked={IAddress?.iprovince?.ProvinceID ? false : true} value={IAddress?.idistrict?.DistrictID} options={districts} label="Thành phố" onChange={(el) => { setIAddress((pre) => ({ ...pre, idistrict: districts.find((s) => s.DistrictID.toString() === el.target.value.toString()) })) }}></SelectWithFocusDiv>
                        <SelectWithFocusDiv locked={IAddress?.idistrict?.DistrictID ? false : true} value={IAddress?.iward?.WardCode} options={wards} label="Xã" onChange={(el) => { setIAddress((pre) => ({ ...pre, iward: wards.find((s) => s.WardCode.toString() === el.target.value.toString()) })) }}></SelectWithFocusDiv>
                    </div>
                    <div className="py-2 text-[18px] font-semibold">
                        <label>Phương thức vận chuyển</label>
                    </div>
                    <div className="text-[15px] border-2 p-2 rounded-md">
                        <form>
                            <div className="flex gap-2 py-1">
                                <input
                                    type="radio"
                                    id="rdo1"
                                    {...register("deliveryType")}
                                    value="1"
                                    defaultChecked
                                />
                                <label htmlFor="rdo1">Giao hàng tận nơi - {feeShip.toLocaleString("vi-VN")}₫</label>
                            </div>

                        </form>
                    </div>
                    <div className="py-2 text-[18px] font-semibold">
                        <label>Phương thức thanh toán</label>
                    </div>
                    <div className="text-[15px] border-2 p-2 rounded-md">
                        <div className="flex flex-col gap-2 py-1">
                            {
                                listPayment.map((item, index) => (
                                    <div className="flex gap-2 py-1" key={index}>
                                        <input
                                            type="radio"
                                            id="rdoPayment1"
                                            {...register("paymentMethod")}
                                            value={item.id}
                                            defaultChecked
                                        />
                                        <label htmlFor="rdoPayment1">{item.name}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="mt-2">
                        <button onClick={handleSubmit(onSubmitCheckout)} className="bg-black w-full py-4 font-thin rounded-md text-white text-sm">Hoàn tất đơn hàng</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CheckOutComponent;
