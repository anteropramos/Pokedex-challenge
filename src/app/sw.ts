import type { PrecacheEntry, RouteHandlerCallbackOptions, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: /^http:\/\/localhost:3000\/api\/pokemons.*$/,
      handler: function (options: RouteHandlerCallbackOptions): Promise<Response> {
        return caches.match(options.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(options.request)
            .then((response) => {
              const clonedResponse = response.clone();

              caches.open('pokeapi-cache').then((cache) => {
                cache.put(options.request, clonedResponse);
              });

              return response;
            })
            .catch((error) => {
              console.error('Failed to fetch or cache:', error);
            });
        });
      },
    },
    {
      matcher: /^http:\/\/localhost:3000\/api\/pokemonDetails.*$/,
      handler: function (options: RouteHandlerCallbackOptions): Promise<Response> {
        return caches.match(options.request).then((cachedResponse) => {
          return (
            cachedResponse ||
            fetch(options.request).then((response) => {
              const clonedResponse = response.clone();
              caches.open('pokeapi-details-cache').then((cache) => {
                cache.put(options.request, clonedResponse);
              });
              return response;
            })
          );
        });
      },
    },
    {
      matcher: /\/_next\/image/,
      handler: function (options: RouteHandlerCallbackOptions): Promise<Response> {
        return caches.match(options.request).then((cachedResponse) => {
          return (
            cachedResponse ||
            fetch(options.request).then((response) => {
              const clonedResponse = response.clone();
              caches.open('next-images-cache').then((cache) => {
                cache.put(options.request, clonedResponse);
              });
              return response;
            })
          );
        });
      },
    },
    {
      matcher: /localhost:3000\/pokemons/,
      handler: function (options: RouteHandlerCallbackOptions): Promise<Response> {
        return caches.match(options.request).then((cachedResponse) => {
          return (
            cachedResponse ||
            fetch(options.request).then((response) => {
              const clonedResponse = response.clone();
              caches.open('pokemons-cache').then((cache) => {
                cache.put(options.request, clonedResponse);
              });
              return response;
            })
          );
        });
      },
    },
  ],
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === '/pokemons' || url.pathname === '') {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((networkResponse) => {
            return caches.open('offline-cache').then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          })
          .catch((error) => {
            console.error('Failed to fetch HTML:', error);
          });
      }),
    );
  }
});

serwist.addEventListeners();
