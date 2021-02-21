const router = require("express").Router();
const acidController = require("../../controller/acidController");

// Matches with "/api/books/"
router.route("/")
  .get(acidController.findAll)
  .post(acidController.create)



module.exports = router;