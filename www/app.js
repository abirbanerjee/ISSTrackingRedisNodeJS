fetch('/loc').then(response => response.json()).then(data => console.log(data.startend[0]));
let startLine = [];
let endLine = [];
const map = L.map('map').setView([0, 0], 1);
var marker = L.marker([0, 0]).addTo(map);
const attribution = '&copy; <a href = "https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors';
const tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);
let firstCall = true;
async function getPosition() {
    const response = await fetch('/loc');
    const getData = await response.json();
    document.getElementById('lat').innerText = getData.startend[1].lat;
    document.getElementById('lon').innerText = getData.startend[1].lon;
    console.log(getData);

    const lat = parseFloat(getData.startend[1].lat);
    const lon = parseFloat(getData.startend[1].lon);
    endLine = [lat, lon];
    if (firstCall) {
        //map.setView([lat,lon],5);
        startLine = [parseFloat(getData.startend[0].lat), parseFloat(getData.startend[0].lon)]
        map.setView([0, 0], 1);
        map.flyTo([lat, lon], 4, 'pan');
        firstCall = false;
    }
    marker.setLatLng([lat, lon]);
    map.flyTo([lat, lon], 4)
    var latlngs = [
        startLine,
        endLine
    ];

    var polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);
    startLine = endLine;
}
setInterval(getPosition, 3000);