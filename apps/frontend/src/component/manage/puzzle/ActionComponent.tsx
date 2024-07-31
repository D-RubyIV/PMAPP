import React, { } from "react";
import { DeleteOutline, EditOutlined, Visibility } from "@mui/icons-material";
import { Method } from "../enum/Method"; // Import Method enum

const ActionComponent = ({ handleOpenDialog }: { handleOpenDialog: (object: any, method: Method) => void }) => {
    return (
        <React.Fragment>
            <div className="flex gap-3 justify-center">
                <button className="text-gray-500" onClick={() => handleOpenDialog({}, Method.DETAIL)}><Visibility sx={{ fontSize: 18 }} /></button>
                <button className="text-gray-500" onClick={() => handleOpenDialog({}, Method.UPDATE)}><EditOutlined sx={{ fontSize: 18 }} /></button>
                <button className="text-gray-500" onClick={() => handleOpenDialog({}, Method.DELETE)}><DeleteOutline sx={{ fontSize: 18 }} /></button>
            </div>
        </React.Fragment>
    );
}

export default ActionComponent;