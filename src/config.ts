import { config } from "dotenv";
config();

const checkEnv = (enVar: string) => {
    const envVariable = process.env[enVar];
    if (!envVariable) {
        throw new Error(`Porfavor definir el nombre de la variable: ${enVar}`);
    }
    return envVariable;
};

export const MONGODB = checkEnv("MONGODB");
export const PORT = checkEnv("PORT");
export const CLIENT_ID = checkEnv('CLIENT_ID');
export const CLIENT_SECRET = checkEnv('CLIENT_SECRET');
export const REFRESH_TOKEN = checkEnv('REFRESH_TOKEN');
export const ACCESS_TOKEN = checkEnv('ACCESS_TOKEN');
export const ACCOUNT_SID = checkEnv('ACCOUNT_SID');
export const AUTH_TOKEN = checkEnv('AUTH_TOKEN');
