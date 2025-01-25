import { BaseAppEntity } from "src/shared/utils/app-base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sample extends BaseAppEntity {
    @PrimaryGeneratedColumn({ name: 'sample_row_id' })
    rowId!: number;

    @Column({ length: 200, name: 'name', unique: true })
    name!: string;

}
