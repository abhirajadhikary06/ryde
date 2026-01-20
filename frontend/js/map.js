const map = L.map("map").setView([22.05, 88.08], 13);

// OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

let userMarker;
let serviceMarkers = [];

// SINGLE routing controller (important)
const routingControl = L.Routing.control({
  waypoints: [],
  routeWhileDragging: false,
  addWaypoints: false,
  draggableWaypoints: false,
  show: false,
}).addTo(map);

// Dummy services
const services = [
  { name: "Repair Shop A", lat: 22.052, lng: 88.082 },
  { name: "Repair Shop B", lat: 22.047, lng: 88.078 },
  { name: "Towing Service C", lat: 22.058, lng: 88.09 },
];

// ---------------------- LOCATION ----------------------

function useManualLocation() {
  const lat = parseFloat(document.getElementById("lat").value);
  const lng = parseFloat(document.getElementById("lng").value);
  if (isNaN(lat) || isNaN(lng)) return alert("Invalid location");
  setUserLocation(lat, lng);
}

function useMyLocation() {
  navigator.geolocation.getCurrentPosition(
    (pos) => setUserLocation(pos.coords.latitude, pos.coords.longitude),
    () => alert("Location permission denied"),
  );
}

function setUserLocation(lat, lng) {
  map.setView([lat, lng], 14);

  if (userMarker) map.removeLayer(userMarker);
  clearServices();

  userMarker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup("Your Location")
    .openPopup();

  plotServices(lat, lng);

  // AUTO route to nearest service
  const nearest = findNearest(lat, lng);
  drawRoute(lat, lng, nearest.lat, nearest.lng);
}

// ---------------------- SERVICES ----------------------

function plotServices(userLat, userLng) {
  services.forEach((service) => {
    const distance = haversine(
      userLat,
      userLng,
      service.lat,
      service.lng,
    ).toFixed(2);

    const marker = L.marker([service.lat, service.lng])
      .addTo(map)
      .bindPopup(
        `
                <b>${service.name}</b><br>
                Distance: ${distance} km<br>
                <small>Click to navigate</small>
            `,
      )
      .on("click", () => {
        drawRoute(userLat, userLng, service.lat, service.lng);
      });

    serviceMarkers.push(marker);
  });
}

function clearServices() {
  serviceMarkers.forEach((m) => map.removeLayer(m));
  serviceMarkers = [];
}

// ---------------------- ROUTING (STABLE) ----------------------

function drawRoute(ulat, ulng, slat, slng) {
  // Clear previous route properly
  routingControl.setWaypoints([]);

  // Small delay = stability
  setTimeout(() => {
    routingControl.setWaypoints([L.latLng(ulat, ulng), L.latLng(slat, slng)]);
  }, 200);
}

// ---------------------- NEAREST ----------------------

function findNearest(lat, lng) {
  return services.reduce((a, b) =>
    haversine(lat, lng, a.lat, a.lng) < haversine(lat, lng, b.lat, b.lng)
      ? a
      : b,
  );
}

// ---------------------- DISTANCE ----------------------

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
