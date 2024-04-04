import { create } from 'zustand';
import axios from "axios";

type EnvState = {
    getIp: () => Promise<string>
};

export const useUserStore = create<EnvState>((set, get) => {
    let ip: string|null = null;

    return {
        getIp: async (): Promise<string> => {
            if (!ip) {
                try {
                    ip = (await axios.get('https://api.ipify.org?format=json')).data.ip;
                } catch (error: any) {
                    console.error('Failed to get IP', error)
                    return ''
                }
            }
            if (!ip) {
                console.error('Failed to get IP')
                return ''
            }

            return ip;
        }
    };
});
