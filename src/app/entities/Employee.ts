import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("employee")
    export class Employee extends BaseEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: false })
        public name: string;
}