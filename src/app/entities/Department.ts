import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("department")
    export class Department extends BaseEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: false })
        public name: string;
}