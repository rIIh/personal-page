import next from 'next';
import express from 'express';
import proxy from 'http-proxy-middleware';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

const PORT = process.env.CLIENT_PORT || '3000';
const SERVER_PORT = process.env.SERVER_PORT || '4000';
const GRAPHQL_SERVICE = process.env.DOCKER_GRAPHQL_SERVICE || 'localhost';

console.log('GraphQL Service will be searched on: ', GRAPHQL_SERVICE);
app.prepare().then(() => {
    const server = express();

    server.get('*', (req, res) => {
        handle(req, res).then(() => {});
    });

    server.use('/graphql', proxy({
        target: `http://${GRAPHQL_SERVICE}:${SERVER_PORT}`,
        changeOrigin: true, logLevel: dev ? 'debug' : 'silent',
    }));

    server.listen(PORT, () => {
        console.log(`Client started on port ${PORT}`);
    });
});
