export async function getAddress({ latitude, longitude }) {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    );
    
    if (!res.ok) {
      throw new Error(`Failed getting address: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    // ✅ Log to see what we actually get
    console.log("🌍 API Response:", data);
    
    // ✅ Validate we got something useful
    if (!data || !data.locality) {
      throw new Error("Invalid address data received");
    }
    
    return data;
    
  } catch (error) {
    console.error("❌ getAddress error:", error);
    throw error;
  }
}