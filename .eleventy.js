"use strict";

const filters = require('./utils/filters.js');
const shortcodes = require('./utils/shortcodes.js');
const readingTime = require('eleventy-plugin-reading-time');

// The @11ty/eleventy configuration.
// For a full list of options, see: https://www.11ty.io/docs/config/

module.exports = (eleventyConfig) => {
    const dirs = {
        input: 'src',
        data: '_data',
        includes: '_includes',
        output: 'dist',
    }

    // Filters
    Object.keys(filters).forEach(filterName => {
        eleventyConfig.addFilter(filterName, filters[filterName])
    })

    // Shortcodes
    Object.keys(shortcodes).forEach(shortCodeName => {
        eleventyConfig.addShortcode(shortCodeName, shortcodes[shortCodeName])
    })

    eleventyConfig.addPassthroughCopy('_redirects');
    eleventyConfig.addPassthroughCopy('src/img');
    eleventyConfig.addPassthroughCopy('src/fonts');

    eleventyConfig.addPlugin(readingTime);

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