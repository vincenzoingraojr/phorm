import { createContext, useContext, useState, useEffect, FunctionComponent, ReactNode } from "react";
import { setToken } from "../utils/token";
import axiosInstance from "../utils/axios";

interface AuthProvideProps {
    children: ReactNode;
}

interface AuthContextProps {
    loading: boolean;
    isAuth: boolean;
    login: (accessToken: string) => Promise<void>;
    logout: () => Promise<void>;
}
  
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    
    return context;
};

export const AuthProvider: FunctionComponent<AuthProvideProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        axiosInstance.post("/").then(async (response) => {
            const { accessToken } = await response.data;
            console.log(accessToken);
            await setToken(accessToken);

            if (accessToken && accessToken !== "") {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        });

        setLoading(false);
    }, []);

    const login = async (accessToken: string) => {
        await setToken(accessToken);
        setIsAuth(true);
    };

    const logout = async () => {
        await setToken("");
        setIsAuth(false);
    };

    const value = {
        loading,
        isAuth,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
