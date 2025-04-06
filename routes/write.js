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
router.post("/deletefrom/UserGeneratedPage", (req, res) => {
    const query = "DELETE FROM UserGeneratedPage WHERE code = ?;";
    const params = [req.body.pageCode];
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

// Execute the insertion of a new user-generated page.
router.post("/insertinto/UserGeneratedPage", (req, res) => {
    const query =
        "INSERT INTO UserGeneratedPage (code, title, markdown) " +
        "VALUES (?, ?, ?);";
    const params = [req.body.code, req.body.title, req.body.markdown];
    let properties, success;

    writer.runInsert(query, params).then((result) => {
        success = (result === true) ? true : false;
        properties = {
            title: success ? "Insertion Successful" : "Insertion Unsuccessful",
            queryType: "insertion",
            query: query,
            params: params,
            success: success
        };

        finaliser.protoRender(req, res, "aftersql", properties);
    });
});

// Execute the updating of an existing user-generated page.
router.post("/update/UserGeneratedPage", (req, res) => {
    const query =
        "UPDATE UserGeneratedPage " +
        "SET title = ?, markdown = ? " +
        "WHERE code = ?;";
    const params = [req.body.title, req.body.markdown, req.body.code];
    let properties, success;

    writer.runUpdate(query, params).then((result) => {
        success = (result === true) ? true : false;
        properties = {
            title: success ? "Insertion Successful" : "Insertion Unsuccessful",
            queryType: "insertion",
            query: query,
            params: params,
            success: success
        };

        finaliser.protoRender(req, res, "aftersql", properties);
    });
});

module.exports = router;
