/*
This code defines an ORM for gathering data from a given table "as is".
*/

// Local imports.
const ORM = require("./orm.js");

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
        const result = await this.runQueryAsync(query, []);

        return result;
    }
}