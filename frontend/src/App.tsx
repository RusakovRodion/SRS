import { useState } from "react";
import "./App.css";

import { Route, Routes, Outlet, Navigate } from "react-router-dom";

import { UiDemoPageForTest } from "./ui/pages/demo_page";
import { ProjectInfoPage } from "./ui/pages/project_info_page"
import { EditProjectForm } from "./ui/pages/edit_project_form"
import { MainPage } from "./ui/pages/main_page"
import * as fake_data from './ui/fake_backend_data'
import * as type from'./ui/data_interfaces'

import NavBar from "./ui/navbar";

function App() {
    // @ts-ignore
    return (
        <>
            <NavBar />

            <Routes>
                {/* Содержимое element == страница */}
                <Route path="/for-dev" element={<UiDemoPageForTest />} />
                <Route path="/projects" element={MainPage<type.Project>("Проекты", "projects", fake_data.projects, ['name', 'type_id'])}/>
                    <Route path="/projects/:project_id" element={<ProjectInfoPage />}/>
                    <Route path="/projects/add" element={<EditProjectForm mode={'new'}/>}/>
                <Route/>
                <Route path="/objects" element={MainPage<type.Object>("Объекты", "objects", fake_data.objects, ['name', 'projectId',  'regNumber'])} />
                    <Route path="/objects/:objects_id" element={<div>Объект</div>}/>
                    <Route path="/objects/add" element={<div>Добавить объект</div>}/>
                <Route/>
                <Route path="/hardware" element={MainPage<type.Hardware>("Оборудование", "hardware", fake_data.hardwares, ['name', 'type', 'brand', 'model'])}/>
                    <Route path="/hardware/:hardware_id" element={<div>Оборудование</div>}/>
                    <Route path="/hardware/add" element={<div>Добавить оборудование</div>}/>
                <Route/>
                <Route path="/handbook" element={<div>Страница справочников</div>}/>
                    <Route path="/handbook/project_types" element={<div>Типы проектов</div>}/>
                    <Route path="/handbook/hardware_types" element={<div>Типы оборудования</div>}/>
                    <Route path="/handbook/characteristics" element={<div>Характеристики</div>}/>
                    <Route path="/handbook/values" element={<div>Единицы измерения</div>}/>
                <Route/>
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
