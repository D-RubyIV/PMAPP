import { DoubleArrowOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";


interface Item {
    name: string,
    link: string
}


const ServiceComponent = () => {
    const arrayLinks: Item[] = [
        {
            name: "Armor",
            link: "/armor"
        },
        {
            name: "Backup",
            link: ""
        },
    ]
    return (
        <Fragment>
            <div>
                {
                    arrayLinks.map((item, index) => (
                        <Fragment key={index}>
                            <div className="bg-white border-2 rounded-md p-5 shadow-md mt-2">
                                <Link to={item.link}>
                                    <div className="flex gap-2">
                                        <div>
                                            <span><DoubleArrowOutlined /></span>
                                        </div>
                                        <div>
                                            <span className="text-[18px] font-semibold text-gray-600">{item.name}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </Fragment>
                    ))
                }
            </div>
        </Fragment>
    );
}

export default ServiceComponent;