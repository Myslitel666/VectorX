export interface User {
    userId: number;
    username: string;
    userRole: string;
    avatar: string;
    browserId?: string;
    isBlocked: boolean;
    balance: number;
}