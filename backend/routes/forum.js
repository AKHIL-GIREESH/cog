const router = require("express").Router()
const {addThread,getThread,editThread,getAllThreads} = require("../controller/ThreadOperations")

router.route("/").post(createGroup).patch(inviteGroups).get(getAllGroups)
router.route("/:gp").patch(addMembers)

module.exports = router