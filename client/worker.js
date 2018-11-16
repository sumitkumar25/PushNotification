self.addEventListener('push', function (event) {
    var data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.text,
        icon: 'data:image/png;base64,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'
    });
});

self.addEventListener('notificationclick', function (event) {
    let url = 'http://localhost:5000/'
    event.notification.close();
    event.waitUntil(
        clients.matchAll({
            includeUncontrolled: true,
            type: 'window'
        }).then(windowClients => {
            // Check if there is already a window/tab open with the target URL

            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        }));
})