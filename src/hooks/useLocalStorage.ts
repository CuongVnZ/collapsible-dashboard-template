import { useEffect, useState } from "react";

type LocalStorageProps<T> = {
  key: string;
  defaultValue: T;
};

export default function useLocalStorage<T>({
  key,
  defaultValue,
}: LocalStorageProps<T>) {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) {
      setStoredValue(JSON.parse(item) as T);
    }
  }, [key]);

  const setValue = (value: T) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
}
