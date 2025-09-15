// LocalStorage keys
export const STORAGE_KEYS = {
  RECIPIENTS: "fraction-recipients",
  PERCENTAGES: "fraction-percentages",
  FRACTION_NAME: "fraction-name",
};

// Helper functions for localStorage - for storing the form data on refresh
export const saveToStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }
};

export const loadFromStorage = (key: string, defaultValue: any) => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.warn("Failed to load from localStorage:", error);
      return defaultValue;
    }
  }
  return defaultValue;
};
