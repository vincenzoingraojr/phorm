import { Field, Int, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
} from "typeorm";
import { Chat } from "./Chat";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    firstName: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    lastName: string;

    @Field(() => String, { nullable: false })
    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Field(() => Boolean)
    @Column()
    emailVerified: boolean;

    @Field(() => String, { nullable: true, defaultValue: "" })
    @Column({ nullable: true, default: "" })
    profilePicture: string;
    
    @Column("int", { default: 0 })
    tokenVersion: number;

    @Field(() => [Chat], { nullable: true, defaultValue: [] })
    @OneToMany(() => Chat, (chat) => chat.creator, { nullable: true, cascade: true })
    chats: Chat[];
}
