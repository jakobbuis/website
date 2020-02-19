// Cache all website files
var CACHE_NAME = 'jakobbuis-nl-v1';
var URLS = [
    '/images/android-chrome-192x192.png',
    '/images/android-chrome-512x512.png',
    '/images/apple-touch-icon.png',
    '/images/favicon-16x16.png',
    '/images/favicon-32x32.png',
    '/images/favicon.ico',
    '/images/lal.jpg',
    '/main.css',
    '/main.js',
    '/manifest.json',
    '/',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(URLS);
        })
    );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch to use cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(CACHE_NAME)
            .then(cache => cache.match(event.request, {ignoreSearch: true}))
            .then(response => response || fetch(event.request))
    );
});
