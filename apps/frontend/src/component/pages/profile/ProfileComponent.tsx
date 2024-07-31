import { Fragment } from "react/jsx-runtime";

const ProfileComponent = () => {
    return (
        <Fragment>
            {/* Avatar */}
            <div className="mt-2">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between text-[15px] font-medium">
                        <div>
                            <p>Profile picture</p>
                        </div>
                        <button className="text-blue-500">
                            Edit
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <img src="https://th.bing.com/th/id/OIP.2sK1bmrOGc4gpkVExFlwpwHaHa?w=175&h=180&c=7&r=0&o=5&pid=1.7" className="rounded-full w-1/2 max-w-28"></img>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ProfileComponent;