const BASE_URL = import.meta.env.VITE_API_SERVER_URL || "";

export async function fetchClient(endpoint, options = {}) {
  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json().catch(() => ({}));

    return { status: response.status, data };
  } catch (err) {
    console.error("Network/Unexpected error:", err);
    throw err;
  }
}

