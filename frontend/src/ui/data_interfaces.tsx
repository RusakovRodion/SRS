export interface Project {
    id: number;
    name: string;
    description: string;
    added: string;
    type_id: number;
    hardwares: Hardware[];
}

export interface ProjectType {
    id: number;
    name: string;
}

export interface Object {
    id: number;
    name: string;
    description: string;
    project_id: number;
    registration_number: string;
    added: string;
    hardwares: Hardware[];
}

export interface Hardware {
    id: number;
    name: string;
    brand: string;
    model: string;
    description: string;
    added: string;
    type_id: number;
    chs: Hardware_ch[];
}

export interface Hardware_ch {
    ch_id: number;
    value: number;
    ums_id: number;
}

export interface HardwareType {
    id: number;
    name: string;
    chs: Characteristic[];
}

export interface Characteristic {
    id: number;
    name: string;
    ums: UM[];
}

export interface UM {
    id: number;
    name: string;
    accuracy: string;
}

export interface User {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    login: string;
    password: string;
    role_id: number;
    active: boolean;
    added: string;
}
