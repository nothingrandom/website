// module.exports = function(eleventyConfig) {
//   eleventyConfig.addPassthroughCopy('src/images')

//   return {
//     dir: { input: 'src', output: 'dist', data: '_data' },
//     passthroughFileCopy: true,
//     templateFormats: ['njk', 'md', 'css', 'html', 'yml'],
//     htmlTemplateEngine: 'njk'
//   }
// }

"use strict";

const glob = require('fast-glob');
const path = require('path');
const filters = require('./utils/filters.js');
const shortcodes = require('./utils/shortcodes.js');

// The @11ty/eleventy configuration.
// For a full list of options, see: https://www.11ty.io/docs/config/

module.exports = (eleventyConfig) => {
    const dirs = {
        input: 'src',
        data: '_data',
        includes: '_includes',
        output: 'dist',
    }
    const files = glob.sync(path.join(process.cwd(), dirs.input, "**/*"));
    const exts = files.map(file => path.extname(file).replace('.', ''));

    // Filters
    Object.keys(filters).forEach(filterName => {
        eleventyConfig.addFilter(filterName, filters[filterName])
    })

    // Shortcodes
    Object.keys(shortcodes).forEach(shortCodeName => {
        eleventyConfig.addShortcode(shortCodeName, shortcodes[shortCodeName])
    })

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