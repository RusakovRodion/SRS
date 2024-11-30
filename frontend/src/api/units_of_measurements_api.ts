import { UM } from "../ui/data_interfaces";

export async function createUnitOfMeasurement(um: UM): Promise<void> {
    const response = await fetch("/api/unit_of_measurement", {
        method: "POST",
        body: JSON.stringify(um),
    });
    if (!response.ok) {
        throw new Error(
            `Can't create unitOfMeasurement: ${response.status} ${response.statusText}`,
        );
    }
}

export async function getUnitOfMeasurementById(id: number): Promise<UM> {
    const response = await fetch(`/api/unit_of_measurement/${id}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Can't get unitOfMeasurement by id ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as UM;
}

export async function updateUnitOfMeasurement(um: UM): Promise<void> {
    const response = await fetch(`/api/unit_of_measurement/${um.id}`, {
        method: "POST",
        body: JSON.stringify(um),
    });
    if (!response.ok) {
        throw new Error(
            `Can't update unitOfMeasurement: ${response.status} ${response.statusText}`,
        );
    }
}

export async function deleteUnitOfMeasurementById(id: number): Promise<void> {
    const response = await fetch(`/api/unit_of_measurement/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(
            `Can't delete unitOfMeasurement by id ${response.status} ${response.statusText}`,
        );
    }
}
