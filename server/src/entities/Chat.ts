import { Field, Int, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity("chats")
export class Chat extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: true, nullable: false })
    chatId: string;

    @Field(() => Number, { nullable: false })
    @Column({ nullable: false })
    creatorId: number;

    @Field(() => User, { nullable: false })
    @ManyToOne(() => User, (user) => user.chats, { nullable: false, onDelete: "CASCADE" })
    creator: User;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    title: string;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;

    @Field(() => String, { nullable: false })
    @UpdateDateColumn({ nullable: false })
    updatedAt: Date;

    @Field(() => Number, { defaultValue: 0 })
    @Column({ default: 0 })
    messagesCount: number;

    @Field(() => [Message], { nullable: true, defaultValue: [] })
    @OneToMany(() => Message, (message) => message.chat, { nullable: true, cascade: true })
    messages: Message[];

    @Field(() => [Event], { nullable: true, defaultValue: [] })
    @OneToMany(() => Event, (event) => event.chat, { nullable: true, cascade: true })
    events: Event[];
}

@ObjectType()
@Entity("messages")
export class Message extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: true, nullable: false })
    messageId: string;

    @Field(() => Boolean)
    @Column()
    fromUser: boolean;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    isReplyTo: number;

    @Field(() => Chat)
    @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: "CASCADE" })
    chat: Chat;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    type: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    content: string;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;

    @Field(() => Boolean, { defaultValue: false })
    @Column({ default: false })
    isEdited: boolean;

    @Field(() => String, { nullable: false })
    @UpdateDateColumn({ nullable: false })
    updatedAt: Date;
}

@ObjectType()
@Entity("events")
export class Event extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    eventType: string;
    
    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    eventMessage: string;

    @Field(() => Boolean)
    @Column()
    fromUser: boolean;

    @Field(() => Chat)
    @ManyToOne(() => Chat, (chat) => chat.events, { onDelete: "CASCADE" })
    chat: Chat;
    
    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;
}
