import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./Abstract";
import { Employee } from "./Employee";

@Entity("address")
    export class Address extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
    
        @Column({ nullable: true })
        public address_line1: string;

        @Column({ nullable: true })
        public address_line2: string;

        @Column({ nullable: true })
        public city: string;

        @Column({ nullable:true })
        public state: string;

        @Column({ nullable: true })
        public pin: number;

        // @OneToOne(()=> Employee,{cascade:true})
        //     @JoinColumn()
        //     public employee: Employee;
    
        //     @Column({nullable: true})
        //     public employee_id:string;

    }