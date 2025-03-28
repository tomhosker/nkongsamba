/*
This file defines some utility functions.
*/

// Imports.
const fs = require("fs");

// Local imports.
const constants = require("./constants.js");

/*************
 * FUNCTIONS *
 *************/

// Determine whether this app is running locally or in the cloud.
function runningLocally() {
    if (fs.existsSync(constants.expectedPathToRunningLocallyMarker)) {
        return true;
    }

    return false;
}

// Exports.
module.exports = {runningLocally};