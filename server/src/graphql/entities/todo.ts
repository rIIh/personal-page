import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Todo extends BaseEntity {
    @Field(returns => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Column({ default: false })
    @Field(() => Boolean)
    completed: boolean = false;
}
