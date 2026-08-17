import React, { createContext, useContext, useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { supabase } from "../services/supabase";
import type { Session } from "@supabase/supabase-js";

export type UserRole = "admin" | "cliente";

export interface User {
    id: string;
    email: string;
    nombre: string;
    rol: UserRole;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, nombre: string) => Promise<{ needsConfirmation: boolean }>;
    logout: () => Promise<void>;
    isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const initialized = useRef(false);

    const loadProfile = useCallback(async (session: Session | null) => {
        if (!session) {
            setUser(null);
            return;
        }

        const { data, error } = await supabase
            .from("profiles")
            .select("nombre, rol")
            .eq("id", session.user.id)
            .maybeSingle();

        if (error) {
            console.error("Error al cargar el perfil:", error.message);
        }

        setUser({
            id: session.user.id,
            email: session.user.email ?? "",
            nombre: data?.nombre ?? "Usuario",
            rol: (data?.rol as UserRole) ?? "cliente",
        });
    }, []);

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!initialized.current) {
                initialized.current = true;
                setLoading(false);
            }
            void loadProfile(session);
        });

        void supabase.auth.getSession().then(({ data }) => {
            void loadProfile(data.session);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, [loadProfile]);

    const login = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
    };

    const signUp = async (email: string, password: string, nombre: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { nombre } },
        });
        if (error) throw error;

        const needsConfirmation = !data.session;
        if (data.session) {
            await loadProfile(data.session);
        }
        return { needsConfirmation };
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
    };

    const isAdmin = user?.rol === "admin";

    return (
        <AuthContext.Provider value={{ user, loading, login, signUp, logout, isAdmin }}>
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