import { Document, model, Schema } from "mongoose";

export interface DateDocument extends Document {
    servicio: string;
    monto: number;
    name:string;
    email: string;
    fecha: string;
    direccion: string;
    cell: string;
    tipoCita: string;
    hora: string;
    tipoServicios: [];
}

const schema = new Schema(
    {
        servicio: { type: String },
        monto: { type: Number },
        name: {type: String, required: true},
        email: {type: String, required: true},
        fecha: {type: String, required: true},
        direccion: {type: String, required: true},
        cell: {type: String, required: true},
        tipoCita: {type: String},
        hora: {type: String},
        tipoServicios: {type: [Schema.Types.Mixed] },
    },
    { timestamps: true }
);

export const DateModel = model<DateDocument>("date", schema);