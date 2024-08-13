// Adapted from https://github.com/sufst/wireless-telemetry-gui/blob/main/src/service-worker.js
import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'

clientsClaim()

// Precache "src" files and serve them CacheFirst
// eslint-disable-next-line no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST)

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$')
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) =>
    request.mode === 'navigate' &&
    !url.pathname.startsWith('/_') &&
    !url.pathname.match(fileExtensionRegexp) &&
    !url.pathname.includes('/api'),
  createHandlerBoundToURL(import.meta.env.BASE_URL + 'index.html')
)

// Images: serve cached version, or from network if not in cache
registerRoute(
  ({ event }) => event.request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
  })
)

// Manifest: serve cached version, or from network if not in cache
registerRoute(
  ({ event }) => event.request.destination === 'manifest',
  new CacheFirst({
    cacheName: 'manifest',
  })
)

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
