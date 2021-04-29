const router = require("express").Router();
const baseController = require("../../controller/baseController");

// Matches with "/api/bases/"
router.route("/")
  .get(baseController.findAll)
  .post(baseController.create)

//Matches with "/api/bases/:id"
router.route("/:id")
.delete(baseController.remove)
.put(baseController.update)


module.exports = router;