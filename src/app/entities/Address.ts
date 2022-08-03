import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./Abstract";

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

    }