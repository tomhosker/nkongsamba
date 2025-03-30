/*
This file defines some utility functions.
*/

/*************
 * FUNCTIONS *
 *************/

// Determine whether this app is running locally or in the cloud.
function runningLocally() {
    if (process.env.RUNNING_LOCALLY) {
        return true;
    }

    return false;
}

// Exports.
module.exports = {runningLocally};