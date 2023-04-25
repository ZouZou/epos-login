import { Agent } from "src/app/models/agent";
import { User } from "src/app/models/user";

export interface UserStateInterface {
    isLoading: boolean;
    user: User | null;
    error: string | null;
    selectedAgent: Agent | null;
    token: string | null;
}