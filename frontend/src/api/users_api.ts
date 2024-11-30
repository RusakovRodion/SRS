import { User } from "../ui/data_interfaces";

/**
 * Авторизация на базе cookies будет сразу же обработана fetch-ем,
 * соблюдаем стандарты и всё будет работать из коробки :)
 */

export async function createUser(user: User): Promise<void> {
    const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error(
            `Can't create user: ${response.status} ${response.statusText}`,
        );
    }
}

export async function login(login: string, password: string): Promise<void> {
    const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    });
    if (!response.ok) {
        throw new Error(
            `Can't login: ${response.status} ${response.statusText}`,
        );
    }
}

export async function logout(login: string, password: string): Promise<void> {
    const response = await fetch("/api/user/logout", {
        method: "POST",
    });
    if (!response.ok) {
        throw new Error(
            `Can't logout: ${response.status} ${response.statusText}`,
        );
    }
}

export async function getUserById(id: number): Promise<User> {
    const response = await fetch(`/api/user/${id}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error(
            `Can't get user by id: ${response.status} ${response.statusText}`,
        );
    }

    const json = await response.json();
    return json as User;
}

export async function updateUser(user: User): Promise<void> {
    const response = await fetch(`/api/user/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error(
            `Can't update user: ${response.status} ${response.statusText}`,
        );
    }
}

export async function deleteUserById(id: number): Promise<void> {
    const response = await fetch(`/api/user/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(
            `Can't delete user by id: ${response.status} ${response.statusText}`,
        );
    }
}
