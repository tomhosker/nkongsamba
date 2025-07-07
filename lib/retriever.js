/*
This code defines a class which retrieves the required data from the database.
*/

// Imports.
const {Client, Pool} = require("pg");
const Database = require("better-sqlite3");

// Local imports.
const constants = require("./constants.js");
const {runningLocally} = require("./utils.js");

/**************
 * MAIN CLASS *
 **************/

// An abstract class.
class Retriever {
    constructor() {
        // Nothing to see here!
    }

    // Run a db.all() call asynchronously.
    async fetchAll(query, params) {
        return null;
    }

    // Shut down the connection.
    close() {
        return null;
    }
}

// For reading data from a local SQLite database.
class RetrieverLocal extends Retriever {
    constructor() {
        super();

        this.db = new Database(constants.pathToLocalDB);

        this.db.pragma("journal_mode = WAL");
    }

    // Run a db.all() call asynchronously.
    async fetchAll(query, params) {
        const statement = this.db.prepare(query);
        let result;

        try {
            result = statement.all(...params);
        } catch (error) {
            console.log(error);

            return false;
        }

        return result;
    }

    // Shut down the connection.
    close() {
        this.db.close();
    }
}

// For reading data from a cloud-based database.
class RetrieverCloud extends Retriever {
    constructor() {
        super();

        this.client =
            new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: { require: true, rejectUnauthorized: false },
            });
    }

    // Run a SELECT query asynchronously.
    async fetchAll(query, params) {
        let result;

        await this.client.connect();

        query = liteToPG(query);

        result = await client.query(query, params);

        return result;
    }

    // Shut down the connection.
    async close() {
        await this.client.end();
    }
}

/********************
 * HELPER FUNCTIONS *
 ********************/

// Return the correct retriever object for the current context.
function getRetriever() {
    if (runningLocally()) return new RetrieverLocal();

    return new RetrieverCloud();
}

/******************
 * POOL FUNCTIONS *
 *****************/

// Return a pool object.
function getPool() {
    let result = null;

    if (process.env.DATABASE_URL) {
        result =
            new Pool({
                connectionString: process.env.DATABASE_URL,
                ssl: { require: true, rejectUnauthorized: false },
            });
    }

    return result;
}

// Attach a pool object to another.
function attachPool(otherObj) {
    const poolObj = getPool();

    if (!otherObj) otherObj = {};

    if (poolObj && !otherObj.pool) otherObj.pool = poolObj;
}

// End the pool object which is attached to the input.
function killPool(otherObj) {
    if (otherObj.pool) otherObj.pool.end();

    delete otherObj.pool;
}

// Convert an SQLite-style query string into a Postgres-style one.
function liteToPG(query) {
    let ordinal = 1;

    while (query.includes("?")) {
        query = query.replace("?", "$"+ordinal);
    }

    return query;
}

// Exports.
module.exports = {getRetriever, getPool, attachPool, killPool, liteToPG};