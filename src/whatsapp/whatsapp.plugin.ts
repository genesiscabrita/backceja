import { FastifyInstance } from 'fastify';
import { ACCOUNT_SID, AUTH_TOKEN } from '../config';

const whatsapp = (app: FastifyInstance) => async () => {

    const accountSid = 'AC50773a6c2b999c37c2d9ee050e966209';
    const authToken = '[AuthToken]';
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: 'tu cita fue confirmada !! por  genesis',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5491166439380'
        })
        .then((message: any) => console.log(message.sid))
        .done();
}

export const sedMsg = async(req: any, res:any) => {
    const accountSid = ACCOUNT_SID;
    const authToken = AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    try{
    const {cell, mensaje} = req.body
    const response = await client.messages
    .create({
        body: 'tu cita fue confirmada !! por  genesis',
        from: 'whatsapp:+14155238886',
        to: `whatsapp:+549${cell}`
    }).then((message: any) => console.log(message.sid))
    .done();

    console.log(response);

    res.json({
        msg:'msg enviado'
    })
    
}
    catch(error){
        console.log(error);
    }

}
