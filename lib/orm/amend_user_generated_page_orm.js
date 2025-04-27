/*
This code defines ORMs for gathering the data necessary to build the page via
which the user will amend a user-generated page.
*/

// Local imports.
const ORM = require("./orm.js");
const RemoveUserGeneratedORM = require("./remove_user_generated_page_orm.js");

/**************
 * MAIN CLASS *
 *************/

class AmendUserGeneratedPageChooseORM extends RemoveUserGeneratedORM {
    // Nothing to see here!
}

class AmendUserGeneratedPageWriteORM extends ORM {
    constructor(pageCode) {
        super();

        this.pageCode = pageCode;
    }

    async gatherSections() {
        const query = "SELECT * FROM UserGeneratedSection;";
        const result = await this.runQueryAsync(query, []);

        return result;
    }

    async gatherDataAsync() {
        const query = "SELECT * FROM UserGeneratedPage WHERE code = ?;";
        const params = [this.pageCode];
        const raw = await this.runQueryAsync(query, params);
        const result = {};

        if (raw.length === 0) {
            console.log(`No user-generated pages with code: ${this.pageCode}`);
            result.page = null;
        } else result.page = raw[0];

        result.sections = await this.gatherSections();

        this.retriever.close();

        return result;
    }
}

// Exports.
module.exports = {
    AmendUserGeneratedPageChooseORM,
    AmendUserGeneratedPageWriteORM
};