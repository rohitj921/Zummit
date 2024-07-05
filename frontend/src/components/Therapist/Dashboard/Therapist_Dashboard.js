import React from "react";
import Admin_SideBar from "../Therapist_SideBar";
import Dashboard from "./Dashboard";
import Therapist_SideBar from "../Therapist_SideBar";
import Shimmer from "./Shimmer";
import TherapistPop from "../TherapistPop/TherapistPop";

const Therapist_Dashboard = () => {
  return (
    <div className="flex bg-[#F2FCFF]">
      <Therapist_SideBar />
      <Dashboard />
      {/* <Shimmer/> */}
      <TherapistPop/>
    </div>
  );
};

export default Therapist_Dashboard;
