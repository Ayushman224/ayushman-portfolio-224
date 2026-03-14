self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Listener for local notifications triggered by the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body } = event.data;
    const options = {
      body: body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      vibrate: [200, 100, 200],
    };
    self.registration.showNotification(title, options);
  }
});
