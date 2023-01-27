import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { createTransport } from "nodemailer";
import { ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } from "../config";
// import {ACCESS_TOKEN,CLIENT_ID,CLIENT_SECRET,REFRESH_TOKEN,} from "../config";

export const gmail_transporter = createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "OAuth2",
        user: "genesisdcabritar@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

gmail_transporter.set("oauth2_provision_cb", (user: any, renew, callback) => {
    let accessToken = ACCESS_TOKEN[user];
    if (!accessToken) {
        return callback(new Error("Unknown user"));
    } else {
        return callback(null, accessToken);
    }
});

const send_email = (app: FastifyInstance) => async (to: string) => {
    const message = "Hola que tal estás? Enviado de prueba";
    app.log.info(`Sending email to ${to}...`);

    await gmail_transporter.sendMail({
        from: "genesisdcabritar@gmail.com",
        to,
        text: message,
    });

    app.log.info(`Email sent to ${to}`);
};

type SendEmailFn = ReturnType<typeof send_email>;

declare module "fastify" {
    interface FastifyInstance {
        mail: SendEmailFn;
    }
}

export const mail_plugin: FastifyPluginAsync = fp(async (app) => {
    app.decorate("mail", send_email(app));
});