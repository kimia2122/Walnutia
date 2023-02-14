import React from "react";
import history from "../../History/history";

import "./menu-style.scss";
import menuicon from "../../Assets/svg/menuicon.svg";

const Menu = () => {
    return (
        <div className="nav">
            <input type="checkbox" className="nav__checkbox" id="navToggle"/>
            <label htmlFor="navToggle" className="nav__btn">
               <img src={menuicon} alt="menu icon" />
            </label>
                <nav className="nav__nav">
                    <ul className="nav__list">
                        <li className="nav__item"><a className="nav__link" onClick={() => {history.push("/")}}>خانه</a></li>
                        <li className="nav__item"><a className="nav__link" onClick={() => {history.push("/Profile-Employer")}}>پروفایل</a></li>
                        <li className="nav__item"><a className="nav__link" onClick={() => {history.push("/Order")}}>ثبت کار</a></li>
                        <li className="nav__item"><a className="nav__link" onClick={() => {history.push("/Login")}}>ثبت نام</a></li>
                        <li className="nav__item"><a className="nav__link" onClick={() => {history.push("/About-us")}}>درباره ما</a></li>
                    </ul>
                </nav>
        </div>
    );
};

export default Menu;