const express = require("express")
const cors = require("cors")
require("dotenv").config()

const dbConnect = require("./db/dbconnect")

const app = express()

app.use(cors());
app.use(express.json())


app.listen(3000,async () => {
    try{
        await dbConnect(process.env.MONGO)
        console.log("Server is up 🚀")
    }catch(e){
        console.log(e)
    }
})