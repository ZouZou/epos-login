import { Agent } from "./agent";

export interface User {
    id?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    changePassword?: boolean;
    agents?: Agent[];
}
