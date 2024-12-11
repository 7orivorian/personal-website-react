import React, {createContext, ReactNode, useContext, useState} from 'react';

type UserProviderProps = {
    children: ReactNode;
};

export type UserDetails = {
    id: string;
    name: string;
    email: string;
};

export interface UserContextData {
    user: UserDetails | null;
    login: (email: string, password: string) => Promise<string | null>;
    logout: () => Promise<string | null>;
    fetchWithAuth: (url: string, options: any) => Promise<any>;
}

// Create a context with null as its default value
const UserContext = createContext<UserContextData>({
    user: null,
    login: () => {
        return new Promise(() => null);
    },
    logout: () => {
        return new Promise(() => null);
    },
    fetchWithAuth: () => {
        return new Promise(() => null);
    }
});

export const UserProvider: React.FC<UserProviderProps> = ({children}: UserProviderProps) => {
    const [user, setUser] = useState<UserDetails | null>(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");


    function storeToken(token: string): void {
        localStorage.setItem("token", token);
        setToken(token);
    }

    const login = (email: string, password: string): Promise<string | null> => {
        return fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({email, password})
        }).then(res => {
            return res.json().then(json => {
                if (!res.ok) {
                    throw Error(json.message || json.error || "Network response was not ok")
                }
                return json;
            });
        }).then(json => {
            setUser(json);
            storeToken(json.csrf_access_token);
            return null;
        }).catch(err => {
            console.error(err);
            setUser(null);
            return err;
        });
    };

    const logout = (): Promise<string | null> => {
        return fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token
            },
            credentials: "include",
            body: JSON.stringify({})
        }).then(res => {
            setUser(null);
            if (res.ok) {
                return null;
            }
            return res.json();
        }).then(json => {
            return json ? json.message : null;
        }).catch(err => {
            console.error(err);
            setUser(null);
            return err;
        });
    };

    const fetchWithAuth = (url: string, options: any): Promise<any> => {
        if (!options) {
            options = {};
        }
        options.headers = {...options.headers, "X-CSRF-TOKEN": token};
        return fetch(url, {
            ...options,
            credentials: "include"
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return res.json().then(json => {
                throw Error(json.message || json.error || "Network response was not ok")
            });
        })
    }

    return (
        <UserContext.Provider value={{user, login, logout, fetchWithAuth}}>
            {children}
        </UserContext.Provider>
    );
};

// Hook for easier usage of the context
export const useUser = (): UserContextData => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};