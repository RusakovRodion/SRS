export interface Project {
    id: number;
    name: string;
    description: string;
    added: string;
    type_id: number;
}

export interface ProjectType {
    id: number;
    name: string;
}

export interface Object {
    id: number;
    name: string;
    projectId: number;
    regNumber: string;
}

export interface Hardware {
    id: number;
    name: string;
    brand: string;
    model: string;
    description: string;
    added: string;
    type_id: number;
}

export interface HardwareType {
    id: number;
    name: string;
}

export interface Characteristic {
    id: number;
    name: string;
}

export interface UM {
    id: number;
    name: string;
    accuracy: string;
}
