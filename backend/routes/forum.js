const router = require("express").Router()
const {addThread,getThread,editThread,getAllThreads} = require("../controller/ThreadOperations")

router.route("/").post(addThread).get(getAllThreads)
router.route("/:name").patch(editThread).get(getThread)

module.exports = router