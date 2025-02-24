function startCapture() {
    let video = document.getElementById('camera');
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(error => {
            console.error('Camera access denied:', error);
        });
}

function savePhoto() {
    let canvas = document.getElementById('canvas');
    let dataURL = canvas.toDataURL('image/png');
    let link = document.createElement('a');
    link.href = dataURL;
    link.download = 'photo.png';
    link.click();
}

// Track User Location and IP
function trackUser() {
    fetch('http://your-server-ip-or-domain:3000/track')
        .then(response => response.json())
        .then(data => console.log("User data tracked:", data))
        .catch(error => console.error("Tracking failed:", error));
}

window.onload = trackUser;
