import {config} from 'dotenv';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const MONGO_URI = process.env.MONGO_URI ;
export const PORT = process.env.PORT ;
export const JWT_SECRET = process.env.JWT_SECRET ;
export const JWT_EXPIRE = process.env.JWT_EXPIRE ;
export const NODE_ENV = process.env.NODE_ENV ;