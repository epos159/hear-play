// Hear Then Play — simple network-first service worker with cache fallback.
const CACHE = "htp-v1";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        const fresh = await fetch(event.request);
        if (fresh.ok && new URL(event.request.url).origin === location.origin) {
          cache.put(event.request, fresh.clone());
        }
        return fresh;
      } catch {
        const cached = await cache.match(event.request);
        return cached || Response.error();
      }
    })()
  );
});
