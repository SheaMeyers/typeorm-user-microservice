import {Unique, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
@Unique(["userName"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    userName: string;

    @Column('text')
    password: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    avatar:string;
}
