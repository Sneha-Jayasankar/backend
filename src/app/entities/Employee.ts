import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./Abstract";
import { Department } from "./Department";

@Entity("employee")
    export class Employee extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        
        @Column({ nullable: false })
        public name: string;

        @ManyToOne(() => Department, { cascade: true })

        @JoinColumn()
        public department: Department;

        @Column({ nullable: false })
        public departmentId: string;
}