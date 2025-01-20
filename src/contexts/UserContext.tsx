import React, {createContext, ReactNode, useContext, useEffect} from 'react';
import {getApiUrl} from "../scripts/fetchers.ts";
import useLocalStorage from "../hooks/LocalStorageHook.tsx";

type UserProviderProps = {
    children: ReactNode;
};

export type UserDetails = {
    id: string;
    username: string;
    email: string;
    admin: boolean;
};

export interface UserContextData {
    user: UserDetails | null;
    register: (username: string, password: string, email: string) => Promise<string | null>;
    login: (username: string, password: string) => Promise<string | null>;
    logout: () => Promise<string | null>;
    fetchWithAuth: (endpoint: string, options?: any) => Promise<any>;
    isAuthenticated: () => boolean;
    isAdmin: () => boolean;
}

// Create a context with null as its default value
const UserContext = createContext<UserContextData>({
    user: null,
    register: () => {
        return new Promise(() => null);
    },
    login: () => {
        return new Promise(() => null);
    },
    logout: () => {
        return new Promise(() => null);
    },
    fetchWithAuth: () => {
        return new Promise(() => null);
    },
    isAuthenticated: () => {
        return false;
    },
    isAdmin: () => {
        return false;
    }
});

export const UserProvider: React.FC<UserProviderProps> = ({children}: UserProviderProps) => {
    const [user, setUser] = useLocalStorage<UserDetails | null>("user", null);
    const [accessToken, setAccessToken] = useLocalStorage<string | null>("access_token", null);
    const [refreshToken, setRefreshToken] = useLocalStorage<string | null>("refresh_token", null);

    function store(json?: any): void {
        if (!json) {
            setUser(null);
            setAccessToken(null);
            setRefreshToken(null);
            return;
        }

        const userData: any = json.user;
        if (!userData) {
            console.error("Cannot store invalid user data");
            return;
        }
        setUser({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            admin: userData.is_admin || userData.admin
        });
        if (json.csrf_refresh_token) {
            setRefreshToken(json.csrf_refresh_token);
        }
        setAccessToken(json.csrf_access_token);
    }

    const register = async (username: string, password: string, email: string): Promise<string | null> => {
        try {
            const res = await fetch(`${getApiUrl()}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                }),
                credentials: "include"
            });
            if (res.status === 201) {
                return await login(username, password);
            }
            const json = await res.json();
            return json.message || json.error || "Network response was not ok";
        } catch (err) {
            store();
            console.error(err);
            return "Failed to register";
        }
    }

    const login = async (username: string, password: string): Promise<string | null> => {
        try {
            const res: Response = await fetch(`${getApiUrl()}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({username, password})
            });
            const json: any = await res.json();
            if (res.ok) {
                store(json);
                return null;
            }
            return json.message || json.error || "Network response was not ok"
        } catch (err: Error | any) {
            store();
            console.error(err);
            return "Login error";
        }
    };

    const logout = async (): Promise<string | null> => {
        try {
            store();
            const res: Response = await fetch(`${getApiUrl()}/users/logout`, {
                method: "POST",
                headers: accessToken ? {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": accessToken
                } : {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({})
            });
            const json: null | any = await res.json();
            return json ? json.message : null;
        } catch (err) {
            console.error(err);
            return "Logout error";
        }
    };

    const refreshAccessToken = async (): Promise<boolean> => {
        if (!refreshToken) {
            return false;
        }
        try {
            const res: Response = await fetch(`${getApiUrl()}/users/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": refreshToken
                },
                credentials: "include"
            });
            if (res.ok) {
                const json: any = await res.json();
                store(json)
                return true;
            }
            store();
            return false;
        } catch (err) {
            store();
            console.error(err);
            return false;
        }
    };

    const fetchWithAuth = async (endpoint: string, options: any = undefined, refresh: boolean = true): Promise<Response | any> => {
        if (!options) {
            options = {};
        }
        options.headers = accessToken ? {...options.headers, "X-CSRF-TOKEN": accessToken} : {...options.headers};
        try {
            const res: Response = await fetch(`${getApiUrl()}/${endpoint}`, {
                ...options,
                credentials: "include"
            });
            if (res.ok) {
                return res;
            } else if (res.status === 401 && refresh) {
                console.log("Access token expired, attempting to refresh");
                if (await refreshAccessToken()) {
                    return fetchWithAuth(endpoint, options, false);
                }
                return res;
            }
            return res;
        } catch (err) {
            console.error(err);
            return err;
        }
    };

    const isAuthenticated = (): boolean => {
        return user !== null && accessToken !== null;
    };

    const isAdmin = (): boolean => {
        return isAuthenticated() && (user?.admin || false);
    };

    useEffect(() => {
        if (!user || !accessToken) {
            refreshAccessToken();
        }
    });

    return (
        <UserContext.Provider value={{user, register, login, logout, fetchWithAuth, isAuthenticated, isAdmin}}>
            {children}
        </UserContext.Provider>
    );
};

// Hook for easier usage of the context
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = (): UserContextData => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};