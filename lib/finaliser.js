/*
This code contains a class which handles any final, universal touches to the
page before it's passed to the browser.
*/

// Local imports.
const {getRetriever} = require("./retriever.js");

// The class in question.
class Finaliser {
    constructor() {
        this.retriever = null;
    }

    // Ronseal.
    static fixApostrophes(input) {
        while (input.indexOf("``") >= 0) {
            input = input.replace("``", "&ldquo;");
        }
        while (input.indexOf("''") >= 0) {
            input = input.replace("''", "&rdquo;");
        }
        while (input.indexOf("`") >= 0) {
            input = input.replace("`", "&lsquo;");
        }
        while (input.indexOf("'") >= 0) {
            input = input.replace("'", "&rsquo;");
        }

        return input;
    }

    // Ronseal.
    static fixDashes(input) {
        while (input.indexOf("---") >= 0) {
            input = input.replace("---", "&mdash;");
        }
        while (input.indexOf("--") >= 0) {
            input = input.replace("--", "&ndash;");
        }

        return input;
    }

    // Gather a list of user-generated pages, arranged by section.
    async gatherSections() {
        const query =
            "SELECT UserGeneratedPage.*, UserGeneratedSection.title AS section_title " +
            "FROM UserGeneratedPage " +
            "JOIN UserGeneratedSection ON UserGeneratedSection.code = UserGeneratedPage.section " +
            "ORDER BY UserGeneratedSection.title, UserGeneratedPage.title;";
        const raw = await this.retriever.fetchAll(query, []);
        const result = processRawSections(raw);

        return result;
    }

    // Gather the data from the database which all pages require.
    async gatherData() {
        let result = {};

        this.retriever = getRetriever();

        result.sections = await this.gatherSections();

        this.retriever.close();

        return result;
    }

    // Render, and deliver the page to the browser.
    protoRender(req, res, view, properties) {
        const date = new Date();

        properties.footstamp = date.toISOString();
        properties.loggedIn = req.isAuthenticated();

        this.gatherData().then((data) => {
            properties.globalData = data;

            res.render(view, properties, (_, html) => {
                if (html === undefined) {
                    res.render(view, properties);
                } else {
                    html = Finaliser.fixApostrophes(html);
                    html = Finaliser.fixDashes(html);
                    res.send(html);
                }
            });
        });
    }
}

/********************
 * HELPER FUNCTIONS *
 *******************/

function processRawSections(raw) {
    const result = {};
    let sec;

    for (let rawItem of raw) {
        sec = rawItem["section_title"];

        if (!Object.hasOwn(result, sec)) result[sec] = [];

        result[sec].push({code: rawItem.code, title: rawItem.title});
    }

    return result;
}

// Exports.
module.exports = Finaliser;
