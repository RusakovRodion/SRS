import "./App.css";

import { Route, Routes, Outlet, Navigate, useNavigate } from "react-router-dom";

import { UiDemoPageForTest } from "./ui/pages/demo_page";
import { ProjectInfoPage } from "./ui/pages/project_info_page";
import * as fake_data from "./ui/fake_backend_data";

import NavBar from "./ui/navbar";
import { ProjectsPage } from "./ui/pages/projects_page";
import { ObjectsPage } from "./ui/pages/objects_page";
import { HardwarePage } from "./ui/pages/hardware_page";
import { ProjectTypesPage } from "./ui/pages/project_types_page";
import { HardwareTypesPage } from "./ui/pages/hardware_types_page";
import { CharacteristicsPage } from "./ui/pages/characteristics_page";
import { UnitsPage } from "./ui/pages/units_page";
import { AddProjectForm } from "./ui/pages/add_project_form";
import { useState } from "react";

function App() {
    const navigate = useNavigate();

    const [fakeProjects, setFakeProjects] = useState(fake_data.projects);

    return (
        <>
            <NavBar />

            <Routes>
                {/* Содержимое element == страница */}
                <Route path="/for-dev" element={<UiDemoPageForTest />} />
                <Route
                    path="/projects"
                    element={
                        <ProjectsPage
                            projectsList={fakeProjects}
                            onAdd={() => {
                                navigate("/projects/add");
                            }}
                            onView={(projectId: number) => {
                                navigate(`/projects/${projectId}`);
                            }}
                        />
                    }
                />
                <Route
                    path="/projects/:project_id"
                    element={<ProjectInfoPage projects={fakeProjects} />}
                />
                <Route
                    path="/projects/add"
                    element={
                        <AddProjectForm
                            onAdd={(newProject) => {
                                console.log("new project", newProject);
                                const fakeDataNewID =
                                    Math.max(
                                        ...fakeProjects.map(
                                            (project) => project.id,
                                        ),
                                    ) + 1;
                                newProject.id = fakeDataNewID;
                                newProject.added = "";

                                setFakeProjects(
                                    fakeProjects.concat([newProject]),
                                );

                                navigate("/projects");
                            }}
                            projectTypes={fake_data.project_types}
                        />
                    }
                />
                <Route />
                <Route
                    path="/objects"
                    element={
                        <ObjectsPage
                            objectsList={fake_data.objects}
                            onAdd={() => navigate("/objects/add")}
                            onView={(objectId: number) =>
                                navigate(`/objects/${objectId}`)
                            }
                        />
                    }
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
                    element={
                        <HardwarePage
                            hardwareList={fake_data.hardwares}
                            onAdd={() => navigate("/hardwares/add")}
                            onView={(hardwareId: number) =>
                                navigate(`/hardwares/${hardwareId}`)
                            }
                        />
                    }
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
                    element={
                        <ProjectTypesPage
                            projectTypesList={fake_data.project_types}
                            onAdd={() =>
                                navigate("/handbook/project_types/add")
                            }
                            onView={(projectTypeId: number) =>
                                navigate(
                                    `/handbook/project_types/${projectTypeId}`,
                                )
                            }
                        />
                    }
                />
                <Route
                    path="/handbook/project_types/:project_type_id"
                    element={<div>Тип проекта</div>}
                />
                <Route />
                <Route
                    path="/handbook/hardware_types"
                    element={
                        <HardwareTypesPage
                            hardwareTypesList={fake_data.hardware_types}
                            onAdd={() =>
                                navigate("/handbook/hardware_types/add")
                            }
                            onView={(hardwareTypeId: number) =>
                                navigate(
                                    `/handbook/hardware_types/${hardwareTypeId}`,
                                )
                            }
                        />
                    }
                />
                <Route
                    path="/handbook/hardware_types/:hardware_type_id"
                    element={<div>Тип оборудования</div>}
                />
                <Route />
                <Route
                    path="/handbook/characteristics"
                    element={
                        <CharacteristicsPage
                            characteristicList={fake_data.characteristics}
                            onAdd={() =>
                                navigate("/handbook/characteristics/add")
                            }
                            onView={(characteristicId: number) =>
                                navigate(
                                    `/handbook/characteristics/${characteristicId}`,
                                )
                            }
                        />
                    }
                />
                <Route
                    path="/handbook/characteristics/:characteristic_id"
                    element={<div>Хар-ка</div>}
                />
                <Route />
                <Route
                    path="/handbook/values"
                    element={
                        <UnitsPage
                            unitsList={fake_data.ums}
                            onAdd={() => navigate("/handbook/values/add")}
                            onView={(unitId: number) =>
                                navigate(`/handbook/values/${unitId}`)
                            }
                        />
                    }
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
