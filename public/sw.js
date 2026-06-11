self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  // Focus the window when notification is clicked
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      if (windowClients.length > 0) {
        windowClients[0].focus();
      } else {
        clients.openWindow('/');
      }
    })
  );
});

// A fetch handler is required by Chromium to trigger the PWA beforeinstallprompt event
self.addEventListener('fetch', (event) => {
  // A simple pass-through to ensure Chromium detects a valid fetch handler
  // for the beforeinstallprompt event without breaking normal network requests.
  if (event.request.method === 'GET') {
    event.respondWith(fetch(event.request).catch(() => new Response('Network error')));
  }
});
