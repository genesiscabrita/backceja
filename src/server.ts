import fastify from "fastify";
import { app } from "./app";
import blipp from "fastify-blipp";
import { PORT } from "./config";

const server = fastify({
    disableRequestLogging: true,
    logger: {
        transport: {
            target: "pino-pretty",
            options: {
                translateTime: "HH:MM:ss Z",
                ignore: "pid,hostname",
            },
        },
    },
});

server.register(blipp);
server.register(app);

server
    .listen({
        port: parseInt(PORT),
        host: "0.0.0.0",
    })
    .then(() => {
        server.blipp();
    });