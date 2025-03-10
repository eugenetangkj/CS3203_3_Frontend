"use client"

import React, { createContext, useState, useEffect, useContext } from 'react';
import { CHECK_USER_AUTH_SERVER_ENDPOINT } from '@/constants/ApiRoutes';
import axios from 'axios';

/**
Authentication context to manage the global authentication states shared across
the different pages.

Built with ChatGPT
*/
interface AuthContextProps {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Add children to the props of AuthProvider
interface AuthProviderProps {
    children: React.ReactNode; // This allows any valid React elements to be passed in so we can wrap any elements around the AuthProvider
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Make an API request to check the authentication status
                const response = await axios.post(CHECK_USER_AUTH_SERVER_ENDPOINT);

                // Update the authentication state based on the server response
                setIsAuthenticated(response.data.isAuthenticated)
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false)
            }
        };
        checkAuthStatus();
    }, []); 


    const login = () => {
        setIsAuthenticated(true);
    }
    const logout = () => {
        setIsAuthenticated(false);
    }

    //Provide access to isAuthenticated, login and logout
    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


//To allow the components to access the auth state variables
export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
