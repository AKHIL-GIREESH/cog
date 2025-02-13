const express = require("express")
const cors = require("cors")
require("dotenv").config()

const dbConnect = require("./db/dbconnect")
const forumRoute = require("./routes/forum")

const app = express()

app.use(cors());
app.use(express.json())
app.use("/api/v1/forum",forumRoute)


app.listen(3000,async () => {
    try{
        await dbConnect(process.env.MONGO)
        console.log("Server is up 🚀")
    }catch(e){
        console.log(e)
    }
})