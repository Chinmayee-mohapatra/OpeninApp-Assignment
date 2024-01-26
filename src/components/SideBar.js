import React from "react";
import { FaCalendarAlt, FaCloudUploadAlt } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { GrSchedules } from "react-icons/gr";
import { IoNotifications } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import LOGO from "../assests/EllipseLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const SideBar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <div className="h-full px-2 md:px-4 shadow-md">
      <div className="flex items-center justify-center py-8 md:py-10 gap-2 md:gap-4">
        <img src={LOGO} alt="logo" color="#605BFF" />
        <h2 className="font-semibold text-lg md:text-xl lg:text-2xl">Base</h2>
      </div>
      <ul className="flex flex-col gap-4 md:gap-6 text-sm md:text-base lg:text-lg font-semibold text-[#858585] px-2 md:px-6 lg:px-8 py-2 md:py-4">
        <Link to={"/browse/dashboard"} className="flex items-center gap-3">
          <RxDashboard color="#858585" />
          Dashboard
        </Link>
        <Link to={"/browse/upload"} className="flex items-center gap-3">
          <FaCloudUploadAlt fill="#858585" />
          Upload
        </Link>
        <Link className="flex items-center gap-3">
          <LiaFileInvoiceSolid fill="#858585" />
          Invoice
        </Link>
        <Link className="flex items-center gap-3">
          <GrSchedules fill="#858585" />
          Schedule
        </Link>
        <Link className="flex items-center gap-3">
          <FaCalendarAlt fill="#858585" />
          Calendar
        </Link>
        <Link className="flex items-center gap-3">
          <IoNotifications fill="#858585" />
          Notification
        </Link>
        <Link className="flex items-center gap-3">
          <IoSettingsSharp fill="#858585" />
          Settings
        </Link>
        <Link to={"/"}>
          <button
            className="bg-green-600 px-3 py-1 text-white rounded-sm hover:bg-green-700"
            onClick={() => {
              handleSignOut();
            }}
          >
            Logout
          </button>
        </Link>
      </ul>
    </div>
  );
};

export default SideBar;
