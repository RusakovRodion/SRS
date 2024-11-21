import { Link, useLocation } from "react-router-dom";
import {
    nav_link,
    nav_link_current,
    nav_bar,
    nav_links_container,
    dropdown_container,
    dropdown_items,
} from "./navigation.module.css";
import { User } from "react-feather";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";

export interface NavLinkProps {
    location: string;
    text: string;
}

export function NavLink({ location, text }: NavLinkProps) {
    const currentLocation = useLocation();
    console.log(currentLocation.pathname);

    return (
        <Link
            to={location}
            className={clsx(
                nav_link,
                location == currentLocation.pathname && nav_link_current,
            )}
        >
            {text}
        </Link>
    );
}

export default function NavBar() {
    const container = useRef();
    const [dropdownState, setDropdownState] = useState({ open: false });

    const handleDropdownClick = () => setDropdownState({ open: !dropdownState.open });
    const handleClickOutside = (e) => {
         if (container.current && !container.current.contains(e.target)) {
         setDropdownState({ open: false });
         }
         };

     useEffect(() => {
     document.addEventListener("mousedown", handleClickOutside);
     // optionally returning a func in useEffect runs like componentWillUnmount to cleanup
     return () => document.removeEventListener("mousedown", handleClickOutside);
     }, []);
    return (
        <nav className={nav_bar}>
            <div className={nav_links_container}>
                <NavLink location={"/projects"} text={"Проекты"} />
                <NavLink location={"/objects"} text={"Объекты"} />
                <NavLink location={"/hardwares"} text={"Оборудование"} />
                <div className={dropdown_container} ref={container} onClick={handleDropdownClick}>
                  <NavLink location={''} text={"Справочники"}/>
                {dropdownState.open && (
                <div className={dropdown_items}>
                    <NavLink location={'/handbook/project_types'} text={"Типы проектов"}/>
                    <NavLink location={'/handbook/hardware_types'} text={"Типы оборудования"}/>
                    <NavLink location={'/handbook/characteristics'} text={"Характеристики"}/>
                    <NavLink location={'/handbook/values'} text={"Единицы измерения"}/>
                </div>
                  )}
                </div>
                <NavLink
                    location={"/change-history"}
                    text={"История изменений"}
                />
                <NavLink location={"/users"} text={"Пользователи"} />
                <NavLink location={"/search"} text={"Поиск"} />
                <NavLink
                    location={"/for-dev"}
                    text={"TEMP: ДЛЯ РАЗРАБОТЧИКОВ"}
                />
            </div>
            <div className={nav_links_container}>
                <User size={32} />
            </div>
        </nav>
    );
}
