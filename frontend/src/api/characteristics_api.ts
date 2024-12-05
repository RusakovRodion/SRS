import { Characteristic } from "../ui/data_interfaces";

export async function createCharacteristic(
    characteristic: Characteristic,
): Promise<void> {
    const response = await fetch("/api/characteristics", {
        method: "POST",

        // NOTE: так-то тут есть лишнее поле "ums", но плохо оно никому не сделает :)
        body: JSON.stringify(characteristic),
    });
    if (!response.ok) {
        throw new Error(
            `Can't create characteristic: ${response.status} ${response.statusText}`,
        );
    }
}

export async function getCharacteristicById(
    id: number,
): Promise<Characteristic> {
    const response = await fetch(`/api/characteristics/${id}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Can't get characteristic by id ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as Characteristic;
}

export async function updateCharacteristic(
    characteristic: Characteristic,
): Promise<void> {
    const response = await fetch(`/api/characteristics/${characteristic.id}`, {
        method: "POST",

        // NOTE: см. коммент про ums выше
        body: JSON.stringify(characteristic),
    });
    if (!response.ok) {
        throw new Error(
            `Can't update characteristic: ${response.status} ${response.statusText}`,
        );
    }
}

export async function deleteCharacteristicById(id: number): Promise<void> {
    const response = await fetch(`/api/characteristics/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(
            `Can't delete characteristic by id ${response.status} ${response.statusText}`,
        );
    }
}

export async function getCharacteristics(): Promise<Characteristic[]> {
    const response = await fetch(`/api/characteristics`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Can't get characteristics ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as Characteristic[];
}
