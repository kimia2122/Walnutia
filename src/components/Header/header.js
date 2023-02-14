import React from "react";

import Menu from "./menu";
import headerLogo from "../../Assets/svg/headerLogo.svg";
import "./header-style.scss";

const Header = () => {
    return (
        <div className="headerContainer">
            <img src={headerLogo} alt="header Logo" />
            <div>
               <Menu />
            </div>
        </div>
    );
};

export default Header;