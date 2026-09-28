/* Guarda la app en el celular para que abra sin internet. Cambie la versión al publicar cambios. */
var CACHE='inf-v2.1';
var ARCHIVOS=['./','index.html','jsQR.min.js','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ARCHIVOS);}));self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==CACHE;}).map(function(x){return caches.delete(x);}));}));self.clients.claim();});
self.addEventListener('fetch',function(e){
  var u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return; // Google Apps Script siempre por red
  e.respondWith(fetch(e.request).then(function(r){var c=r.clone();caches.open(CACHE).then(function(x){x.put(e.request,c);});return r;}).catch(function(){return caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||caches.match('index.html');});}));
});
