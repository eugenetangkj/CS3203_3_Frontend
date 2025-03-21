export interface User {
    id: string,
    email: string,
    name: string,
    role: string,
    collectibles: string[]
}

export enum UserRoleEnum {
    Admin = 'Admin',
    Citizen = 'Citizen',
    None = 'None'
}