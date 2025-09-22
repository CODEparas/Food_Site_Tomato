import {config} from 'dotenv';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const DB_URI = process.env.DB_URI ;
export const PORT = process.env.PORT ;
export const JWT_SECRET = process.env.JWT_SECRET ;
export const JWT_EXPIRE = process.env.JWT_EXPIRE ;
export const NODE_ENV = process.env.NODE_ENV ;
export const ArcJet_Key = process.env.ARCJET_KEY ;
export const ArcJet_Env = process.env.ARCJET_ENV ;