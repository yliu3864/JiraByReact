import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import DashboardScreen from "screens/dashboard";
import EpicScreen from "screens/epic";

export default function ProjectScreen() {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"dashboard"}>DashBoard</Link>
      <Link to={"epic"}>Epic</Link>
      <Routes>
        <Route path={"/dashboard"} element={<DashboardScreen />} />
        <Route path={"/epic"} element={<EpicScreen />} />
      </Routes>
      {/* <Navigate to={window.location.pathname + "/dashboard"} /> */}
    </div>
  );
}
