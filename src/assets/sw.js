'use strict';

// Welcome to your Workbox-powered service worker!
// Learn how to configure workbox here: https://developers.google.com/web/tools/workbox/guides/configure-workbox
// First, we reference the locally bundled workbox script

// importScripts('/workbox/workbox-v4.2.0/workbox-sw.js');

// Then, we add placeholder for the precache routes manifest
// DO NOT REMOVE! :)

if (process.env.NODE_ENV === 'production') {
  workbox.precaching.precacheAndRoute([]);
} else {
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'name-images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );
}

// Put any of your custom workbox logic below!