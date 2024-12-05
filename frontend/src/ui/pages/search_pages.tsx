import { useState } from "react";
import {
    search_controls,
    search_input,
    search_mode_controls,
} from "./search_page.module.css";
import { useQuery } from "@tanstack/react-query";
import {
    searchHardware,
    searchObjects,
    searchProjects,
} from "../../api/search_api";
import { ErrorBanner, LoadingBanner } from "../status_banner";
import { table, table_row } from "../tables.module.css";
import { characteristics } from "../fake_backend_data";
import { getCharacteristics } from "../../api/characteristics_api";

export function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const characteristicsQuery = useQuery({
        queryKey: ["characteristics"],
        queryFn: getCharacteristics,
    });

    const hardwareQuery = useQuery({
        queryKey: ["hardware_search", searchQuery],
        queryFn: () => searchHardware(searchQuery),
    });

    const objectsQuery = useQuery({
        queryKey: ["objects_search", searchQuery],
        queryFn: () => searchObjects(searchQuery),
    });

    const projectsQuery = useQuery({
        queryKey: ["projects_search", searchQuery],
        queryFn: () => searchProjects(searchQuery),
    });

    if (
        hardwareQuery.error ||
        objectsQuery.error ||
        projectsQuery.error ||
        characteristicsQuery.error
    ) {
        console.error(hardwareQuery.error);
        return <ErrorBanner />;
    }

    if (characteristicsQuery.isLoading) {
        return <LoadingBanner />;
    }

    const hardwares = hardwareQuery.data ?? [];
    const objects = objectsQuery.data ?? [];
    const projects = projectsQuery.data ?? [];
    const characteristics = characteristicsQuery.data ?? [];

    return (
        <div className="content">
            <div className={search_controls}>
                <div>
                    <h1>Поиск</h1>
                    <input
                        className={search_input}
                        placeholder="Поиск"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className={search_mode_controls}>
                    <h2>Тип поиск</h2>
                </div>
            </div>

            {hardwares.length > 0 && (
                <>
                    <h3>Найдено оборудование:</h3>
                    <table className={table}>
                        {hardwares.map((hardware) => (
                            <tr key={hardware.id} className={table_row}>
                                <td>{hardware.type}</td>
                                <td>{hardware.name}</td>
                                <td>{hardware.description}</td>
                                <td>
                                    <ul>
                                        {hardware.characteristics.map(
                                            (characteristic) => {
                                                const characteristicObject =
                                                    characteristics.find(
                                                        (c) =>
                                                            c.id ==
                                                            characteristic.characteristic_id,
                                                    );
                                                return (
                                                    <li>
                                                        {
                                                            characteristicObject?.name
                                                        }
                                                        :{" "}
                                                        {
                                                            characteristic.characteristic_value
                                                        }
                                                    </li>
                                                );
                                            },
                                        )}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </table>
                </>
            )}

            {objects.length > 0 && (
                <>
                    <h3>Найдены объекты:</h3>
                    <table className={table}>
                        {objects.map((object) => (
                            <tr key={object.id} className={table_row}>
                                <td>{object.name}</td>
                                <td>{object.description}</td>
                                <td>{object.registration_number}</td>
                                <td>
                                    <ul>
                                        {object.hardware.map((hardware) => {
                                            return (
                                                <li>
                                                    {hardware.type}{" "}
                                                    {hardware.name}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </table>
                </>
            )}

            {projects.length > 0 && (
                <>
                    <h3>Найдены проекты:</h3>
                    <table className={table}>
                        {projects.map((project) => (
                            <tr key={project.id} className={table_row}>
                                <td>{project.type}</td>
                                <td>{project.name}</td>
                                <td>{project.description}</td>
                                <td>
                                    <ul>
                                        {project.hardware.map((hardware) => {
                                            return (
                                                <li>
                                                    {hardware.type}{" "}
                                                    {hardware.name}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </table>
                </>
            )}
        </div>
    );
}
