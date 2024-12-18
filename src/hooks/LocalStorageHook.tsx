import React, {useEffect, useState} from "react";

export default function useLocalStorage<T extends any | null>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState<T>((): T => {
        try {
            const item: string | null = localStorage.getItem(key);
            return item ? JSON.parse(item) as T : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            if (storedValue) {
                localStorage.setItem(key, JSON.stringify(storedValue));
            } else {
                localStorage.removeItem(key);
            }
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}