"use strict";

const glob = require('fast-glob');
const path = require('path');
const filters = require('./lib/filters.js');
const shortcodes = require('./lib/shortcodes.js');

// The @11ty/eleventy configuration.
// For a full list of options, see: https://www.11ty.io/docs/config/

module.exports = (eleventyConfig) => {
    const dirs = {
        input: "src/assets/",
        data: `../data/`,
        includes: `../includes/`,
    }
    const files = glob.sync(path.join(process.cwd(), dirs.input, "**/*"));
    const exts = files.map(file => path.extname(file).replace('.', ''));

    // Add date filter, to format dates better
    eleventyConfig.addNunjucksFilter('date', dateFilter);

    // Make all files pass through to cache
    eleventyConfig.setTemplateFormats(exts);

    eleventyConfig.addPassthroughCopy('_redirects');

    return {
        // Set the path from the root of the deploy domain
        // i.e, example.com + "/"
        pathPrefix: "/",

        // Set the src and output directories
        dir: dirs,

        // Set the default template engine from `liquid` to `njk`
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",

        // Set up eleventy to pass-through files to be compiled by Parcel
        passthroughFileCopy: true
    };
};

function resolveNameFromPath(path) {
    return path.basename(path);
}