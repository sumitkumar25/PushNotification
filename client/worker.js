console.log('service worker loaded');
self.addEventListener('push', function (event) {
    var data = event.data.json();
    console.log('push recieved')
    self.registration.showNotification(data.title, {
        body: 'Notified',
        icon: 'https://assets.ubuntu.com/v1/57a889f6-ubuntu-logo112.png'
    });
});