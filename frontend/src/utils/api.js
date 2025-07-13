export async function fetchThreats(city) {
  const res = await fetch(`/api/threats?location=${encodeURIComponent(city)}`);
  if (!res.ok) return { news: [] };
  return await res.json();
}