export type User = {
    id: string,
    username: string,
    password: string,
}

export type UserWithoutId = {
    username: string,
    password: string,
}

export type UserWithoutPassword = {
    id: string,
    username: string,
}
