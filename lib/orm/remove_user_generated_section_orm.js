/*
This code defines an ORM for gathering the data necessary to build the page via
which the user will delete a user-generated section.
*/

// Local imports.
const ORM = require("./orm.js");
const {makeSummaries} = require("../utils.js");

/**************
 * MAIN CLASS *
 *************/

class RemoveUserGeneratedSectionORM extends ORM {
    async gatherDataAsync() {
        const query =
            "SELECT code, title FROM UserGeneratedSection ORDER BY title;";
        const raw = await this.runQueryAsync(query, []);
        const result = makeSummaries(raw, "code");

        this.retriever.close();

        return result;
    }
}

// Exports.
module.exports = RemoveUserGeneratedSectionORM;