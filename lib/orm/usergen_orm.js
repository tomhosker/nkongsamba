/*
This code defines an ORM for gathering the data for a given user-generated page.
*/

// Imports.
const {Remarkable} = require("remarkable");

// Local imports.
const ORM = require("./orm.js");

// Local constants.
const md = new Remarkable();

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

        result = processRawUserGeneratedData(raw[0]);
        this.retriever.close();

        return result;
    }
}

/********************
 * HELPER FUNCTIONS *
 *******************/

// Take the data from the database, and turn it into something the front end
// can actually use.
function processRawUserGeneratedData(raw) {
    const result = {
        title: raw.title,
        html: md.render(raw.markdown)
    }

    return result;
}

// Exports.
module.exports = UsergenORM;