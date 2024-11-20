import { useState } from "react";
import "./App.css";

import { Route, Routes, Outlet, Navigate } from "react-router-dom";

import { UiDemoPageForTest } from "./ui/pages/demo_page";
import { ObjectsPage } from "./ui/pages/objects_page";
import { ProjectsPage } from "./ui/pages/projects_page";

import NavBar from "./ui/navbar";

function App() {
    // @ts-ignore
    return (
        <>
            <NavBar />

            <Routes>
                {/* Содержимое element == страница */}
                <Route path="/for-dev" element={<UiDemoPageForTest />} />
                <Route path="/projects" element={<ProjectsPage />}/>
                    <Route path=":project_id" element={<div>Страница проекта</div>}/>
                <Route/>
                <Route path="/objects" element={<ObjectsPage />} />
                <Route
                    path="/hardware"
                    element={<div>Страница оборудования</div>}
                />
                <Route
                    path="/handbook"
                    element={<div>Страница справочников</div>}
                />
                <Route
                    path="/change-history"
                    element={<div>Страница истории изменений</div>}
                />
                <Route
                    path="/users"
                    element={<div>Страница пользователей</div>}
                />
                <Route path="/search" element={<div>Страница поиска</div>} />

                {/* Для невалидного пути будет открываться первая страница - проекты */}
                <Route
                    path="*"
                    element={<Navigate to="/projects" replace={true} />}
                />
            </Routes>

            {/* В Outlet подставляется текущая страница */}
            <Outlet />
        </>
    );
}

export default App;
