import { FastifyPluginAsync } from "fastify";
import { BadRequest } from "http-errors";
import { gmail_transporter } from "../../email/mail.plugin";
import { DateModel } from "../../model/date.model";
import { isEmpty } from "../../util/is_empty";

export const date_create: FastifyPluginAsync = async (app) => {
    app.post<{
    Body: { servicio: string; 
            monto: number, 
            name: string, 
            email: string ,
            fecha: string,
            direccion: string,
            cell: string,
            tipoCita: string,
            hora: string,
            tipoServicios: [],
        };
    }>("/", async (req, res) => {

        const data : any = req.body;
        req.log.info("Output");
        console.log(data);
        const { servicio, monto, name, email, fecha, direccion, cell, tipoCita, hora, tipoServicios } = data;
        
        const previous_hour = await DateModel.findOne({
        fecha: fecha,
        hora: hora,
        });
        if (previous_hour) {
        throw new Error("La hora y la fecha ya existen en la base de datos");
        }

        if (isEmpty(email)) {
            throw new BadRequest("Email no definido");
            }
        if (isEmpty(cell)) {
            throw new BadRequest("Cell no definido");
            }
        if (isEmpty(fecha)) {
            throw new BadRequest("Fecha no definida");
            }
        if (isEmpty(direccion)) {
            throw new BadRequest("Direccion no definida");
            }
        
        const doc: any = await DateModel.create({
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
        });

        {doc.tipoCita === 'A domicilio' ? 
        await gmail_transporter.sendMail({
            from: '"Citas Genesis👻" <genesisdcabritar@gmail.com>',
            to: doc?.email, 
            subject: "Su cita fue confirmada ✔",
            html:`<div></div><div><p>hola!</p><b style="color:#9c6419">${doc?.name}
            </b><p>soy GENESIS de tu sitio CEJAS STYLE GOAT. Tu cita fue confirmada con éxito para el día ${doc?.fecha} 
            a las ${doc?.hora} en su domicilio ${doc?.direccion} y su totalidad de el servicio tiene un monto de ${doc?.monto}$
            , Si necesitas reprogramarla, llamarnos lo antes posible. Estaremos puntual a su cita pautada. Gracias por preferirnos y ¡Espero verte pronto!</p></div>`
        }) : null}

        {doc.tipoCita === 'Ciudadela' ? 
        await gmail_transporter.sendMail({
            from: '"Citas Genesis👻" <genesisdcabritar@gmail.com>',
            to: doc?.email, 
            subject: "Su cita fue confirmada ✔",
            html:`<div></div><div><p>hola!</p><b style="color:#9c6419">${doc?.name}
            </b><p>soy GENESIS de tu sitio CEJAS STYLE GOAT. Tu cita fue confirmada con éxito para el día ${doc?.fecha} 
            a las ${doc?.hora} en LA CIUDADELA LOTE 14-C y su totalidad de el servicio tiene un monto de ${doc?.monto}$
            , Si necesitas reprogramarla, llamarnos lo antes posible. Por favor, ser puntual y estar 10 minutos antes. Gracias por preferirnos y ¡Espero verte pronto!</p></div>`
        }) : null}

        {doc.tipoCita === 'Ciudadela' ?
            await gmail_transporter.sendMail({
            from: '"Tienes una cita Genesis👻" <genesisdcabritar@gmail.com>',
            to: 'genesisdcabritar@gmail.com', 
            subject: `${doc?.name}, pidio una cita ✔`,
            html:`<div></div><div><p>hola!</p><b style="color:#9c6419">Genesis
            </b><p>Tienes una cita pautada con ${doc?.name}. para el día ${doc?.fecha} a las ${doc?.hora} 
            se atenderá en la ${doc?.tipoCita} El servicio que se quiere realizar es ${doc?.servicio}
            y la totalidad tiene un monto de ${doc?.monto}$ . Por favor estar atenta.
            Mas detalles del servicio entra en este link:
            https://frontgenesis.vercel.app/manage/citas-genesis</p></div>`
        })
        : null}

        {doc.tipoCita === 'A domicilio' ?
            await gmail_transporter.sendMail({
            from: '"Tienes una cita Genesis👻" <genesisdcabritar@gmail.com>',
            to: 'genesisdcabritar@gmail.com', 
            subject: `${doc?.name}, pidio una cita ✔`,
            html:`<div></div><div><p>hola!</p><b style="color:#9c6419">Genesis
            </b><p>Tienes una cita pautada con ${doc?.name}. para el día ${doc?.fecha} a las ${doc?.hora} 
            se atenderá en ${doc?.direccion} El servicio que se quiere realizar es ${doc?.servicio}
            y la totalidad tiene un monto de ${doc?.monto}$ . Por favor estar atenta.
            Mas detalles del servicio entra en este link:
            https://frontgenesis.vercel.app/manage/citas-genesis</p></div>`
        })
        : null}

        console.log("mensajes enviado");

        return doc;
    });
};