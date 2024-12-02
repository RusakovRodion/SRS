import "./App.css";

import { Route, Routes, Outlet, Navigate, useNavigate } from "react-router-dom";

import { UiDemoPageForTest } from "./ui/pages/demo_page";
import { ProjectInfoPage } from "./ui/pages/project_info_page";
import * as fake_data from "./ui/fake_backend_data";

import NavBar from "./ui/navbar";
import { ProjectsPage } from "./ui/pages/projects_page";
import { ObjectsPage, AddObjectForm, ObjectInfoPage } from "./ui/pages/objects_page";
import {AddHardwareForm, HardwarePage } from "./ui/pages/hardware_page";
import { ProjectTypesPage, PtInfoPage } from "./ui/pages/project_types_page";
import { HardwareTypesPage, HtInfoPage } from "./ui/pages/hardware_types_page";
import { CharacteristicsPage, CharacteristicsInfoPage } from "./ui/pages/characteristics_page";
import { UnitsPage } from "./ui/pages/units_page";
import { AddProjectForm } from "./ui/pages/add_project_form";
import { AddChForm } from "./ui/pages/add_characteristic_form";
import { AddHtForm } from "./ui/pages/add_hardware_type";
import { useState } from "react";

function App() {
    const navigate = useNavigate();

    const [fakeProjects, setFakeProjects] = useState(fake_data.projects);
    const [fakeObjects, setfakeObjects] = useState(fake_data.objects);
    const [fakeUMs, setfakeUMs] = useState(fake_data.ums);
    const [fakeChs, setfakeChs] = useState(fake_data.characteristics);
    const [fakeHts, setfakeHts] = useState(fake_data.hardware_types);
    const [fakeHardwares, setfakeHardwares] = useState(fake_data.hardwares);
    const [fakePts, setfakePts] = useState(fake_data.project_types);
    
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
                            pts={fakePts}
                            onAdd={() => {
                                navigate("/projects/add");
                            }}
                            onView={(projectId: number) => {
                                navigate(`/projects/${projectId}`);
                            }}
                            onEdit={(projectId: number) =>
                                navigate("/projects/add",  { state: { id:projectId} })
                            }
                            onDelete={(projectId: number) => {
                                let index = fakeProjects.findIndex(d => d.id === projectId)
                                fakeProjects.splice(index, 1)
                                console.log('delete project with id ', index)
                                navigate('/projects')
                            }}
                        />
                    }
                />
                <Route
                    path="/projects/:project_id"
                    element={<ProjectInfoPage projects={fakeProjects} objects={fakeObjects} hts={fakeHts} pts={fakePts}/>}
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
                            onEdit={(newProject) =>{
                                let index = fakeProjects.findIndex(d => d.id === newProject.id)
                                fakeProjects[index] = newProject
                                navigate('/projects')
                                console.log(fakeProjects)
                            }}
                            projectTypes={fakePts}
                            objectsList={fakeObjects}
                            projectsList={fakeProjects}
                        />
                    }
                />
                <Route />
                <Route
                    path="/objects"
                    element={
                        <ObjectsPage
                            objectsList={fakeObjects}
                            projectsList={fakeProjects}
                            onAdd={(prId) => navigate("/objects/add", { state: { id:prId} })}
                            onEdit={(objId) => navigate("/objects/add", { state: { objId: objId} })}
                            onView={(objectId: number) =>
                                navigate(`/objects/${objectId}`)
                            }
                            onDelete={(objId) =>{
                                let index = fakeObjects.findIndex(d => d.id === objId)
                                fakeObjects.splice(index, 1)
                                console.log('delete object with id ', index)
                                navigate('/objects')
                            }
                            }
                        />
                    }
                />
                <Route
                    path="/objects/:object_id"
                    element={<ObjectInfoPage
                        objects={fakeObjects}
                        projects={fakeProjects}
                        hts={fakeHts}
                    />}
                />
                <Route
                    path="/objects/add"
                    element={
                        <AddObjectForm
                            onAdd={(newObject) => {
                                console.log("new object", newObject);
                                const fakeDataNewID =
                                    Math.max(
                                        ...fakeObjects.map(
                                            (object) => object.id,
                                        ),
                                    ) + 1;
                                newObject.id = fakeDataNewID;
                                newObject.added = "";

                                setfakeObjects(
                                    fakeObjects.concat([newObject]),
                                );

                                 navigate('/objects')
                            }}
                            onEdit={(newObject) =>{
                                let index = fakeObjects.findIndex(d => d.id === newObject.id)
                                fakeObjects[index] = newObject
                                navigate('/objects')
                                console.log(fakeObjects)
                            }}
                            projects={fakeProjects}
                            objects={fakeObjects}
                        />
                    }
                />
                <Route />
                <Route
                    path="/hardwares"
                    element={
                        <HardwarePage
                            hardwareList={fakeHardwares}
                            onAdd={(htId) => navigate("/hardwares/add", { state: { htId:htId} })}
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
                    element={<AddHardwareForm
                        onAdd={()=>console.log("d")}
                        onEdit={()=>console.log("d")}
                        projects={fakeProjects}
                        objects={fakeObjects}
                        hardwares={fakeHardwares}
                        characteristics={fakeChs}
                        />
                    }
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
                            projectTypesList={fakePts}
                            onAdd={(newPt) => {
                                const fakeDataNewID =
                                    Math.max(
                                        ...fakePts.map(
                                            (pt) => pt.id,
                                        ),
                                    ) + 1;
                                newPt.id = fakeDataNewID;

                                setfakePts(
                                    fakePts.concat([newPt]),
                                );
                                navigate('/handbook/project_types')
                                console.log(fakePts)
                            }}
                            onEdit={(ptId: number, newPt) =>{
                                let index = fakePts.findIndex(d => d.id === ptId)
                                newPt.id = ptId
                                fakePts[index] = newPt
                                console.log(fakePts);
                            }}
                            onDelete={(ptId: number) => {
                                let index = fakePts.findIndex(d => d.id === ptId)
                                fakePts.splice(index, 1)
                                console.log('delete unit with id ', index)
                                navigate('/handbook/project_types')
                            }}
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
                    element={<PtInfoPage pts={fakePts} projectList={fakeProjects} />}
                />
                <Route />
                <Route
                    path="/handbook/hardware_types"
                    element={
                        <HardwareTypesPage
                            hardwareTypesList={fakeHts}
                            hardwareList={fakeHardwares}
                            onAdd={() =>
                                navigate("/handbook/hardware_types/add")
                            }
                            onView={(hardwareTypeId: number) =>
                                navigate(
                                    `/handbook/hardware_types/${hardwareTypeId}`,
                                )
                            }
                            onEdit={(hardwareTypeId: number) =>
                                navigate("/handbook/hardware_types/add",  { state: { id:hardwareTypeId} })
                            }
                            onDelete={(hardwareTypeId: number) => {
                                let index = fakeHts.findIndex(d => d.id === hardwareTypeId)
                                fakeHts.splice(index, 1)
                                console.log('delete ht with id ', index)
                                navigate('/handbook/hardware_types')
                            }}
                        />
                    }
                />
                <Route
                    path="/handbook/hardware_types/:hardware_type_id"
                    element={<HtInfoPage hts={fakeHts} hardwareList={fakeHardwares} />}
                />
                 <Route
                    path="/handbook/hardware_types/add"
                    element={
                        <AddHtForm
                            htList={fakeHts}
                            hardwareList={fakeHardwares}
                            onAdd={(newHt) => {
                                const fakeDataNewID =
                                    Math.max(
                                        ...fakeHts.map(
                                            (ht) => ht.id,
                                        ),
                                    ) + 1;
                                newHt.id = fakeDataNewID;

                                setfakeHts(
                                    fakeHts.concat([newHt]),
                                );
                                navigate('/handbook/hardware_types')
                                console.log(fakeHts)
                            }}
                            onEdit={(newHt) =>{
                                let index = fakeHts.findIndex(d => d.id === newHt.id)
                                fakeHts[index] = newHt
                                navigate('/handbook/hardware_types')
                                console.log(fakeChs);
                            }
                        }
                        />
                    }
                />
                <Route />
                <Route
                    path="/handbook/characteristics"
                    element={
                        <CharacteristicsPage
                            characteristicList={fakeChs}
                            onAdd={() => {
                                navigate("/handbook/characteristics/add");
                            }}
                            onView={(characteristicId: number) =>
                                navigate(
                                    `/handbook/characteristics/${characteristicId}`,
                                )
                            }
                            onEdit={(characteristicId: number) => {
                                navigate('/handbook/characteristics/add', { state: { id:characteristicId} })
                            }}
                            onDelete={(characteristicId: number) => {
                                let index = fakeChs.findIndex(d => d.id === characteristicId)
                                fakeChs.splice(index, 1)
                                console.log('delete characteristic with id ', index)
                                navigate('/handbook/characteristics')
                            }
                        }
                        />
                    }
                />
                <Route
                    path="/handbook/characteristics/:characteristic_id"
                    element={<CharacteristicsInfoPage chs={fakeChs} />}
                />
                <Route
                    path="/handbook/characteristics/add"
                    element={
                        <AddChForm
                            characteristicList={fakeChs}
                            onAdd={(newCh) => {
                                const fakeDataNewID =
                                    Math.max(
                                        ...fakeChs.map(
                                            (ch) => ch.id,
                                        ),
                                    ) + 1;
                                newCh.id = fakeDataNewID;

                                setfakeChs(
                                    fakeChs.concat([newCh]),
                                );
                                navigate('/handbook/characteristics')
                                console.log(fakeChs)
                            }}
                            onEdit={(newCh) =>{
                                let index = fakeChs.findIndex(d => d.id === newCh.id)
                                fakeChs[index] = newCh
                                navigate('/handbook/characteristics')
                                console.log(fakeChs);
                            }
                        }
                        />
                    }
                />
                <Route />
                <Route
                    path="/handbook/values"
                    element={
                        <UnitsPage
                            unitsList={fakeUMs}
                            onAdd={(newUM) => {
                                const fakeDataNewID =
                                    Math.max(
                                        ...fakeUMs.map(
                                            (um) => um.id,
                                        ),
                                    ) + 1;
                                newUM.id = fakeDataNewID;

                                setfakeUMs(
                                    fakeUMs.concat([newUM]),
                                );
                                navigate('/handbook/values')
                                console.log(fakeUMs)
                            }}
                            onEdit={(unitId: number, newUM) =>{
                                let index = fakeUMs.findIndex(d => d.id === unitId)
                                newUM.id = unitId
                                fakeUMs[index] = newUM
                                console.log(fakeUMs);
                            }}
                            onDelete={(unitId: number) => {
                                let index = fakeUMs.findIndex(d => d.id === unitId)
                                fakeUMs.splice(index, 1)
                                console.log('delete unit with id ', index)
                                navigate('/handbook/values')
                            }
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
