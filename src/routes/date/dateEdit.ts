import { FastifyPluginAsync } from "fastify";
import { DateModel } from "../../model/date.model";

export const date_Edit: FastifyPluginAsync = async (app) => {
    app.put<{ 
        Body: { 
                servicio: string; 
                monto: number, 
                name: string, 
                email: string,
                fecha: string,
                direccion: string,
                cell: string,
                tipoCita: string,
                hora: string,
                tipoServicios: [],
                }
    }>("/",
        async (req, res) => {

            const data = req.body;
            req.log.info("Editado");
            console.log(data);
            const { servicio, monto, name, email, fecha, direccion, cell, tipoCita, hora, tipoServicios } = data;

            const doc = await DateModel.updateOne({
                servicio,
                monto,
                name,
                email,
                fecha,
                direccion,
                cell,
                tipoCita,
                hora,
                tipoServicios
            },{ servicio,
                monto,
                name,
                email,
                fecha,
                direccion,
                cell,
                tipoCita,
                hora,
                tipoServicios
            });

            return {
                status: "Editado",
            };
        }
    )
}