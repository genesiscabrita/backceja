import { FastifyPluginAsync } from "fastify";
import { DateModel } from "../../model/date.model";

export const date_list: FastifyPluginAsync = async (app) => {
    app.get("/", async (req, res) => {
    //   const { sub }= req.user as any;
        const date = await DateModel.find({});
        // const admin = await AdminModel.find({});
        return date;
    });
};