import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  function getStoredValue(key: string) {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  }

  const [storedValue, setStoredValue] = useState<T>(() => getStoredValue(key));

  const setValue = (value: T | ((val: T) => T)) => {
    localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  return [storedValue, setValue];
}
