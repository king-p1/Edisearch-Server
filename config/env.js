import * as  dotenv from 'dotenv'
dotenv.config()


export const ENV =  {
 
    PORT: process.env.PORT || 5050,
    DATABASE_URL: process.env.DATABASE_URL || 5050,
    NODE_ENV: process.env.NODE_ENV || 5050,
}
