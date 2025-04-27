/*
Routes the admin pages.
*/

// Imports.
const express = require("express");

// Local imports.
const Finaliser = require("../lib/finaliser.js");
const AddUserGeneratedPageORM =
    require("../lib/orm/add_user_generated_page_orm.js");
const RemoveUserGeneratedPageORM =
    require("../lib/orm/remove_user_generated_page_orm.js");
const RemoveUserGeneratedSectionORM =
    require("../lib/orm/remove_user_generated_section_orm.js");
const {AmendUserGeneratedPageChooseORM, AmendUserGeneratedPageWriteORM} =
    require("../lib/orm/amend_user_generated_page_orm.js");

// Constant objects.
const finaliser = new Finaliser();
const router = express.Router();

// GET the admin area page.
router.get("/", (req, res) => {
    finaliser.protoRender(req, res, "admin", {title: "Admin Area"});
});

// GET the page through which to delete a record.
router.get("/remove_user_generated_section", (req, res) => {
    const orm = new RemoveUserGeneratedSectionORM();
    let properties;

    orm.gatherDataAsync().then((data) => {
        properties = {
            title: "Remove a User-Generated Section",
            summaries: data
        };

        finaliser.protoRender(req, res, "removeusergeneratedsection", properties);
    });
});

// GET the page through which to delete a record.
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

// GET the page through which to add a record.
router.get("/add_user_generated_section", (req, res) => {
    const properties = {title: "Add a User-Generated Section"};

    finaliser.protoRender(req, res, "addusergeneratedsection", properties);
});

// GET the page through which to add a record.
router.get("/add_user_generated_page", (req, res) => {
    const orm = new AddUserGeneratedPageORM();
    let properties;

    orm.gatherDataAsync().then((data) => {
        properties = {
            title: "Add a User-Generated Page",
            sections: data
        };

        finaliser.protoRender(req, res, "addusergeneratedpage", properties);
    });
});

// GET the page through which to select a record to amend.
router.get("/amend_user_generated_page_choose", (req, res) => {
    const orm = new AmendUserGeneratedPageChooseORM();
    let properties;

    orm.gatherDataAsync().then((data) => {
        properties = {
            title: "Amend a User-Generated Page",
            summaries: data
        };

        finaliser.protoRender(
            req,
            res,
            "amendusergeneratedpagechoose",
            properties
        );
    });
});

// GET the page through which to amend a given record.
router.get("/amend_user_generated_page_write", (req, res) => {
    const pageCode = req.query.pageCode;
    const orm = new AmendUserGeneratedPageWriteORM(pageCode);
    let properties;

    orm.gatherDataAsync().then((data) => {
        if (data.page === null) {
            res.send(`No user-generated pages with code: ${this.pageCode}`);
        } else {
            properties = {
                title: "Amend a User-Generated Page",
                existingData: data.page,
                sections: data.sections
            };
    
            finaliser.protoRender(
                req,
                res,
                "amendusergeneratedpagewrite",
                properties
            );
        }
    });
});

module.exports = router;
