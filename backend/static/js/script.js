let selectedCity = "Surat";

const map = L.map('map').setView([24.817, 93.9368], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

map.on('click', async function (e) {
    const { lat, lng } = e.latlng;
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await res.json();
    selectedCity = data.address.city || data.address.town || data.address.state || "Surat";
    alert(`Selected location: ${selectedCity}`);
});

async function fetchThreats() {
    console.log("Fetching for city:", selectedCity);
    try {
        const res = await fetch(`/api/threats?location=${encodeURIComponent(selectedCity)}`);
        const data = await res.json();

        const alertsDiv = document.getElementById("alerts");
        alertsDiv.innerHTML = "";

        if (data.news.length === 0) {
            alertsDiv.innerHTML = `<p class="text-center text-yellow-300">No recent threats found for ${selectedCity}.</p>`;
            return;
        }

        data.news.forEach(n => {
            const div = document.createElement("div");
            div.className = "bg-red-600 p-4 rounded shadow";
            div.innerHTML = `
        <strong class="text-white">[News]</strong> ${n.title}<br>
        <small class="text-gray-300">${n.description}</small><br>
        <em class="text-green-300">${n.advice}</em>
      `;
            alertsDiv.appendChild(div);
        });

    } catch (err) {
        console.error("Error fetching threats:", err);
        document.getElementById("alerts").innerHTML = `<p class="text-center text-red-500">Failed to load threat alerts.</p>`;
    }
}
