const API_BASE = "http://127.0.0.1:8000";

function post(url, data) {
  return fetch(API_BASE + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
