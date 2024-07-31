import { CloseOutlined } from "@mui/icons-material";

const ConfirmComponent = ({ onDelete, isOpen, setIsOpen, targert }: { onDelete: any, isOpen: boolean, setIsOpen: any, targert: string }) => {
    return (
        <div className={`fixed left-1/2 bg-white border-4 border-double border-blue-300 rounded-t-2xl -translate-x-1/2 w-5/6 transition-all duration-300 ${isOpen ? "bottom-1" : "-bottom-full"}`}>
            <div className="flex justify-between bg-indigo-400 p-2 rounded-t-xl">
                <div>
                    <span className="font-semibold text-gray-800 text-[17px]">Confirm</span>
                </div>
                <div>
                    <button onClick={() => setIsOpen(false)}><CloseOutlined /></button>
                </div>
            </div>
            <div className="text-center p-2 mb-3">
                <div className="py-5 text-[14px]">
                    <span className="font-semibold text-gray-600">Xác nhận xóa:</span>
                    <span> {targert}</span>
                </div>
                <button className="w-full py-1.5 text-sm font-semibold text-gray7800 px-2 bg-indigo-400 rounded-md" onClick={onDelete}>Submit</button>
            </div>
        </div>
    );
}

export default ConfirmComponent;