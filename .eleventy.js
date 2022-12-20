"use strict";

const filters = require('./utils/filters.js');
const shortcodes = require('./utils/shortcodes.js');
const readingTime = require('eleventy-plugin-reading-time');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster');
const pjson = require('./package.json');

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

  eleventyConfig.addCollection('food', collection => {
    // return collection.getFilteredByGlob('**/food/*.md').reverse();
    return collection.getFilteredByGlob('**/food/*.md').sort(function(a, b) {
      //return a.date - b.date; // sort by date - ascending
      // return b.date - a.date; // sort by date - descending
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
      // return b.inputPath.localeCompare(a.inputPath); // sort by path - descending
    });
  });

  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('**/blog/*.md').reverse();
  });

  eleventyConfig
    .addPassthroughCopy('_redirects')
    .addPassthroughCopy('src/img')
    .addPassthroughCopy('src/fonts');

  eleventyConfig.addPlugin(readingTime);

  if (process.env.ELEVENTY_ENV !== 'development') {
    eleventyConfig.addPlugin(lazyImagesPlugin, {
      appendInitScript: false,
      className: ['lazyload', 'blur-up'],
      transformImgPath: (imgPath) => {
        if (imgPath.startsWith('/') && !imgPath.startsWith('//')) {
          return `./src${imgPath}`;
        }

        return imgPath;
      },
    });
  }

  const cacheBusterOptions = {
    outputDirectory: dirs.output,
    createResourceHash(outputDirectoy, url, target) {
      return pjson.version;
    }
  };
  eleventyConfig.addPlugin(cacheBuster(cacheBusterOptions));

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