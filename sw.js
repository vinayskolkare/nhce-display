
const CACHE_NAME = 'my-site-cache-v4';
const urlsToCache = [
  '/',
  '/acdemics-nhcm.html',
  '/achievements.html',
  '/activities-nhcm.html',
  '/activities.html',
  '/admissions-nhcm.html',
  '/aiml.html',
  '/apps.html',
  '/campus.html',
  '/cdc.html',
  '/cs-1.html',
  '/dean.html',
  '/ece.html',
  '/eee.html',
  '/event-1.html',
  '/event-nhcm.html',
  '/event.html',
  '/idealab.html',
  '/index-2.html',
  '/index-3.html',
  '/index-6.html',
  '/index.html',
  '/ise.html',
  '/labs.html',
  '/library.html',
  '/manifest.json',
  '/mba.html',
  '/mca.html',
  '/mech.html',
  '/NHCIIE.html',
  '/nhcm-campus.html',
  '/nhcm-library.html',
  '/nhsac.html',
  '/placemnt-nhcm.html',
  '/programs-5.html',
  '/programs-6.html',
  '/programs-nhcm.html',
  '/programs.html',
  '/prw.html',
  '/research.html',
  '/sw.js',
  '/teaching.html',
  '/template.html',
  '/images/logo-1.png',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/logo-2.png'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('my-site-cache-') &&
                 cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
