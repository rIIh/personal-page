import { TodoResolver } from './resolvers/todo_resolver';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import { makeExecutableSchema } from 'graphql-tools';

export async function createGraphQLSchema() {
    const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
        resolvers: [TodoResolver],
        validate: false,
        emitSchemaFile: './schema.graphql',
    });
    return makeExecutableSchema({ typeDefs, resolvers });
}
