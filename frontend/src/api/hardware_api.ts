import { Hardware } from "../ui/data_interfaces";

export async function createHardware(hardware: Hardware): Promise<void> {
    const response = await fetch("/api/hardware", {
        method: "POST",
        body: JSON.stringify(hardware),
    });
    if (!response.ok) {
        throw new Error(
            `Can't create hardware: ${response.status} ${response.statusText}`,
        );
    }
}

export async function getHardwareByBrand(brand: string): Promise<Hardware> {
    const response = await fetch(`/api/hardware/${brand}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Can't get hardware by name: ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as Hardware;
}

export async function getHardwareByModel(model: string): Promise<Hardware> {
    const response = await fetch(`/api/hardware/${model}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Can't get hardware by name: ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as Hardware;
}

export async function getHardwareById(id: number): Promise<Hardware> {
    const response = await fetch(`/api/hardware/${id}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Can't get hardware by id ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as Hardware;
}

export async function updateHardware(hardware: Hardware): Promise<void> {
    const response = await fetch(`/api/hardware/${hardware.id}`, {
        method: "POST",
        body: JSON.stringify(hardware),
    });
    if (!response.ok) {
        throw new Error(
            `Can't update hardware: ${response.status} ${response.statusText}`,
        );
    }
}

export async function deleteHardwareById(id: number): Promise<void> {
    const response = await fetch(`/api/hardware/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(
            `Can't delete hardware by id ${response.status} ${response.statusText}`,
        );
    }
}

export async function getHardwares(): Promise<Hardware[]> {
    const response = await fetch(`/api/hardware`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Can't get hardware by id ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as Hardware[];
}
