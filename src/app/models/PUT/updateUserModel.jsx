import { Role } from "@/lib/enums";

export class UpdateUserModel {
    constructor({ firstName, lastName, email, role, updated_at }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.updated_at = updated_at;
    }

    toJson() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            role: this.role,
            updated_at: this.updated_at,
        };
    }
}