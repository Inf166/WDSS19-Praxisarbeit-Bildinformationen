const staticAssets = [
    'index.html',
    'manifest.json',
    'assets/img/manifest/favicon.ico',
    'assets/img/manifest/icons/icon-72x72.png',
    'assets/img/manifest/icons/icon-96x96.png',
    'assets/img/manifest/icons/icon-128x128.png',
    'assets/img/manifest/icons/icon-144x144.png',
    'assets/img/manifest/icons/icon-152x152.png',
    'assets/img/manifest/icons/icon-192x192.png',
    'assets/img/manifest/icons/icon-384x384.png',
    'assets/img/manifest/icons/icon-512x512.png',
    'assets/js/application.js',
    'assets/js/instascan.min.js',
    'assets/js/navigation.js',
    'assets/js/scanner.js',
    'assets/css/reset.css',
    'assets/css/styles.css',
    'assets/img/navigation/gallery.svg',
    'assets/img/navigation/history.svg',
    'assets/img/navigation/more.svg',
    'assets/img/navigation/qrscan.svg',
    'assets/img/navigation/search.svg',
    'assets/img/navigation/selected/gallery.svg',
    'assets/img/navigation/selected/history.svg',
    'assets/img/navigation/selected/more.svg',
    'assets/img/navigation/selected/qrscan.svg',
    'assets/img/misc/point.svg',
    'assets/img/404.png',
    'https://fonts.googleapis.com/css?family=Lato&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://code.jquery.com/jquery-3.4.1.min.js',
    'https://raw.githubusercontent.com/Inf166/WDSS19-Praxisarbeit-CDAA/wip/backend/fakeAPI/gallery.json'
];

self.addEventListener('install', (event) => {
    console.log('[Service-Worker] Installed.');

    event.waitUntil(
        caches.open('static').then((cache) => {
            cache.addAll(staticAssets);
        })
    );
});

self.addEventListener('activate', () => {
    console.log('[Service-Worker] Activated.');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
     caches.match(event.request).then((res) => {
            if (res) return res;
            fetch(event.request).then((response) => {
                caches.open('dynamic').then((cache) => {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            }).catch((err) => {});
        }).catch((err) => {})
    );
});