import express from "express"
import { connectDB } from "./db.js"
import  'dotenv/config'
import authRoute from "./routes/userRoute.js"
import cors from "cors"
import reviewRoute from "./routes/reviewRoute.js"
const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.port
const uri = process.env.mongo_uri

async function main(){
    try { 
        await connectDB(uri)
        app.listen(port,() => {
            console.log(`Server running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
main()

app.use('/auth',authRoute)
app.use('/movies/',reviewRoute)