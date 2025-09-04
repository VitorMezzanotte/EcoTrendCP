import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue){
  const [value, setValue] = useState(()=>{
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch(e){
      console.error('localStorage read error', e);
      return initialValue;
    }
  });

  useEffect(()=>{
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch(e){
      console.error('localStorage write error', e);
    }
  }, [key, value]);

  return [value, setValue];
}
