
import express from 'express'
import * as  dotenv from 'dotenv'
import cors from 'cors'
import { ENV} from './config/env.js'
import favoriteRoutes from './routes/favorite-routes.js'  
import { notFound,errorHandler } from './middleware/error-middleware.js'
import job from "./config/cron.js";


const {PORT} = ENV

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.disable('x-powered-by')

if (ENV.NODE_ENV === "production") job.start();

app.use((req, res, next) =>{
    console.log(req.path,req.method)
    next();
})


app.get('/',  async (req, res) => {
    res.json({msg:`API is Live`})
})

app.use('/api/v1',favoriteRoutes)  

app.use(notFound)
app.use(errorHandler)


const runServer = async () =>{
    try {
        app.listen(PORT, ()=> console.log(`Server live on port ${PORT}`))
       } catch (error) {
           console.log(error)
           process.exit(1)
       }}

runServer()