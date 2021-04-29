const  router = require("express").Router();
const acidRoutes = require("./acids");
const baseRoutes = require("./bases");

router.use("/acids/", acidRoutes);
router.use("/bases/", baseRoutes);

module.exports = router;