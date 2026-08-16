import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type UserRole = "admin" | "cliente";

export interface User {
    email: string;
    nombre: string;
    rol: UserRole;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, rol: UserRole, nombre?: string) => void;
    logout: () => void;
    isAdmin: boolean;
}

const STORAGE_KEY = "nexshop_user";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, [user]);

    const login = (email: string, rol: UserRole, nombre?: string) => {
        const defaultName = email.split("@")[0] || "Usuario";
        const newUser: User = {
            email,
            rol,
            nombre: nombre || (defaultName.charAt(0).toUpperCase() + defaultName.slice(1)),
        };
        setUser(newUser);
    };

    const logout = () => {
        setUser(null);
    };

    const isAdmin = user?.rol === "admin";

    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};
