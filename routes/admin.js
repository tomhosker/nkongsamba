/*
Routes the admin pages.
*/

// Imports.
const express = require("express");

// Local imports.
const Finaliser = require("../lib/finaliser.js");
const RemoveUserGeneratedPageORM =
    require("../lib/orm/remove_user_generated_page_orm.js");

// Constant objects.
const finaliser = new Finaliser();
const router = express.Router();

// GET the admin area page.
router.get("/", (req, res) => {
    finaliser.protoRender(req, res, "admin", {title: "Admin Area"});
});

// GET the page through which to delete records.
router.get("/remove_user_generated_page", (req, res) => {
    const orm = new RemoveUserGeneratedPageORM();
    let properties;

    orm.gatherDataAsync().then((data) => {
        properties = {
            title: "Remove a User-Generated Page",
            summaries: data
        };

        finaliser.protoRender(req, res, "removeusergeneratedpage", properties);
    });
});

module.exports = router;
