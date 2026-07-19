const CACHE_NAME = 'curriculos-v2';

const PRECACHE_URLS = [
  './',
  './index.html',
  './css/app.css',
  './css/models/classico.css',
  './css/models/moderno.css',
  './css/models/executivo.css',
  './css/models/criativo.css',
  './css/models/minimalista.css',
  './css/models/doc/documentos.css',
  './js/router.js',
  './js/models/registry.js',
  './js/models/cv/classico.js',
  './js/models/cv/moderno.js',
  './js/models/cv/executivo.js',
  './js/models/cv/criativo.js',
  './js/models/cv/minimalista.js',
  './js/models/doc/renderers.js',
  './js/app.js',
  './assets/icons/icon-192.svg',
  './assets/icons/icon-512.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const fetchPromise = fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
  }
});
