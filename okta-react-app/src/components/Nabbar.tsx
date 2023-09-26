import React from "react";
import { FaSearch } from "react-icons/fa";
import profilePicture from "../assets/profilePicture.png";
import Home from "../Home";
import { ClayInput } from "@clayui/form";
import ClayButton from "@clayui/button";
import DropDown from "@clayui/drop-down";

import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="navbar-container">
        <div className="search">
          🔎
          <ClayInput placeholder="Search" />
        </div>

        <div className="user">
          <Home />
          <img src={profilePicture} alt="profile" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
