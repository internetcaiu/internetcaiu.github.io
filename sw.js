'use strict';

const offlineUrl = 'offline.html';

this.addEventListener('install', event => {
    event.waitUntil(
        caches.open('offline').then(function(cache) {
            return cache.addAll([offlineUrl]);
        })
    );
});

this.addEventListener('fetch', event => {
    if (
        event.request.mode === 'navigate' ||
        (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))
    ) {
        event.respondWith(
            fetch(event.request.url).catch(error => caches.match(offlineUrl))
        );

        return;
    }
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );
});
