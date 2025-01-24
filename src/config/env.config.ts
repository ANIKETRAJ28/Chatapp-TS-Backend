import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const SALT = process.env.SALT || 10;
export const FORNTEND_URL = process.env.FRONTEND_URL;
