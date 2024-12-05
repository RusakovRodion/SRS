import { Object } from "../ui/data_interfaces";

export async function createObject(object: Object): Promise<void> {
    const response = await fetch("/api/object", {
        method: "POST",
        body: JSON.stringify(object),
    });
    if (!response.ok) {
        throw new Error(
            `Can't create object: ${response.status} ${response.statusText}`,
        );
    }
}

export async function getObjectByName(name: string): Promise<Object> {
    const response = await fetch(`/api/object/${name}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Can't get object by name: ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as Object;
}

export async function getObjectById(id: number): Promise<Object> {
    const response = await fetch(`/api/object/${id}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Can't get object by id ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as Object;
}

export async function updateObject(object: Object): Promise<void> {
    const response = await fetch(`/api/object/${object.id}`, {
        method: "POST",
        body: JSON.stringify(object),
    });
    if (!response.ok) {
        throw new Error(
            `Can't update object: ${response.status} ${response.statusText}`,
        );
    }
}

export async function deleteObjectById(id: number): Promise<void> {
    const response = await fetch(`/api/object/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(
            `Can't delete object by id ${response.status} ${response.statusText}`,
        );
    }
}

export async function getObjects(): Promise<Object[]> {
    const response = await fetch(`/api/objects`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Can't get objects ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as Object[];
}
