import React from "react";
import Admin_SideBar from "../Admin_SideBar";
import Therapist from "./Therapist";
import AddTherapist from "./AddTherapist";
const Admin_Therapists = () => {
  return (
    <div className="flex bg-[#F2FCFF]">
      <Admin_SideBar />
      <Therapist/>
    </div>
  );
};

export default Admin_Therapists;
