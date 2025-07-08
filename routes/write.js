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

// Execute the deletion of a user-generated section.
router.post("/deletefrom/UserGeneratedSection", (req, res) => {
    const query = "DELETE FROM UserGeneratedSection WHERE code = ?;";
    const params = [req.body.sectionCode];
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
        writer.close();
        finaliser.protoRender(req, res, "aftersql", properties);
    });
});

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
        writer.close();
        finaliser.protoRender(req, res, "aftersql", properties);
    });
});

// Execute the insertion of a new user-generated section.
router.post("/insertinto/UserGeneratedSection", (req, res) => {
    const query =
        "INSERT INTO UserGeneratedSection (code, title) " +
        "VALUES (?, ?);";
    const params = [
        req.body.code,
        req.body.title
    ];
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
        writer.close();
        finaliser.protoRender(req, res, "aftersql", properties);
    });
});

// Execute the insertion of a new user-generated page.
router.post("/insertinto/UserGeneratedPage", (req, res) => {
    const query =
        "INSERT INTO UserGeneratedPage (code, section, title, html) " +
        "VALUES (?, ?, ?, ?);";
    const params = [
        req.body.code,
        req.body.section,
        req.body.title,
        req.body.html
    ];
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
        writer.close();
        finaliser.protoRender(req, res, "aftersql", properties);
    });
});

// Execute the updating of an existing user-generated page.
router.post("/update/UserGeneratedPage", (req, res) => {
    const query =
        "UPDATE UserGeneratedPage " +
        "SET section = ?, title = ?, html = ? " +
        "WHERE code = ?;";
    const params = [
        req.body.section,
        req.body.title,
        req.body.html,
        req.body.code
    ];
    let properties, success;

    writer.runUpdate(query, params).then((result) => {
        success = (result === true) ? true : false;
        properties = {
            title: success ? "Update Successful" : "Update Unsuccessful",
            queryType: "insertion",
            query: query,
            params: params,
            success: success
        };
        writer.close();
        finaliser.protoRender(req, res, "aftersql", properties);
    });
});

module.exports = router;
