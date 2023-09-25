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
          {/* <DropDown
            trigger={
              <span className="userid">
          
                <img className="navimg" src={profilePicture} alt="img" />
              </span>
            }
          >
            <DropDown.Item>
              <ClayButton>Logout</ClayButton>
            </DropDown.Item>
          </DropDown> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
