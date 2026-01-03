import axios from "axios";
import Constants from "expo-constants";

export const instance = () => {
  const ip: string = Constants.manifest2?.extra?.expoClient?.hostUri.split(":")[0];
  const port = process.env.PORT || 3001;
  return axios.create({
    baseURL: `http://${ip}:${port}/api/v1`,
    headers: { "Content-Type": "application/json" }
  });
};
