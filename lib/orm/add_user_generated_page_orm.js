/*
This code defines an ORM for gathering the data necessary to build the page via
which the user will add a new user-generated page.
*/

// Local imports.
const ORM = require("./orm.js");

/**************
 * MAIN CLASS *
 *************/

class AddUserGeneratedPageORM extends ORM {
    async gatherDataAsync() {
        const query = "SELECT * FROM UserGeneratedSection ORDER BY title;";
        const result = await this.runQueryAsync(query, []);

        this.retriever.close();

        return result;
    }
}

// Exports.
module.exports = AddUserGeneratedPageORM;