import React from "react";
import Side_Navbar from "../Side_Navbar";
import Groups from "./Groups";

const UserGroups = () => {
    return (
        <div className="flex">
            <Side_Navbar />
            <Groups />
        </div>
    )
}

export default UserGroups;