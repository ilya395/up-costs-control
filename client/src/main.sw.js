const staticCacheName = "staticCacheName";

const assetsUrls = [
  "index.html",
  "/assets/js/*",
  "/assets/css/*",
];

self.addEventListener('install', async (event) => {
  console.log('Установлен');
  // event.waitUntil(
  //   caches.open(staticCacheName)
  //     .then(cache => cache.addAll(assetsUrls)) // все статические файлы в кэш
  // );
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetsUrls);
});

self.addEventListener('activate', (event) => {
  console.log('Активирован');
});

self.addEventListener('fetch', (event) => {
  console.log('Происходит запрос на сервер');
});