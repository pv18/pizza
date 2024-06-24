export interface IProfile {
    id: number;
    email: string;
    passwordHash: string;
    address: string;
    name: string;
    restoreToken: null | string;
    phone: string;
}
