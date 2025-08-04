"use client";

import CustomCursor from "@/components/CustomCursor";
import AudioPlayer from "@/components/AudioPlayer";

export default function GlobalClientComponents() {
  return (
    <>
      <CustomCursor />
      <AudioPlayer src="/music/Morning in a Cup.mp3" />
    </>
  );
}
