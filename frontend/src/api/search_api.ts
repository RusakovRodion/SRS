export interface HardwareSearchResult {
    id: number;
    name: number;
    type_id: 1;
    type: string;
    description: string;
    characteristics: {
        characteristic_id: number;
        characteristic_value: number;
    }[];
}

export async function searchHardware(
    query: string,
): Promise<HardwareSearchResult[]> {
    const queryParams = new URLSearchParams({
        query: query == "" ? " " : query,
    }).toString();

    const response = await fetch(`/api/search/hardware?${queryParams}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Search error: ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as HardwareSearchResult[];
}

export interface ObjectsSearchResult {
    id: number;
    name: number;
    description: string;
    registration_number: string;
    hardware: {
        hardware_id: number;
        description: string;
        name: string;
        type: string;
    }[];
}

export async function searchObjects(
    query: string,
): Promise<ObjectsSearchResult[]> {
    const queryParams = new URLSearchParams({
        query: query == "" ? " " : query,
    }).toString();

    const response = await fetch(`/api/search/objects?${queryParams}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Search error: ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as ObjectsSearchResult[];
}

export interface ProjectsSearchResult {
    id: number;
    name: number;
    type: string;
    description: string;
    hardware: {
        hardware_id: number;
        description: string;
        name: string;
        type: string;
    }[];
    characteristics: {
        characteristic_id: number;
        characteristic_value: number;
        unit: string;
    }[];
}

export async function searchProjects(
    query: string,
): Promise<ProjectsSearchResult[]> {
    const queryParams = new URLSearchParams({
        query: query == "" ? " " : query,
    }).toString();

    const response = await fetch(`/api/search/projects?${queryParams}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Search error: ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as ProjectsSearchResult[];
}
