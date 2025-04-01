/*
This code routes requests to amend the database.
*/

// Imports.
const express = require("express");

// Local imports.
const Finaliser = require("../lib/finaliser.js");
const {getWriter} = require("../lib/writer.js");

// Constants.
const router = express.Router();
const writer = getWriter();
const finaliser = new Finaliser();

// Execute the deletion of a user-generated page.
router.post("/deletefrom/DynamicPage", function (req, res, next) {
    const query = "DELETE FROM DynamicPage WHERE code = ?";
    const params = [req.body.code];
    let properties, success;

    writer.runDelete(query, params).then((result) => {
        success = (result === true) ? true : false;
        properties = {
            title: success ? "Deletion Successful" : "Deletion Unsuccessful",
            queryType: "deletion",
            query: query,
            params: params,
            success: success
        };

        finaliser.protoRender(req, res, "aftersql", properties);
    });
});

module.exports = router;
