import { Project } from "../ui/data_interfaces";

export async function createProject(project: Project): Promise<void> {
    const response = await fetch("/api/project", {
        method: "POST",
        body: JSON.stringify(project),
    });
    if (!response.ok) {
        throw new Error(
            `Can't create project: ${response.status} ${response.statusText}`,
        );
    }
}

export async function getProjectByName(name: string): Promise<Project> {
    const response = await fetch(`/api/project/${name}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Can't get project by name: ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as Project;
}

export async function getProjectById(id: number): Promise<Project> {
    const response = await fetch(`/api/project/${id}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Can't get project by id ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as Project;
}

export async function updateProject(project: Project): Promise<void> {
    const response = await fetch(`/api/project/${project.id}`, {
        method: "POST",
        body: JSON.stringify(project),
    });
    if (!response.ok) {
        throw new Error(
            `Can't update project: ${response.status} ${response.statusText}`,
        );
    }
}

export async function deleteProjectById(id: number): Promise<void> {
    const response = await fetch(`/api/project/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(
            `Can't delete project by id ${response.status} ${response.statusText}`,
        );
    }
}

export async function getProjects(): Promise<Project[]> {
    const response = await fetch(`/api/projects`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Can't get projects: ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as Project[];
}
