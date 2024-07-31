import { Fragment } from "react";
import { Link } from "react-router-dom";
import { UsersIcon, RectangleStackIcon, ArchiveBoxIcon, TicketIcon, TruckIcon, DocumentTextIcon } from '@heroicons/react/20/solid';
import { Category, ColorLens, StorageOutlined } from "@mui/icons-material";
const ManageComponent = () => {
    const listItem = [
        {
            "name": "User",
            "link": "users",
            "icon": <UsersIcon />
        },
        {
            "name": "Product",
            "link": "products",
            "icon": <ArchiveBoxIcon />
        },
        {
            "name": "Product Details",
            "link": "product-details",
            "icon": <RectangleStackIcon />
        },
        {
            "name": "Category",
            "link": "categories",
            "icon": <Category/>
        },
        {
            "name": "Color",
            "link": "colors",
            "icon": <ColorLens />
        },
        // {
        //     "name": "License",
        //     "link": "licenses",
        //     "icon": <FingerPrintIcon />
        // },
        {
            "name": "Order",
            "link": "orders",
            "icon": <TruckIcon />
        },
        {
            "name": "Order Details",
            "link": "order-details",
            "icon": <TruckIcon />
        },
        {
            "name": "Voucher",
            "link": "vouchers",
            "icon": <TicketIcon />
        },
        {
            "name": "Files",
            "link": "files",
            "icon": <DocumentTextIcon />
        },
        {
            "name": "Storage",
            "link": "storage",
            "icon": <StorageOutlined />
        },
    ]
    return (
        <Fragment>
            <div>
                <div>
                    <p className="text-xl font-semibold">Manage</p>
                </div>
                <div className="grid md:grid-cols-2 gap-2 mt-2">
                    {
                        listItem.map((item, index) => (
                            <div key={index} className="p-3 shadow-xl border-2 border-gray-300 rounded-md ">
                                <Link to={item.link} className="hover:text-red-500">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-5 text-gray-600">{item.icon}</div>
                                        <span className="text-[15px] tracking-tighter text-gray-600 font-semibold">{item.name}</span>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default ManageComponent;