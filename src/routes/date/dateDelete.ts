import { FastifyPluginAsync } from "fastify";
import { NotFound, BadRequest } from "http-errors";
import { isEmpty } from "../../util/is_empty";
import { Types } from "mongoose";
import { DateModel } from "../../model/date.model";

export const date_delete: FastifyPluginAsync = async (app) => {
    app.delete<{ Params: { date_id: string } }>(
        "/:date_id",
        async (req, res) => {
            
            const { date_id } = req.params;

            if (isEmpty(date_id)) {
                throw new BadRequest("identifica para eliminar.");
            }

            if (!Types.ObjectId.isValid( date_id )) {
                throw new BadRequest(" date_id  debe ser una id válido");
            }

            const product_doc = await DateModel.findById(date_id);
            if (!product_doc) {
                throw new NotFound("la cuenta no existe");
            }

            await DateModel.findByIdAndDelete(date_id);

            return {
                status: "Eliminado",
            };
        }
    );
};