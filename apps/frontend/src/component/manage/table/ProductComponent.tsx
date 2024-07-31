import { Fragment, useEffect, useRef, useState } from "react";
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
import JoditEditor from 'jodit-react';
import { Label } from "../../ui/label";

const ProductComponent = () => {
    const { register, handleSubmit, setValue, reset } = useForm<Product>();
    const [disableForm, setDisableForm] = useState<boolean>(false);
    const editor = useRef(null);

    const onSubmit = (data: Product) => {
        if (data.file instanceof FileList) {
            data.file = data.file[0];
        }
        console.log(data);

        const fetchMethod = method === Method.UPDATE ? instance.put : instance.post;
        const url = method === Method.UPDATE ? `/api/manage/products/${(object as Product).id}` : `/api/manage/products`;

        fetchMethod(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                toast(method === Method.UPDATE ? "Updated successfully" : "Created successfully");
                setOpenDialog(false);
            }
            fetchData();
        }).catch(error => {
            console.error(`There was an error ${method === Method.UPDATE ? 'updating' : 'creating'} the product!`, error);
        });

        if (method === Method.DELETE) {
            instance.delete(`/api/manage/products/${(object as Product).id}`).then(response => {
                console.log(response)
                if (response.status === 200) {
                    toast("Deleted successfully")
                    setOpenDialog(false);
                }
                fetchData();
            })
        }
    };

    const [method, setMethod] = useState<Method>(Method.DETAIL);
    const [data, setData] = useState<Product[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [object, setObject] = useState<Product | {}>({});
    const limit = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        await instance.get(`/api/manage/products?limit=${limit}&offset=${currentPage - 1}`).then(response => {
            console.log(response)
            setData(response?.data?.content)
            setTotalPages(response?.data?.totalPages)
        })
    }

    useEffect(() => {
        setDisableForm(method === Method.DETAIL || method === Method.DELETE);
    }, [method])

    useEffect(() => {
        if (openDialog && 'id' in object) {
            setValue("id", (object as Product).id);
            setValue("name", (object as Product).name || "");
            setValue("code", (object as Product).code || "");
            setValue("price", (object as Product).price);
            setValue("suggest", (object as Product).suggest || false);
            setValue("description", (object as Product).description || "");
        } else {
            reset();
        }
    }, [object, openDialog, setValue, reset])

    useEffect(() => {
        fetchData();
    }, [currentPage])

    const handleOpenDialog = (object: Product | {}, method: Method) => {
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
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name || "N/A"}</td>
                                            <td>{item.code || "N/A"}</td>
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
                                                <span>{item.name}</span>
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
                        <form onSubmit={handleSubmit(onSubmit)} className="overflow-auto max-h-[600px]">
                            <Input autoComplete="false" disabled={disableForm} className="px-2 py-1.5" {...register('name')} label="Name" defaultValue={""}></Input>
                            <Input autoComplete="false" disabled={disableForm} className="px-2 py-1.5" {...register('code')} label="Code" defaultValue={""}></Input>
                            <Input autoComplete="false" disabled={disableForm} className="px-2 py-1.5" {...register('price')} label="Price" defaultValue={""}></Input>
                            <Input type="file" autoComplete="false" disabled={disableForm} className="px-2 py-1.5" {...register('file')} label="Image"></Input>
                            <Select disabled={disableForm} className="px-2 py-1.5" label="Suggest" {...register("suggest")} defaultValue={""}>
                                <option value={"true"}>True</option>
                                <option value={"false"}>False</option>
                            </Select>
                            <div className="">
                                <Label>Description</Label>
                                <JoditEditor
                                    className=""
                                    {...register('description')}
                                    ref={editor}
                                    value={(object as Product)?.description}
                                    onBlur={newContent => setValue("description", newContent)} // preferred to use only this option to update the content for performance reasons
                                    onChange={newContent => setValue("description", newContent)}
                                />
                            </div>
                            <Button className={`w-full mt-2 ${method === Method.DETAIL ? "hidden" : ""}`} variant={"subtle"} size={"sm"}>Submit</Button>
                        </form>
                    </Dialog>
                </div>
            </div>
        </Fragment>
    );
}

export default ProductComponent;
