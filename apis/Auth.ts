import { TokenApp } from "@/types/Token";
import { instance } from "./AxiosInstance";

export const LoginAPI = async (email: string, password: string): Promise<TokenApp> => {
    const res = await instance().post("/users/login", { email, password });
    return res.data;
}