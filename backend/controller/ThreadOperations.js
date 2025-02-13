const ThreadSchema = require("../Model/forumThread")

const addThread = async (req,res) => {
    try{
        const newThread = await ThreadSchema.create(req.body)
        res.status(200).send(newThread)
    }catch(e){
        console.log(e)
        res.status(500).json({Status:"Something went wrong"})
    }
}

const editThread = async (req,res) => {
    try{
        const {name} = req.params
        const newThread = await ThreadSchema.findOneAndUpdate({name:name},{ $push: { comments: req.body } },{ new: true })
        res.status(200).send(newThread)
    }catch(e){
        console.log(e)
        res.status(500).json({Status:"Something went wrong"})
    }
}


const getAllThreads = async (req,res) => {
    try{
        const allThreads = await ThreadSchema.find()
        res.status(200).send(allThreads)
    }catch(e){
        console.log(e)
        res.status(500).json({Status:"Something went wrong"})
    }
}

const getThread = async (req,res) => {
    try{
        const {name} = req.params
        const allThreads = await ThreadSchema.find({name:name})
        res.status(200).send(allThreads)
    }catch(e){
        console.log(e)
        res.status(500).json({Status:"Something went wrong"})
    }
}

module.exports = {addThread,editThread,getThread,getAllThreads}