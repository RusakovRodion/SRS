import * as type from "./data_interfaces";


export const ums: type.UM[] = [
    {
        id: 1,
        name: "км/ч",
        accuracy: "4",
    },
    {
        id: 2,
        name: "м/с",
        accuracy: "2",
    },
];


export const project_types: type.ProjectType[] = [
    {
        id: 1,
        name: "Грузовое судно",
    },
    {
        id: 2,
        name: "Трактор",
    },
    {
        id: 3,
        name: "Обычное судно",
    },
];

export const hardware_types: type.HardwareType[] = [
    {
        id: 1,
        name: "Двигатель",
    },
    {
        id: 2,
        name: "Штурвал",
    },
];

export const hardwares: type.Hardware[] = [
    {
        id: 1,
        name: "Engine1",
        brand: "Adidas",
        model: "Abrams",
        description: "lorem ipsum ",
        added: "",
        type_id: 1,
    },
    {
        id: 2,
        name: "Engine2",
        brand: "Adidas",
        model: "Gilios",
        description: "lorem ipsum ",
        added: "",
        type_id: 1,
    },
    {
        id: 3,
        name: "1",
        brand: "Abidas",
        model: "roundsfdsf",
        description: "lorem ipsum ",
        added: "",
        type_id: 2,
    },
];

export const projects: type.Project[] = [
    {
        id: 1,
        name: "project1",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        type_id: 1,
        added: "",
    },
    {
        id: 2,
        name: "project2",
        description: "",
        type_id: 2,
        added: "",
    },
    {
        id: 3,
        name: "project3",
        description: "",
        type_id: 1,
        added: "",
    },
    {
        id: 4,
        name: "project4",
        description: "",
        type_id: 2,
        added: "",
    },
];

export const objects: type.Object[] = [
    {
        id: 1,
        name: "object1",
        project_id: 1,
        registration_number: "hg12",
        added: "",
        description: "",
    },
    {
        id: 2,
        name: "object2",
        project_id: 3,
        registration_number: "hg112",
        added: "",
        description: "",
    },
];

export const characteristics: type.Characteristic[] = [
    {
        id: 1,
        name: "Мощность",
        ums: ums,
    },
    {
        id: 2,
        name: "Объем",
        ums: []
    },
];
