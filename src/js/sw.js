/* eslint-disable no-restricted-globals */

// Licensed under a CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
// http://creativecommons.org/publicdomain/zero/1.0/

// Update 'version' if you need to refresh the caches
import { version } from '../../package.json';

// A cache for core files like CSS and JavaScript
const staticCacheName = 'static';
// A cache for pages to store for offline
const pagesCacheName = 'pages';
// A cache for fonts to store for offline
const fontsCacheName = 'fonts';
// A cache for images to store for offline
const imagesCacheName = 'images';

// Store core files in a cache (including a page to display when offline)
const updateStaticCache = () => caches.open(version + staticCacheName).then((cache) => cache.addAll([
  '/index.js',
  '/css/style.css',
  '/',
  '/offline.html',
]));

// Put an item in a specified cache
const stashInCache = (cacheName, request, response) => {
  caches.open(cacheName).then((cache) => {
    cache.put(request, response);
  });
};

// Limit the number of items in a specified cache.
const trimCache = (cacheName, maxItems) => {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
      }
    });
  });
};

// Remove caches whose name is no longer valid
const clearOldCaches = () => caches.keys()
  .then((keys) => Promise.all(keys.filter((key) => key.indexOf(version) !== 0)
    .map((key) => caches.delete(key))));

self.addEventListener('install', (event) => {
  event.waitUntil(updateStaticCache().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clearOldCaches().then(() => self.clients.claim()));
});

// See: https://brandonrozek.com/2015/11/limiting-cache-service-workers-revisited/
self.addEventListener('message', (event) => {
  if (event.data.command === 'trimCaches') {
    trimCache(version + pagesCacheName, 35);
    trimCache(version + imagesCacheName, 20);
  }
});

self.addEventListener('fetch', (event) => {
  let { request } = event;
  // For non-GET requests, try the network first, fall back to the offline page
  if (request.method !== 'GET') {
    event.respondWith(fetch(request).catch(() => caches.match('/offline')));
    return;
  }

  // For HTML requests, try the network first, fall back to the cache, finally the offline page
  if (request.headers.get('Accept').indexOf('text/html') !== -1) {
    // Fix for Chrome bug: https://code.google.com/p/chromium/issues/detail?id=573937
    if (request.mode !== 'navigate') {
      request = new Request(request.url, {
        method: 'GET',
        headers: request.headers,
        mode: request.mode,
        credentials: request.credentials,
        redirect: request.redirect,
      });
    }

    event.respondWith(fetch(request).then((response) => {
      // NETWORK
      // Stash a copy of this page in the pages cache
      const copy = response.clone();
      const cacheName = version + pagesCacheName;
      stashInCache(cacheName, request, copy);
      return response;
      // CACHE or FALLBACK
    }).catch(() => caches.match(request).then((response) => response || caches.match('/offline.html'))));
    return;
  }

  // For non-HTML requests, look in the cache first, fall back to the network
  event.respondWith(
    // CACHE
    caches.match(request).then((response) => response || fetch(request).then((res) => {
      // NETWORK
      // If the request is for an image, stash a copy of this image in the images cache
      if (request.headers.get('Accept').indexOf('image') !== -1) {
        const copy = res.clone();
        const cacheName = version + imagesCacheName;
        stashInCache(cacheName, request, copy);
      }

      if (request.destination === 'font') {
        const copy = res.clone();
        const cacheName = version + fontsCacheName;
        stashInCache(cacheName, request, copy);
      }

      return res;
    }).catch(() => {
      // OFFLINE
      // If the request is for an image, show an offline placeholder
      if (request.headers.get('Accept').indexOf('image') !== -1) {
        return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', { headers: { 'Content-Type': 'image/svg+xml' } });
      }
      return '';
    })),
  );
});
