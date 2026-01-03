import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function ControlComponent({ playing, setPlaying }: { playing: boolean; setPlaying: (playing: boolean) => void }) {
  return (
    <>
      <TouchableOpacity className="items-center mt-10" onPress={() => setPlaying(!playing)}>
        <Feather name={playing ? "pause" : "play"} size={40} color={"white"} />
      </TouchableOpacity>
    </>
  );
}
