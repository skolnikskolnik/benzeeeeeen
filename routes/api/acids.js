const router = require("express").Router();
const acidController = require("../../controller/acidController");

// Matches with "/api/acids/"
router.route("/")
  .get(acidController.findAll)
  .post(acidController.create)

//Matches with "/api/acids/:id"
router.route("/:id")
.delete(acidController.remove)
.put(acidController.update)


module.exports = router;