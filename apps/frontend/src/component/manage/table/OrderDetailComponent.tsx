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


const OrderDetailComponent = () => {
    const { register, handleSubmit, setValue, reset } = useForm<OrderDetail>();
    const [disableForm, setDisableForm] = useState<boolean>(false);
    const [listOrder, setListOrder] = useState<Order[]>()
    const [listDetailProduct, setListDetailProduct] = useState<ProductDetail>()
    const [method, setMethod] = useState<Method>(Method.DETAIL);
    const [data, setData] = useState<OrderDetail[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [object, setObject] = useState<OrderDetail | {}>({});
    const limit = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const onSubmit = (data: OrderDetail) => {
        if (method === Method.UPDATE) {
            instance.put(`/api/manage/order-details/${(object as OrderDetail).id}`, data).then(
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
            instance.post("/api/manage/order-details", data).then(
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
            instance.delete(`/api/manage/order-details/${(object as OrderDetail).id}`).then(
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
        await instance.get(`/api/manage/order-details?limit=${limit}&offset=${currentPage - 1}`).then(function (response) {
            console.log(response)
            setData(response?.data?.content)
            setTotalPages(response?.data?.totalPages)
        })
        await instance.get(`/api/manage/orders?limit=${100}&offset=${0}`).then(function (response) {
            console.log(response)
            setListOrder(response?.data?.content)
        })
        await instance.get(`/api/manage/product-details?limit=${100}&offset=${0}`).then(function (response) {
            console.log(response)
            setListDetailProduct(response?.data?.content)
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
            setValue("id", (object as OrderDetail).id);
            setValue("order", ((object as OrderDetail).order as Order)?.id);
            setValue("productDetail", ((object as OrderDetail).productDetail as ProductDetail)?.id);
            setValue("quantity", object.quantity);

        } else {
            reset();
        }
    }, [object, openDialog, setValue, reset])

    useEffect(() => {
        fetchData();
    }, [currentPage])

    const handleOpenDialog = (object: Order | {}, method: Method) => {
        setOpenDialog(true);
        setObject(object);
        setMethod(method);
    }

    return (
        <Fragment>
            <div className="relative">
                <div className="flex justify-end pb-2">
                    <button className="bg-indigo-400 rounded-md text-[12px] py-1 px-2" onClick={() => handleOpenDialog({}, Method.CREATE)}>Add new</button>
                </div>
                <div>
                    <div className="hidden md:block">
                        <table className="table-auto md:table-fixed w-full text-[13.5px]">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Order</th>
                                    <th>Product</th>
                                    <th>DetailProduct</th>
                                    <th>Quantity</th>
                                    <th>Voucher</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{(item.order as Order)?.id || "N/A"}</td>
                                            <td>{((item.productDetail as ProductDetail)?.product as Product)?.name || "N/A"}</td>
                                            <td>{(item.productDetail as ProductDetail)?.code || "N/A"}</td>
                                            <td>{item.quantity || "N/A"}</td>
                                            <td>{((item.order as Order)?.voucher as Voucher)?.name || "N/A"}</td>
                                            <td>{((item.productDetail as ProductDetail)?.price * item.quantity) || "N/A"}</td>
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
                                        <div>
                                            <span>#{item.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                <span>{(item.order as Order)?.orderDate.toString()}</span>
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
                            <Input type="number" autoComplete="false" disabled={disableForm} className="px-2 py-1.5" {...register("quantity")} label="Quantity"></Input>
                            <Select disabled={disableForm} className="px-2 py-1.5" label="Detail Proudct" {...register("productDetail")} defaultValue={""} >
                                {
                                    Array.isArray(listDetailProduct) && listDetailProduct.map((item, index) => (
                                        <option key={index} value={item.id}>{item.code}</option>
                                    ))
                                }
                            </Select>
                            <Select disabled={disableForm} className="px-2 py-1.5" label="Order" {...register("order")} defaultValue={""} >
                                {
                                    Array.isArray(listOrder) && listOrder.map((item, index) => (
                                        <option key={index} value={item.id}>{item.id}</option>
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

export default OrderDetailComponent;
