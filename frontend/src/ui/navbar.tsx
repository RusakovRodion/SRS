import { Link, useLocation } from "react-router-dom";
import {
    nav_link,
    nav_link_current,
    nav_bar,
    nav_links_container,
} from "./navigation.module.css";
import { User } from "react-feather";
import clsx from "clsx";

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
    return (
        <nav className={nav_bar}>
            <div className={nav_links_container}>
                <NavLink location={"/projects"} text={"Проекты"} />
                <NavLink location={"/objects"} text={"Объекты"} />
                <NavLink location={"/hardware"} text={"Оборудование"} />
                <NavLink location={"/handbook"} text={"Справочники"} />
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
