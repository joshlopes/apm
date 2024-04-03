import React, { createContext, useContext } from 'react';
import ApiClient from "../services/ApiClient";
import { useEnvStore } from '../stores/useEnvStore';

// Define the context with a type
export const ApiContext = createContext<ApiClient | null>(null);

export default function ApiProvider({ children }: { children: React.ReactNode }) {
    const { getEnv } = useEnvStore();
    const api = new ApiClient(
        getEnv('API_HOST')
    );

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi() {
    return useContext(ApiContext);
}