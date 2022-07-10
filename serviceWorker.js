const staticSkull = "skull-v2.5";
const assets = [
  "/",
  "/index.html",
  "/styles/index.css",
  "/music/MenuOst.mp3",
  "/js/main.js",
  "/js/inventory.js",
  "/js/map.js",
  "/js/Player.js",
  "/js/Viewport.js",
  "/js/music.js",
  "/img/gameAssets/tiles.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticSkull).then((cache) => {
      cache.addAll(assets);
    })
  );
});
self.addEventListener("fetch", (fetchE) => {
  fetchE.respondWith(
    cahces.match(fetchE.request).then((res) => {
      return res || fetch(fetchE.request);
    })
  );
});
