export async function fetchUserLocation() {
  try {
    const res = await fetch("https://ipinfo.io/json");
    const data = await res.json();
    return data.city || "Surat";
  } catch {
    return "Surat";
  }
}