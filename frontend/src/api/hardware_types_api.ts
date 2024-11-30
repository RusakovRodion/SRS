import { HardwareType } from "../ui/data_interfaces";

export async function createHardwareType(
    hardwareType: HardwareType,
): Promise<void> {
    const response = await fetch("/api/hardware_type", {
        method: "POST",
        body: JSON.stringify(hardwareType),
    });
    if (!response.ok) {
        throw new Error(
            `Can't create hardware type: ${response.status} ${response.statusText}`,
        );
    }
}

export async function getHardwareTypeById(id: number): Promise<HardwareType> {
    const response = await fetch(`/api/hardware_type/${id}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Can't get hardware type by id ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as HardwareType;
}

export async function updateHardwareType(
    hardwareType: HardwareType,
): Promise<void> {
    const response = await fetch(`/api/hardware_type/${hardwareType.id}`, {
        method: "POST",
        body: JSON.stringify(hardwareType),
    });
    if (!response.ok) {
        throw new Error(
            `Can't update hardware type: ${response.status} ${response.statusText}`,
        );
    }
}

export async function deleteHardwareTypeById(id: number): Promise<void> {
    const response = await fetch(`/api/hardware_type/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(
            `Can't delete hardware type by id ${response.status} ${response.statusText}`,
        );
    }
}
