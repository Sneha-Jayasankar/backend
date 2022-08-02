import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./Abstract";
import { Department } from "./Department";

@Entity("employee")
    export class Employee extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        
        @Column({ nullable: false })
        public name: string;

        @Column({ nullable: true })
        public joiningdate: string;

        @Column({ nullable: true })
        public role: string;

        @Column({ nullable: true })
        public status: string;

        @Column({ nullable: true })
        public experience: number;

        // @Column({ nullable: true })
        // public username: string;

        // @Column({ nullable: true })
        // public password: string;

        @ManyToOne(() => Department, { cascade: true })
            @JoinColumn()
            public department: Department;

            @Column({ nullable: false })
            public departmentId: string;

}