import { useState } from "react"

export function useLocalStorageItem(key: string) {
  const [value, setValue] = useState(localStorage.getItem(key));

  return {
    value, 
    setValue: (value: string) => {
      setValue(value);
      localStorage.setItem(key, value);
    }  
  };
}