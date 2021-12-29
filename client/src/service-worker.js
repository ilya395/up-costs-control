self.addEventListener('install', async (event) => {
  console.log('Установлен');
});

self.addEventListener('activate', (event) => {
  console.log('Активирован');
});

self.addEventListener('fetch', (event) => {
  console.log('Происходит запрос на сервер');
});