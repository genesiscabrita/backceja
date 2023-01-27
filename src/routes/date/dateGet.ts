import { FastifyPluginAsync } from "fastify";
import { NotFound } from "http-errors";
import { DateModel } from "../../model/date.model";

export const date_get: FastifyPluginAsync = async (app) => {
    app.get<{ Params: { date_id: string } }>("/:date_id", async (req, res) => {
        const { date_id } = req.params;
        
        req.log.info(`Fetching date ${date_id}`);

        const doc = await DateModel.findById(date_id);
        if (!doc) {
            throw new NotFound("cuenta no encontrada");
        }
        return doc;
    });
};