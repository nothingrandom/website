'use strict';

// Welcome to your Workbox-powered service worker!
// Learn how to configure workbox here: https://developers.google.com/web/tools/workbox/guides/configure-workbox
// First, we reference the locally bundled workbox script

importScripts('/workbox/workbox-v4.3.1/workbox-sw.js');

workbox.precaching.precacheAndRoute([]);

// workbox.routing.registerRoute(
//   /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
//   new workbox.strategies.CacheFirst({
//     cacheName: 'images',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 60,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       }),
//     ],
//   }),
// );

// workbox.routing.registerRoute(
//   /\.(?:js|css)$/,
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'static-resources',
//   }),
// );

// workbox.routing.registerRoute(
//   /\.(?:html)$/,
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'static-pages',
//   }),
// );

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
// workbox.routing.registerRoute(
//   /^https:\/\/fonts\.googleapis\.com/,
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'google-fonts-stylesheets',
//   }),
// );

// // Cache the underlying font files with a cache-first strategy for 1 year.
// workbox.routing.registerRoute(
//   /^https:\/\/fonts\.gstatic\.com/,
//   new workbox.strategies.CacheFirst({
//     cacheName: 'google-fonts-webfonts',
//     plugins: [
//       new workbox.cacheableResponse.Plugin({
//         statuses: [0, 200],
//       }),
//       new workbox.expiration.Plugin({
//         maxAgeSeconds: 60 * 60 * 24 * 365,
//         maxEntries: 30,
//       }),
//     ],
//   }),
// );

