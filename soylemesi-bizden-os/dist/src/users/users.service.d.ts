export declare class UsersService {
    private prisma;
    findByEmail(email: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        balance: import("@prisma/client/runtime/library").Decimal;
    }>;
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        balance: import("@prisma/client/runtime/library").Decimal;
    }>;
}
