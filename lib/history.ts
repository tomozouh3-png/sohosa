import { useSyncExternalStore } from "react";

export type HistoryItem = {
  text: string;
  date: string; // ISO timestamp
};

const STORAGE_KEY = "dna-tool:history";
const MAX_ITEMS = 30;

const EMPTY_HISTORY: HistoryItem[] = [];

let snapshot: HistoryItem[] = EMPTY_HISTORY;
let initialized = false;
const listeners = new Set<() => void>();

function readFromStorage(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is HistoryItem =>
        typeof item === "object" &&
        item !== null &&
        typeof item.text === "string" &&
        typeof item.date === "string"
    );
  } catch {
    return [];
  }
}

function writeToStorage(items: HistoryItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage unavailable (private browsing, quota exceeded, etc.) - ignore.
  }
}

function ensureInitialized(): void {
  if (initialized) return;
  initialized = true;
  snapshot = readFromStorage();
}

function setSnapshot(items: HistoryItem[]): void {
  snapshot = items;
  writeToStorage(items);
  for (const listener of listeners) listener();
}

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function getSnapshot(): HistoryItem[] {
  ensureInitialized();
  return snapshot;
}

function getServerSnapshot(): HistoryItem[] {
  return EMPTY_HISTORY;
}

/**
 * Exposes the localStorage-backed input history through useSyncExternalStore
 * (rather than useEffect + setState) so mount-time hydration stays correct
 * without tripping the react-hooks/set-state-in-effect lint rule.
 */
export function useHistory() {
  const history = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function addItem(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;
    const next = [
      { text: trimmed, date: new Date().toISOString() },
      ...snapshot.filter((item) => item.text !== trimmed),
    ].slice(0, MAX_ITEMS);
    setSnapshot(next);
  }

  function clear(): void {
    setSnapshot([]);
  }

  return { history, addItem, clear };
}
