/**
 * Resolve and normalize the API base URL.
 * - If REACT_APP_API_BASE_URL is set, use it (without trailing slash).
 * - Otherwise, default to same-origin (empty string) and rely on CRA proxy for /api.
 */
const RAW_BASE = process.env.REACT_APP_API_BASE_URL || "";
const BASE_URL = RAW_BASE.endsWith("/")
  ? RAW_BASE.slice(0, -1)
  : RAW_BASE;

/**
 * Join base and path, avoiding double slashes.
 * If the path is an absolute URL (http/https), return it untouched.
 */
function buildUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!BASE_URL) return normalizedPath;
  return `${BASE_URL}${normalizedPath}`;
}

/**
 * Internal helper to handle JSON requests with error handling.
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<any>}
 */
async function request(url, options = {}) {
  const target = buildUrl(url);
  const res = await fetch(target, {
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
      (typeof data === "string" && data) ||
      `Request failed with status ${res.status} at ${target}`;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    error.url = target;
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
