/*
This code defines a class which amends the database.
*/

// Imports.
const Database = require("better-sqlite3");
const {Client} = require("pg");

// Local imports.
const constants = require("./constants.js");
const {liteToPG} = require("./retriever.js");
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
class WriterLocal extends Writer {
    constructor() {
        super();

        this.db = new Database(constants.pathToLocalDB);

        this.db.pragma("journal_mode = WAL");
    }

    // Run a "delete" call asynchronously.
    async runDelete(query, params) {
        return runBetterSQLite(this.db, query, params);
    }

    // Run an "insert" call asynchronously.
    async runInsert(query, params) {
        return runBetterSQLite(this.db, query, params);
    }

    // Run an "update" call asynchronously.
    async runUpdate(query, params) {
        return runBetterSQLite(this.db, query, params);
    }

    // Shut down the connection.
    close() {
        this.db.close();
    }
}

// For writing data to a cloud-based database.
class WriterCloud extends Writer {
    constructor() {
        super();

        this.client =
            new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: { require: true, rejectUnauthorized: false },
            });
    }

    // Run a "delete" call asynchronously.
    async runDelete(query, params) {
        return runPG(this.client, query, params);
    }

    // Run an "insert" call asynchronously.
    async runInsert(query, params) {
        return runPG(this.client, query, params);
    }

    // Run an "update" call asynchronously.
    async runUpdate(query, params) {
        return runPG(this.client, query, params);
    }

    // Shut down the connection.
    close() {
        this.client.close();
    }
}

/********************
 * HELPER FUNCTIONS *
 *******************/

// Run a db.run() call.
function runBetterSQLite(dbObj, query, params) {
    const statement = dbObj.prepare(query);

    try {
        statement.run(...params);
    } catch (error) {
        console.log(error);

        return false;
    }

    return true;
}

// Run a client.query() call.
async function runPG(clientObj, query, params) {
    await clientObj.connect();

    query = liteToPG(query);

console.log("Running write query:");
console.log(`query: ${query}`);
console.log(`params: ${params}`);

    try {
        result = await clientObj.query(query, params);
    } catch (error) {
        console.log(error);

        return false;
    }

    return true;
}

// Return the correct writer object for the current context.
function getWriter() {
    if (runningLocally()) return new WriterLocal();

    return new WriterCloud();
}

// Exports.
module.exports = {getWriter};