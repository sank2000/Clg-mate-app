self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...', event);
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...', event);
  return self.clients.claim();
})

console.log('Service worker attempted to run.');
