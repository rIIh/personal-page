import { Arg, Field, ID, InputType, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Todo } from '../entities/todo';

@InputType()
class TodoConstructor {
    @Field()
    title: string;
}

@Resolver(Todo)
export class TodoResolver {
    @Query(returns => [Todo])
    async todos() {
        return await Todo.find();
    }

    @Mutation(returns => Todo)
    async create(@Arg('todo') todo: TodoConstructor) {
        return await Todo.create(todo).save();
    }

    @Mutation(returns => Boolean)
    async remove(@Arg('id', returns => ID) id: number) {
        return (await Todo.delete(id)).affected > 0;
    }

    @Mutation(returns => Int)
    async rename(
        @Arg('id', returns => ID!)
        id: number,
         @Arg('title', returns => String!)
         title: string) {
        return (await Todo.update({ id },{ title }))?.affected ?? 0;
    }

    @Mutation(returns => Int, { nullable: true })
    async switchState(@Arg('id', returns => ID) id: number) {
        const todo = await Todo.findOne({ id });
        const result = await Todo.update(todo.id, { completed: !todo.completed });
        return result?.affected;
    }
}
