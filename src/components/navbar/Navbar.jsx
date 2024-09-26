"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "../Icons";
import { usePathname } from "next/navigation";

export const NavButt = (props) => {
    const { type, active, to, redirect = false, navClick } = props;
    let { buttonText } = props;

    const [, setLight] = useState(0);
    const setOff = () => setLight(0);
    const setOn = () => setLight(1);

    buttonText = buttonText !== undefined ? buttonText : type;
    const activeClass = active ? " active" : "";
    const disClass = active ? " disabled" : "";
    const onClick = (e) => {
        e.preventDefault();
        localStorage.setItem("navState", to);
        navClick();
    };
    const noClick = (e) => {
        e.preventDefault();
        localStorage.setItem("navState", to);
        navClick();
    };
    return (
        <div className={`btn btn-nav btn-inline ${activeClass} ${disClass}`}>
            <Link
                href={to}
                onClick={redirect ? onClick : noClick}
                onMouseOver={setOn}
                onMouseOut={setOff}
            >
                <div className="d-inline-block">
                    <Icon type={type} vb="0 0 184 184" />
                </div>
                <p>
                    {buttonText}
                    {/* {useContext(JediContext)} */}
                    {/* {fillColor} */}
                </p>
            </Link>
        </div>
    );
};
const NavApp = (props) => {
    const currentPage = usePathname();
    const getNavLinkClass = (path) => {
        return currentPage === path ? true : false;
    };
    const links = props.items.main.map((item, index) => {
        if (["/", "/anim"].includes(currentPage) && ["/", "/anim"].includes(item.link)) {
            return "";
        } else if (!item.public /*&& !isAuthenticated()*/) {
            return "";
        } else {
            return (
                <NavButt
                    to={item.link}
                    type={item.type || "portal"}
                    buttonText={item.title}
                    active={getNavLinkClass(item.link)}
                    key={index}
                    redirect={item.anim}
                    navClick={props.navClick}
                />
            );
        }
    });

    return links;
};

export default NavApp;
