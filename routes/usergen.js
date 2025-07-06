/*
Returns a user-generated page.
*/

// Imports.
const express = require("express");

// Local imports.
const UsergenORM = require("../lib/orm/usergen_orm.js");
const ListORM = require("../lib/orm/list_orm.js");
const Finaliser = require("../lib/finaliser.js");

// Constants.
const router = express.Router();
const finaliser = new Finaliser();

// Return a list of all user-generated pages.
router.get("/", (req, res) => {
    const orm =
        new ListORM("UserGeneratedPage", "code", "title", "title", "usergen");
    let properties;

    orm.gatherDataAsync().then((data) => {
        properties = {title: "List of User-Generated Pages", data: data};
        finaliser.protoRender(req, res, "listofpages", properties);
    });
});

// Return a given user-generated page.
router.get("/:id", (req, res) => {
    const code = req.params.id;
    const orm = new UsergenORM(code);
    let properties;

    orm.gatherDataAsync().then((data) => {
        if (data === null) {
            res.send(`No user-generated page with code: ${code}`);
        } else {
            properties = {title: data.title, data: data.html};
console.log(properties);
            finaliser.protoRender(req, res, "usergen", properties);
        }
    });
});

module.exports = router;
