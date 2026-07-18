const STORAGE_KEY = "erbsen-chip-heist-player-key";

export function getOrCreatePlayerKey(): string {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;
  const key = crypto.randomUUID();
  window.localStorage.setItem(STORAGE_KEY, key);
  return key;
}
