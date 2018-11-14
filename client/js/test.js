if ('serviceWorker' in navigator) {
    send().catch(e => {
        console.log(e);
    })
}
const publicKey = 'BAGWMzhIB-OMvkFvVqkK-fs9pEVlMmU326azqojPKJSCTS7D-afjVt5HkL38_TjUvXtAyhsB4SAtHjqF_vv9F5Q';
// register sw, register Push,  send push
async function send() {
    console.log('register sw');
    const register = await navigator.serviceWorker.register('../worker.js', {
        scope: '/'
    });
    console.log('register push', register);
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
    })
    console.log('send push', subscription);
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        console.log('fetch Res', res)
    }).catch(e => {
        console.log('fetch error', e)
    });

}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}