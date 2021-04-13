const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Hello");
});

router.get("/callback", (req, res) => {
    res.send("No callback");
});

module.exports = router;