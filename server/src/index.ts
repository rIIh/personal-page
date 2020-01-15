import 'reflect-metadata';
import { createGraphQLSchema } from './graphql';
import { createConnection } from 'typeorm';
import { Todo } from './graphql/entities/todo';
import fastify = require('fastify');

require('dotenv').config({ path: require('find-config')('.env') });
const PORT = process.env.SERVER_PORT || '4000';
const CLIENT_PORT = process.env.CLIENT_PORT || '3000';
const dev = process.env.NODE_ENV !== 'production';

async function main() {
    console.log('Creating ORM connection');
    await createConnection({
        type: 'sqlite',
        database: './db.sqlite',
        entities: [Todo],
        logging: dev,
        synchronize: true,
    });

    console.log('Creating GraphQL schema');
    const schema = await createGraphQLSchema();

    console.log('Creating Fastify application');
    const app = fastify({
        logger: dev ? 'debug' : 'silent',
    });

    app.register(require('fastify-cors'), {
        origin: 'http://localhost:' + CLIENT_PORT,
    });

    app.get('/', ((request, reply) => {
        reply.send('Hello world');
    }));

    app.register(require('fastify-gql'), {
        schema,
        routes: true,
        graphiql: true,
        errorHandler: (err, req, res) => {
            res.status(400).send(err);
            console.error(err);
        },
        jit: 1,
    });

    app.listen(parseInt(PORT), '0.0.0.0', ((err, address) => console.log('GraphQL Server listen on port ' + address)));
}

main().then(() => {});
