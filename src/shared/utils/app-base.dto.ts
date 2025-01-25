export abstract class BaseAppDTO {
    
    createdBy!: string;

    createdAt!: Date;

    updatedAt?: Date;

    updatedBy?: string;

    isActive?: boolean;
}