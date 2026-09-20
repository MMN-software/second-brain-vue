/* ============================================================
   Service Worker — Second Brain Vue
   v2: کش کردن CDN و فونت‌ها برای آفلاین واقعی
   ============================================================ */

const SHELL_CACHE = 'sb-vue-v3';
const RUNTIME_CACHE = 'sb-vue-runtime-v3';

const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-maskable.svg'
];

const CDN_PRECACHE = [
  'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js',
  'https://esm.sh/jalaali-js@1.2.6',
  'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await Promise.all(SHELL_ASSETS.map((url) =>
      fetch(url, { cache: 'reload' })
        .then((res) => { if (res && res.ok) return cache.put(url, res); })
        .catch(() => {})
    ));
    await Promise.all(CDN_PRECACHE.map((url) =>
      fetch(url, { mode: 'cors', cache: 'reload' })
        .then((res) => { if (res && res.ok) return cache.put(url, res); })
        .catch(() => {})
    ));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((k) => k !== SHELL_CACHE && k !== RUNTIME_CACHE)
           .map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(SHELL_CACHE);
        cache.put('./index.html', fresh.clone()).catch(() => {});
        return fresh;
      } catch {
        const cache = await caches.open(SHELL_CACHE);
        return (
          (await cache.match('./index.html')) ||
          (await cache.match('./')) ||
          new Response('Offline', { status: 503, statusText: 'Offline' })
        );
      }
    })());
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(SHELL_CACHE);
      const cached = await cache.match(req);
      const networkPromise = fetch(req)
        .then((res) => {
          if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
          return res;
        })
        .catch(() => null);
      return cached || (await networkPromise) || Response.error();
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(req);
    const networkPromise = fetch(req)
      .then((res) => {
        if (res && (res.ok || res.type === 'opaque')) {
          cache.put(req, res.clone()).catch(() => {});
        }
        return res;
      })
      .catch(() => null);

    if (cached) {
      event.waitUntil(networkPromise);
      return cached;
    }
    const fresh = await networkPromise;
    return fresh || new Response('', { status: 504, statusText: 'Offline' });
  })());
});
