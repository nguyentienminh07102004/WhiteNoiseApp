import { instance } from "./AxiosInstance";

export const getAllWhiteNoises = async (page: number = 1) => {
  const res = await instance().get("/whitenoises", {
    params: { page: page }
  });
  return res.data;
};

export const getWhitenoiseById = async (id: string) => {
    const res = await instance().get(`/whitenoises/${id}`);
    return res.data;
}