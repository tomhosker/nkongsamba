/*
This code defines an ORM for gathering the data for a given user-generated page.
*/

// Local imports.
const ORM = require("./orm.js");

/**************
 * MAIN CLASS *
 *************/

class UsergenORM extends ORM {
    constructor(code) {
        super();
        this.code = code;
    }

    async gatherDataAsync() {
        const query = "SELECT * FROM UserGeneratedPage WHERE code = ?;";
        let raw, result;

        raw = await this.runQueryAsync(query, [this.code]);

        if (raw === null || raw.length === 0) return null;

        result = raw[0];

        this.retriever.close();

        return result;
    }
}

// Exports.
module.exports = UsergenORM;