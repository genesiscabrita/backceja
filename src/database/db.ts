import { FastifyPluginAsync } from "fastify";
import mongoose from "mongoose";
import { MONGODB } from "../config";

export const db_plugin: FastifyPluginAsync = async (app) => {
    app.log.info(`⚛️ Conectando a la base de datos...`);
    mongoose.connect(MONGODB).then(() => {
        app.log.info(`✅ Conectado a la base de datos: ${MONGODB}`);
    });
};