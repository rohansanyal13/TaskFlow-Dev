import { User, UserProps } from '../models/User';

export class LoginHandler {
    private users: Map<string, User> = new Map();
    private emailToId: Map<string, string> = new Map();

    createAccount(props: Omit<UserProps, 'id'>): User {
        this.validateNewUser(props);
        const user = new User(props);
        this.users.set(user.id, user);
        this.emailToId.set(user.email.toLowerCase(), user.id);
        return user;
    }

    private validateNewUser(props: UserProps): void {
        if (!props.email || !this.isValidEmail(props.email)) {
            throw new Error('Invalid email format');
        }
        if (this.emailToId.has(props.email.toLowerCase())) {
            throw new Error('Email already exists');
        }
        if (!props.password || props.password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        if (!/[A-Z]/.test(props.password)) {
            throw new Error('Password must contain at least one uppercase letter');
        }
        if (!/[0-9]/.test(props.password)) {
            throw new Error('Password must contain at least one number');
        }
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    login(email: string, password: string): User {
        const userId = this.emailToId.get(email.toLowerCase());
        if (!userId) {
            throw new Error('User not found');
        }

        const user = this.users.get(userId);
        if (!user || !user.verifyPassword(password)) {
            throw new Error('Invalid credentials');
        }

        const updatedUser = new User({
            ...user.toJSON(),
            password,
            lastLogin: new Date()
        });
        this.users.set(userId, updatedUser);
        return updatedUser;
    }

    getUserByEmail(email: string): User | undefined {
        const userId = this.emailToId.get(email.toLowerCase());
        return userId ? this.users.get(userId) : undefined;
    }

    getAllUsers(): User[] {
        return Array.from(this.users.values());
    }
}