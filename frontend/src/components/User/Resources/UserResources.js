import React from "react";
import Side_Navbar from "../Side_Navbar";
import ResourcesComponent from "./ResourcesComponent";

const UserResources = () => {
    return (
        <div className="flex">
            <Side_Navbar />
            <ResourcesComponent />
        </div>
    )
}

export default UserResources;