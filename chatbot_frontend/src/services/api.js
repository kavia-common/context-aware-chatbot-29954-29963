const BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

/**
 * Internal helper to handle JSON requests with error handling.
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<any>}
 */
async function request(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json().catch(() => ({})) : await res.text();

  if (!res.ok) {
    const message =
      (data && data.message) ||
      (typeof data === "string" ? data : "Request failed");
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

// PUBLIC_INTERFACE
export async function getChatHistory() {
  /** Fetch chat history from the backend. Returns an array of messages. */
  return request("/api/chat/history", { method: "GET" });
}

// PUBLIC_INTERFACE
export async function sendChatMessage(message) {
  /** Send a message to the backend and receive the bot response. */
  return request("/api/chat/send", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}
