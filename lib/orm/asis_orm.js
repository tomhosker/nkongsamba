/*
This code defines an ORM for gathering data from a given table "as is".
*/

// Local imports.
const ORM = require("./orm.js");
const {processRawData} = require("../utils.js");

/**************
 * MAIN CLASS *
 *************/

class AsisORM extends ORM {
    constructor(tableName) {
        super();
        this.tableName = tableName;
    }

    async gatherDataAsync() {
        const query = `SELECT * FROM ${this.tableName};`;
        const raw = await this.runQueryAsync(query, []);
        const result = processRawData(raw);

        this.retriever.close();

        return result;
    }
}

// Exports.
module.exports = AsisORM;