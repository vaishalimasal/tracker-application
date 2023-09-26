import React, { useState, useEffect } from "react";

import ClayLink from "@clayui/link";
import ClayNavigationBar from "@clayui/navigation-bar";
import { useHistory } from "react-router-dom";
import Logo from "../assets/logo.png";
import LanguageDropdown from "./LanguageDropdown";
import ClayNav from "@clayui/nav";
import { Link } from "react-router-dom";

import "./sidebar.css";

export default function Sidebar() {
  const history = useHistory();
  const [active, setActive] = useState("1");

  // @ts-ignore
  const handleLinkClick = (value: string) => {
    if (value === "1") {
      history.push("/login/project-details");
    } else if (value === "3") {
      history.push("/login/create-project");
    } else if (value === "2") {
      history.push("/login/create-issue");
    }

    setActive(value);
  };

  // const handleLinkClick = (value: string) => {
  //   setActive(value);
  // };
  // @ts-ignore
  useEffect(() => {
    const winActive = window.location.href.split("/")[3];
    setActive(winActive || "1");
  }, []);

  return (
    // <div className="sidebar">
    //   <div className="logo">
    //     <img src={Logo} alt="logo" />
    //   </div>

    //   <ClayNav className="links">
    //     <ClayNavigationBar.Item
    //       className={`sidemenu ${active === "1" ? "active" : "inactive"}`}
    //     >
    //       <Link to="/" onClick={() => handleLinkClick("1")}>
    //         PROJECT BOARD
    //       </Link>
    //     </ClayNavigationBar.Item>
    //     <ClayNavigationBar.Item
    //       className={`sidemenu ${active === "2" ? "active" : "inactive"}`}
    //     >
    //       <Link to="/login/create-issue" onClick={() => handleLinkClick("2")}>
    //         CREATE ISSUES
    //       </Link>
    //     </ClayNavigationBar.Item>
    //     <ClayNavigationBar.Item
    //       className={`sidemenu ${active === "3" ? "active" : "inactive"}`}
    //     >
    //       <Link to="/login/create-project" onClick={() => handleLinkClick("3")}>
    //         CREATE PROJECT
    //       </Link>
    //     </ClayNavigationBar.Item>
    //   </ClayNav>

    //   {/* <div className="user">
    //     <Home></Home>
    //   </div> */}
    // </div>

    <div className="sidebardiv">
      <img className="sidebarimg" src={Logo} alt="logo" />

      <ClayNav className="sidebarul">
        <ClayNavigationBar.Item
          className={`sidemenu ${active === "1" ? "active" : "inactive"}`}
          active={active === "1"}
        >
          <ClayLink
            className="sidebarbtn"
            onClick={(event) => {
              event.preventDefault();
              handleLinkClick("1");
            }}
          >
            PROJECT BOARD
          </ClayLink>
        </ClayNavigationBar.Item>
        <ClayNavigationBar.Item className="" active={active === "2"}>
          <ClayLink
            className="sidebarbtn"
            onClick={(event) => {
              event.preventDefault();
              handleLinkClick("2");
            }}
          >
            CREATE ISSUES
          </ClayLink>
        </ClayNavigationBar.Item>
        <ClayNavigationBar.Item className="" active={active === "3"}>
          <ClayLink
            className="sidebarbtn"
            onClick={(event) => {
              event.preventDefault();
              handleLinkClick("3");
            }}
          >
            CREATE PROJECT
          </ClayLink>
        </ClayNavigationBar.Item>
      </ClayNav>

      <LanguageDropdown />
    </div>
  );
}
