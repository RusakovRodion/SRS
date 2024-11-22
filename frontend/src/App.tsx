import "./App.css";

import { Route, Routes, Outlet, Navigate } from "react-router-dom";

import { UiDemoPageForTest } from "./ui/pages/demo_page";
import { ProjectInfoPage } from "./ui/pages/project_info_page";
import { EditProjectForm } from "./ui/pages/edit_project_form";
import { MainPage } from "./ui/pages/main_page";
import * as fake_data from "./ui/fake_backend_data";
import * as type from "./ui/data_interfaces";

import NavBar from "./ui/navbar";

function App() {
    return (
        <>
            <NavBar />

            <Routes>
                {/* Содержимое element == страница */}
                <Route path="/for-dev" element={<UiDemoPageForTest />} />
                <Route
                    path="/projects"
                    element={MainPage<type.Project>(
                        "Проекты",
                        "projects",
                        fake_data.projects,
                        ["name", "type_id"],
                    )}
                />
                <Route
                    path="/projects/:project_id"
                    element={<ProjectInfoPage />}
                />
                <Route
                    path="/projects/add"
                    element={<EditProjectForm mode={"new"} />}
                />
                <Route />
                <Route
                    path="/objects"
                    element={MainPage<type.Object>(
                        "Объекты",
                        "objects",
                        fake_data.objects,
                        ["name", "projectId", "regNumber"],
                    )}
                />
                <Route
                    path="/objects/:objects_id"
                    element={<div>Объект</div>}
                />
                <Route
                    path="/objects/add"
                    element={<div>Добавить объект</div>}
                />
                <Route />
                <Route
                    path="/hardwares"
                    element={MainPage<type.Hardware>(
                        "Оборудование",
                        "hardwares",
                        fake_data.hardwares,
                        ["name", "type", "brand", "model"],
                    )}
                />
                <Route
                    path="/hardwares/:hardware_id"
                    element={<div>Оборудование</div>}
                />
                <Route
                    path="/hardwares/add"
                    element={<div>Добавить оборудование</div>}
                />
                <Route />
                <Route
                    path="/handbook"
                    element={<div>Страница справочников</div>}
                />
                <Route
                    path="/handbook/project_types"
                    element={MainPage<type.ProjectType>(
                        "Типы проектов",
                        "handbook/project_types",
                        fake_data.project_types,
                        ["name"],
                    )}
                />
                <Route
                    path="/handbook/project_types/:project_type_id"
                    element={<div>Тип проекта</div>}
                />
                <Route />
                <Route
                    path="/handbook/hardware_types"
                    element={MainPage<type.HardwareType>(
                        "Типы оборудования",
                        "handbook/hardware_types",
                        fake_data.hardware_types,
                        ["name"],
                    )}
                />
                <Route
                    path="/handbook/hardware_types/:hardware_type_id"
                    element={<div>Тип оборудования</div>}
                />
                <Route />
                <Route
                    path="/handbook/characteristics"
                    element={MainPage<type.Characteristic>(
                        "Характеристики",
                        "handbook/characteristics",
                        fake_data.characteristics,
                        ["name"],
                    )}
                />
                <Route
                    path="/handbook/characteristics/:characteristic_id"
                    element={<div>Хар-ка</div>}
                />
                <Route />
                <Route
                    path="/handbook/values"
                    element={MainPage<type.UM>(
                        "Единицы измерения",
                        "handbook/values",
                        fake_data.ums,
                        ["name", "accuracy"],
                    )}
                />
                <Route
                    path="/handbook/values/:value_id"
                    element={<div>Единица измерения</div>}
                />
                <Route />
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
