import { BaseUser } from "./base-user.model";

export interface UserDetails extends BaseUser {
    quotes: {
        [likes: number]: string[];
    };
}