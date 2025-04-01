/*
This code defines a class which amends the database.
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
class Writer {
    constructor() {
        this.db = null;
    }

    // Run a "delete" call asynchronously.
    async runDelete(query, params) {
        return null;
    }

    // Run an "insert" call asynchronously.
    async runInsert(query, params) {
        return null;
    }

    // Run an "update" call asynchronously.
    async runInsert(query, params) {
        return null;
    }

    // Shut down the connection.
    close() {
        return null;
    }
}

// For writing data to a local SQLite database.
class WriterLocal extends Retriever {
    constructor() {
        super();
        this.db = new sqlite3.Database(constants.pathToLocalDB);
    }

    // Run a "delete" call asynchronously.
    async runDelete(query, params) {
        const result = await runSQLiteAsync(this.db, query, params);

        return result;
    }

    // Run an "insert" call asynchronously.
    async runInsert(query, params) {
        const result = await runSQLiteAsync(this.db, query, params);

        return result;
    }

    // Run an "update" call asynchronously.
    async runInsert(query, params) {
        const result = await runSQLiteAsync(this.db, query, params);

        return result;
    }

    // Shut down the connection.
    close() {
        this.db.close();
    }
}

// For writing data to a cloud-based database.
class WriterCloud extends Retriever {
    // FILL ME IN!
}

/********************
 * HELPER FUNCTIONS *
 *******************/

// Run a db.run() call asynchronously.
async function runSQLiteAsync(dbObj, query, params) {
    const result = await new Promise(() => {
        dbObj.run(query, params, (err) => {
            if (err) return err;

            return true;
        });
    });

    return result;
}

// Return the correct writer object for the current context.
function getWriter() {
    if (runningLocally()) return new WriterLocal();

    return new WriterCloud();
}

// Exports.
module.exports = {getWriter};