// Connect to WebSocket server
const socket = new WebSocket('ws:https://nk25719.github.io/PMD-Support/');

// Handle incoming WebSocket messages (sensor updates)
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.value !== undefined) {
        document.getElementById('Value').innerText = 'Sensor Value: ' + data.value;
    }
    if (data.level !== undefined) {
        document.getElementById('level').innerText = 'Emergency Level: ' + data.level;
    }
};

// Send emergency level via WebSocket
function sendEmergency(level) {
    socket.send(JSON.stringify({ level }));
}

// Fetch sensor data via HTTP request
function fetchData() {
    fetch('https://nk25719.github.io/PMD-Support/update')
        .then(response => response.json())
        .then(data => {
            document.getElementById('Value').innerText = 'Sensor Value: ' + data.value;
        })
        .catch(error => console.error('Error fetching data:', error));
}
