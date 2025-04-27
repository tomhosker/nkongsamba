/*
Returns the home page.
*/

// Imports.
const express = require("express");

// Local imports.
const Finaliser = require("../lib/finaliser.js");

// Constants.
const router = express.Router();
const finaliser = new Finaliser();

// GET home page.
router.get("/", (req, res) => {
    finaliser.protoRender(req, res, "index", { title: "Bienvenue" });
});

module.exports = router;
