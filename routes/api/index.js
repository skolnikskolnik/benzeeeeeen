const  router = require("express").Router();
const acidRoutes = require("./acids");

router.use("/acids", acidRoutes);

module.exports = router;