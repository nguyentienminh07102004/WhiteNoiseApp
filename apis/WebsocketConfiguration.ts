import { io } from "socket.io-client";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

export default function WebsocketConfig() {
  try {
    const token = SecureStore.getItem("token");
    if (!token) return undefined;
    const ip: string = Constants.manifest2?.extra?.expoClient?.hostUri.split(":")[0];
    const port = 3001
    const socket = io(`http://${ip}:${port}`, {
      extraHeaders: {
        authorization: token
      }
    });
    return socket;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
