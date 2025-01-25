import { Column, CreateDateColumn, Generated, Index } from "typeorm";

export abstract class BaseAppEntity {

    @Column({ name: 'created_by', length: 50  })
    @Index()
    createdBy!: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    @Index()
    createdAt!: Date;

    @Column({ name: 'updated_at', nullable: true, type: 'timestamp' })
    @Index()
    updatedAt?: Date;

    @Column({ name: 'updated_by', length: 50, nullable: true })
    @Index()
    updatedBy?: string;

    @Column({ name: 'deleted_at', nullable: true, type: 'timestamp' })
    @Index()
    deletedAt?: Date;

    @Column({ name: 'deleted_by', length: 50, nullable: true })
    @Index()
    deletedBy?: string;

    @Column({ name: "uuid", type: "uuid", unique: true })
    @Generated("uuid")
    uuid!: string;

}
