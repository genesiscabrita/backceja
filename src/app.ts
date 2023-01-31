import fastifyCors from "@fastify/cors";
import { FastifyPluginAsync } from "fastify";
import { db_plugin } from "./database/db";
import { date_create } from "./routes/date/dateCreate";
import { date_delete } from "./routes/date/dateDelete";
import { date_Edit } from "./routes/date/dateEdit";
import { date_get } from "./routes/date/dateGet";
import { date_list } from "./routes/date/dateList";
import auth0Verify from "fastify-auth0-verify";
import { mail_plugin } from "./email/mail.plugin";

const date_plugin: FastifyPluginAsync = async (app) => {
    app.register(date_list);
    app.register(date_get);
    app.register(date_delete);
    app.register(date_create);
    app.register(date_Edit);
};

const mail:FastifyPluginAsync = async (app) =>{
    app.register(mail_plugin);
    app.get("/email", async () => {
    app.mail("genesisdcabritar@gmail.com");
        return {
        sent: "OK",
        };
    });
}

export const app: FastifyPluginAsync = async (app) => {
    await app.register(auth0Verify, {
        domain: "dev-14agzilrb400bgs2.us.auth0.com",
        audience: "admin",
    });
    app.register(mail);
    app.register(db_plugin);
    app.register(fastifyCors);
    app.register(date_plugin, { prefix: "/date" });
};