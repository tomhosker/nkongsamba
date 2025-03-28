/*
This code defines a class which retrieves the required data from the database.
*/

// Imports.
const sqlite3 = require("sqlite3");

// Local imports.
const constants = require("./constants.js");
const {runningLocally} = require("./utils.js");

/**************
 * MAIN CLASS *
 **************/

// An abstract class.
class Retriever {
    constructor() {
        this.db = null;
    }

    // Run a db.all() call asynchronously.
    async fetchAll(query, params) {
        return null;
    }
}

// For reading data from a local SQLite database.
class RetrieverLocal extends Retriever {
    constructor() {
        super();
        this.db = new sqlite3.Database(constants.pathToLocalDB);
    }

    // Run a db.all() call asynchronously.
    async fetchAll(query, params) {
        const result = await fetchAllSQLiteAsync(this.db, query, params);

        return result;
    }
}

// For reading data from a cloud-based database.
class RetrieverCloud extends Retriever {
    // FILL ME IN!
}

/********************
 * HELPER FUNCTIONS *
 ********************/

// Run a db.all() call asynchronously.
async function fetchAllSQLiteAsync(dbObj, query, params) {
    const result = await new Promise((resolve, reject) => {
        dbObj.all(query, params, (err, row) => {
            if (err) reject(err);

            resolve(row);
        });
    });

    return result;
}

// Return the correct retriever object for the current context.
function getRetriever() {
    if (runningLocally()) return new RetrieverLocal();

    return new RetrieverCloud();
}

// This is more for the sake of an example...
function fetchAllSQLiteSync(dbObj, query, params, next) {
    fetchAllSQLiteAsync(dbObj, query, params).then(
        result => next(result)
    );
}

// Exports.
module.exports = {getRetriever};