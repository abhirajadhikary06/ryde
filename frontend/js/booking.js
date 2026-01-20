function book() {
  const data = {
    service_type: document.getElementById("service").value,
    vehicle_type: document.getElementById("vehicle").value,
    issue: document.getElementById("issue").value,
    latitude: 0,
    longitude: 0,
  };

  post("/bookings/", data).then((res) => {
    alert("Booking created with ID: " + res.id);
  });
}
