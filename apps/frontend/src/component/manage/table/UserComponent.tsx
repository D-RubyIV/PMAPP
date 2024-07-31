import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import instance from "../../../axios/Instance";
import PagenateComponent from "../puzzle/PaginateComponent";
import { Dialog } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Select } from "../../ui/select";
import { useForm } from 'react-hook-form';
import { Method } from "../enum/Method";
import { DeleteOutline, EditOutlined, Visibility } from "@mui/icons-material";
import toast from "react-hot-toast";



const UserComponent = () => {
    const { register, handleSubmit, setValue, reset } = useForm<User>();
    const [diableForm, setDiableForm] = useState<boolean>(false)

    const onSubmit = (data: User) => {
        if (method === Method.UPDATE) {
            instance.put(`/api/manage/users/${(object as User).id}`, data).then(
                function (response) {
                    console.log(response)
                    if (response.status === 200) {
                        toast("Update successfully")
                        setOpenDialog(false)
                    }
                    fetchData();
                }
            )
        }
        else if (method === Method.CREATE) {
            instance.post("/api/manage/users", data).then(
                function (response) {
                    console.log(response)
                    if (response.status === 200) {
                        toast("Create successfully")
                        setOpenDialog(false)
                    }
                    fetchData();
                }
            )
        }
        else if (method === Method.DELETE) {
            instance.delete(`/api/manage/users/${(object as User).id}`).then(
                function (response) {
                    console.log(response)
                    if (response.status === 200) {
                        toast("Delete successfully")
                        setOpenDialog(false)
                    }
                    fetchData();
                }
            )
        }
    

    }

    const [method, setMethod] = useState<Method>(Method.DETAIL)
    const [data, setData] = useState<User[]>([])
    const [openDialog, setOpenDialog] = useState(false)
    const [object, setObject] = useState<User | {}>({})
    const limit = 9;
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchData = async () => {
        await instance.get(`/api/manage/users?limit=${limit}&offset=${currentPage - 1}`).then(function (response) {
            console.log(response)
            setData(response?.data?.content)
            setTotalPages(response?.data?.totalPages)
        })
    }

    useEffect(() => {
        if (method === Method.DETAIL || method === Method.DELETE) {
            setDiableForm(true)
        }
        else {
            setDiableForm(false)
        }
    }, [method])


    useEffect(() => {
        console.log(object)
        if (openDialog && 'id' in object) {
            setValue("id", (object as User).id);
            setValue("email", (object as User).email || "");
            setValue("password", (object as User).password || "");
            setValue("phone", (object as User).phone || "");
            setValue("provider", (object as User).provider || "");
            setValue("role", (object as User).role || "");
            setValue("enabled", (object as User).enabled || false);
        } else {
            reset();
        }
    }, [object, openDialog, setValue, reset])

    useEffect(() => {
        fetchData()
    }, [currentPage])

    useEffect(() => {
        console.log(object)
    }, [object])


    const handleOpenDialog = (object: User | {}, method: Method) => {
        console.log("METHOD: " + method)
        setOpenDialog(true);
        setObject(object);
        setMethod(method);
        console.log(object);
    }


    return (
        <Fragment>
            <div className="relative">
                {/*  */}
                <div className="flex justify-end pb-2">
                    <button className="bg-indigo-400 rounded-md text-[12px] py-1 px-2" onClick={() => handleOpenDialog({}, Method.CREATE)}>Add new</button>
                </div>
                {/*  */}
                <div>
                    <div className="hidden md:block">
                        <table className="table-auto md:table-fixed w-full text-[13.5px]">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Enable</th>
                                    <th>Role</th>
                                    <th>Provider</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.email || "N/a"}</td>
                                            <td>{item.phone || "N/a"}</td>
                                            <td>{item.enabled ? "True" : "False" || "N/a"}</td>
                                            <td>{item.role || "N/a"}</td>
                                            <td>{item.provider || "N/a"}</td>
                                            <td>{item.image || "N/a"}</td>
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
                                                <span>{item.email}</span>
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
                {/*  */}
                <div className={`px-8 py-4 md:px-10 xl:px-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full ${openDialog ? "" : "hidden"}`}>
                    <Dialog method={method} className="bg-white shadow-xl rounded-md" open={openDialog} handleclose={() => setOpenDialog(false)}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input autoComplete="false" disabled={diableForm} className="px-2 py-1.5" {...register('email')} label="Email"></Input>
                            <Input autoComplete="false" disabled={diableForm} className="px-2 py-1.5" {...register('password')} label="Password"></Input>
                            <Input autoComplete="false" disabled={diableForm} className="px-2 py-1.5" {...register('phone')} label="Phone"></Input>

                            <Select disabled={diableForm} className="px-2 py-1.5" label="Provider" {...register("provider")} defaultValue={""}>
                                <option value={"Local"}>Local</option>
                                <option value={"Google"}>Google</option>
                                <option value={"Facebook"}>Facebook</option>
                                <option value={"Github"}>Github</option>
                            </Select>

                            <Select disabled={diableForm} className="px-2 py-1.5" label="Role" {...register("role")} defaultValue={""}>
                                <option value={"User"}>User</option>
                                <option value={"Moderator"}>Moderator</option>
                                <option value={"Admin"}>Admin</option>
                            </Select>

                            <Select disabled={diableForm} className="px-2 py-1.5" label="Enabled" {...register("enabled")} defaultValue={""}>
                                <option value={"true"}>True</option>
                                <option value={"false"}>False</option>
                            </Select>
                            <Button className={`w-full mt-2 ${method === Method.DETAIL ? "hidden" : ""}`} variant={"subtle"} size={"sm"}>Submit</Button>
                        </form>
                    </Dialog>
                </div>
            </div>
        </Fragment>
    );
}

export default UserComponent;