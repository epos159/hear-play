// Hear Then Play — network-first service worker with cache fallback.
//
// Bump CACHE whenever you want to force-clear old entries after a deploy.
// The bigger fix, though, is below: navigation requests (index.html) always
// bypass the browser's own HTTP cache with { cache: "no-store" }. Vite gives
// every JS/CSS file a content hash in its filename, so as long as the HTML
// itself is never stale, the hashed assets it references are always exactly
// the ones from that build — no manual cache-busting needed for them.
const CACHE = "htp-v3";

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

  const isNavigation = event.request.mode === "navigate" || event.request.destination === "document";

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        // Navigations skip the HTTP cache entirely so a new deploy is always
        // picked up when online; other assets (hashed by Vite) are safe to
        // let the browser cache normally.
        const fresh = await fetch(event.request, isNavigation ? { cache: "no-store" } : undefined);
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
