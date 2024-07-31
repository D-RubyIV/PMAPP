import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import instance from "../../../axios/Instance";
import PagenateComponent from "../puzzle/PaginateComponent";
import { Dialog } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useForm } from 'react-hook-form';
import { Method } from "../enum/Method";
import { DeleteOutline, EditOutlined, Visibility } from "@mui/icons-material";
import toast from "react-hot-toast";
import { Select } from "../../ui/select";
import { useTranslation } from "react-i18next";


const ProductDetailComponent = () => {
    const { t } = useTranslation();
    const { register, handleSubmit, setValue, reset } = useForm<ProductDetail>();

    const [disableForm, setDisableForm] = useState<boolean>(false);

    const [listProduct, setListProduct] = useState<Product[]>()
    const [listColor, setListColor] = useState<Color[]>()
    const [listSize, setListSize] = useState<Size[]>()

    const [method, setMethod] = useState<Method>(Method.DETAIL);
    const [data, setData] = useState<ProductDetail[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [object, setObject] = useState<ProductDetail | {}>({});
    const limit = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const onSubmit = (data: ProductDetail) => {
        
        if (data.file as FileList){
            data.file = (data.file as FileList)[0]
        }

        if (method === Method.UPDATE) {
            instance.put(`/api/manage/product-details/${(object as ProductDetail).id}`, data,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(
                function (response) {
                    console.log(response)
                    if (response.status === 200) {
                        toast("Updated successfully")
                        setOpenDialog(false);
                    }
                    fetchData();
                }
            )
        }
        else if (method === Method.CREATE) {
            instance.post("/api/manage/product-details", data,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(
                function (response) {
                    console.log(response)
                    if (response.status === 200) {
                        toast("Created successfully")
                        setOpenDialog(false);
                    }
                    fetchData();
                }
            )
        }
        else if (method === Method.DELETE) {
            instance.delete(`/api/manage/product-details/${(object as ProductDetail).id}`).then(
                function (response) {
                    console.log(response)
                    if (response.status === 200) {
                        toast("Deleted successfully")
                        setOpenDialog(false);
                    }
                    fetchData();
                }
            )
        }
    }


    const fetchData = async () => {
        await instance.get(`/api/manage/product-details?limit=${limit}&offset=${currentPage - 1}`).then(function (response) {
            console.log(response)
            setData(response?.data?.content)
            setTotalPages(response?.data?.totalPages)
        })
        await instance.get(`/api/manage/products?limit=${100}&offset=${0}`).then(function (response) {
            console.log(response)
            setListProduct(response?.data?.content)
        })
        await instance.get(`/api/manage/colors?limit=${100}&offset=${0}`).then(function (response) {
            console.log(response)
            setListColor(response?.data?.content)
        })
        await instance.get(`/api/manage/sizes?limit=${100}&offset=${0}`).then(function (response) {
            console.log(response)
            setListSize(response?.data?.content)
        })
    }

    useEffect(() => {
        if (method === Method.DETAIL || method === Method.DELETE) {
            setDisableForm(true);
        }
        else {
            setDisableForm(false);
        }
    }, [method])

    useEffect(() => {
        if (openDialog && 'id' in object) {
            setValue("id", (object as ProductDetail).id);
            setValue("name", (object as ProductDetail).name);
            setValue("quantity", (object as ProductDetail).quantity);
            setValue("price", (object as ProductDetail).price);
            setValue("code", (object as ProductDetail).code);
            setValue("product", ((object as ProductDetail).product as Product)?.id);
            setValue("size", ((object as ProductDetail).size as Size)?.id);
            setValue("color", ((object as ProductDetail).color as Color)?.id);
        } else {
            reset();
        }
    }, [object, openDialog, setValue, reset])

    useEffect(() => {
        fetchData();
    }, [currentPage])

    const handleOpenDialog = (object: ProductDetail | {}, method: Method) => {
        setOpenDialog(true);
        setObject(object);
        setMethod(method);
    }

    return (
        <Fragment>
            <div className="relative">
                <div className="flex justify-end pb-2">
                    <button className="bg-indigo-400 rounded-md text-[12px] py-1 px-2" onClick={() => handleOpenDialog({}, Method.CREATE)}>{t('add_new')}</button>
                </div>
                <div>
                    <div className="hidden md:block">
                        <table className="table-auto md:table-fixed w-full text-[13.5px]">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Code</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Product</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.code || "N/A"}</td>
                                            <td>{item.quantity || "N/A"}</td>
                                            <td>{item.price}</td>
                                            <td>{(item.product as Product)?.name || "N/A"}</td>
                                            <td>{(item.color as Color)?.name || "N/A"}</td>
                                            <td>{(item.size as Size)?.name || "N/A"}</td>
                                            <td>
                                                <div className="flex gap-3 justify-center">
                                                    <button className="text-gray-500" onClick={() => handleOpenDialog(item, Method.DETAIL)}><Visibility sx={{ fontSize: 18 }} /></button>
                                                    <button className="text-gray-500" onClick={() => handleOpenDialog(item, Method.UPDATE)}><EditOutlined sx={{ fontSize: 18 }} /></button>
                                                    <button className="text-gray-500" onClick={() => handleOpenDialog(item, Method.DELETE)}><DeleteOutline sx={{ fontSize: 18 }} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden">
                        <ul className="flex flex-col gap-3">
                            {
                                data.map((item) => (
                                    <li key={item.id} className="border-2 py-2 px-3 rounded-md text-sm">
                                        <div className="flex gap-2">
                                            <span>#{item.id}</span>
                                            <span>{t('name')}: {item.name || "N/a"}</span>
                                        </div>
                                        <div className="flex justify-between mt-1">
                                            <div className="flex gap-1">
                                                <span className="bg-green-200 py-0.5 px-1  rounded-md">{t('product')}: {(item.product as Product)?.name}</span>
                                            </div>
                                            <div>
                                                <div className="flex gap-3 justify-center">
                                                    <button className="text-gray-500" onClick={() => handleOpenDialog(item, Method.DETAIL)}><Visibility sx={{ fontSize: 18 }} /></button>
                                                    <button className="text-gray-500" onClick={() => handleOpenDialog(item, Method.UPDATE)}><EditOutlined sx={{ fontSize: 18 }} /></button>
                                                    <button className="text-gray-500" onClick={() => handleOpenDialog(item, Method.DELETE)}><DeleteOutline sx={{ fontSize: 18 }} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="py-3">
                        <PagenateComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}></PagenateComponent>
                    </div>
                </div>
                <div className={`px-8 py-4 md:px-10 xl:px-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full ${openDialog ? "" : "hidden"}`}>
                    <Dialog method={method} className="bg-white shadow-xl rounded-md" open={openDialog} handleclose={() => setOpenDialog(false)}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* <Input autoComplete="false" disabled={disableForm} className="px-2 py-1.5"  {...register("code", { required: "code is required!" })} label="Code"></Input>
                            {errors.code && (<p className="text-sm text-red-500">{errors.code.message}</p>)} */}
                            <Input autoComplete="false" disabled={disableForm} className="px-2 py-1.5" {...register("name")} label="Name"></Input>
                            <Input autoComplete="false" disabled={disableForm} className="px-2 py-1.5" {...register("code")} label="Code"></Input>
                            <Input type="number" autoComplete="false" disabled={disableForm} className="px-2 py-1.5" {...register("quantity", { valueAsNumber: true, })} label="Quantity"></Input>
                            <Input type="number" autoComplete="false" disabled={disableForm} className="px-2 py-1.5" {...register("price", { valueAsNumber: true, })} label="Price"></Input>
                            <Input type="file" autoComplete="false" disabled={disableForm} className="px-2 py-1.5" {...register("file", { valueAsNumber: true, })} label="Image"></Input>


                            <Select disabled={disableForm} className="px-2 py-1.5" label="Product" {...register("product")} defaultValue={""} >
                                {
                                    Array.isArray(listProduct) && listProduct.map((item, index) => (
                                        <option key={index} value={item.id} >{item.name}</option>
                                    ))
                                }
                            </Select>
                            <Select disabled={disableForm} className="px-2 py-1.5" label="Color" {...register("color")} defaultValue={""} >
                                {
                                    Array.isArray(listColor) && listColor.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </Select>
                            <Select disabled={disableForm} className="px-2 py-1.5" label="Size" {...register("size")} defaultValue={""} >
                                {
                                    Array.isArray(listSize) && listSize.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </Select>
                            <Button className={`w-full mt-2 ${method === Method.DETAIL ? "hidden" : ""}`} variant={"subtle"} size={"sm"}>Submit</Button>
                        </form>
                    </Dialog>
                </div>
            </div>
        </Fragment>
    );
}

export default ProductDetailComponent;
