// src/models/User.ts
export interface UserProps {
    id?: string;
    email: string;
    password: string;
    createdAt?: Date;
    lastLogin?: Date;
}

export class User {
    public readonly id: string;
    public readonly email: string;
    private readonly password: string; // Changed from #password to private
    public readonly createdAt: Date;
    public readonly lastLogin: Date;

    constructor(props: UserProps) {
        this.id = props.id || crypto.randomUUID();
        this.email = props.email;
        this.password = props.password;
        this.createdAt = props.createdAt || new Date();
        this.lastLogin = props.lastLogin || new Date();
    }

    // Method to verify password
    verifyPassword(password: string): boolean {
        return this.password === password;
    }

    // Method to get a safe copy of user data without password
    toJSON() {
        return {
            id: this.id,
            email: this.email,
            createdAt: this.createdAt,
            lastLogin: this.lastLogin
        };
    }
}