import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column()
    public lastname: string;

    @Column()
    public firstname: string;
}
