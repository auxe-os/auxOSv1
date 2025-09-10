import React from "react";
import { useSound } from "@/hooks/useSound";
import {
  FaRandom,
  FaRetweet,
  FaStepBackward,
  FaStepForward,
  FaSync,
  FaShareSquare,
} from "react-icons/fa";
import {
  IoPlayOutline,
  IoPauseOutline,
  IoVolumeHighOutline,
  IoVolumeMuteOutline,
} from "react-icons/io5";
import { useVideoStore } from "@/stores/useVideoStore";

const VideoControls: React.FC = () => {
  const {
    videos,
    setCurrentVideoId,
    getCurrentIndex,
    isShuffled,
    setIsShuffled,
    togglePlay,
    isPlaying,
  } = useVideoStore();
  const { play: playClickSound } = useSound(SOUNDS.CHORD_SUCCESS);
  const { play: playToggleSound } = useSound(SOUNDS.TOGGLE_SOUND);

  const handleNext = () => {
    const { videos, videoIndexById, currentVideoId } = useVideoStore.getState();
    const currentIndex = videoIndexById[currentVideoId];
    if (videos.length === 0) return;

    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * videos.length);
    } else {
      nextIndex = (currentIndex + 1) % videos.length;
    }
    setCurrentVideoId(videos[nextIndex].id);
    playClickSound();
  };

  const handlePrev = () => {
    const { videos, videoIndexById, currentVideoId } = useVideoStore.getState();
    const currentIndex = videoIndexById[currentVideoId];
    if (videos.length === 0) return;

    let prevIndex;
    if (isShuffled) {
      prevIndex = Math.floor(Math.random() * videos.length);
    } else {
      prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    }
    setCurrentVideoId(videos[prevIndex].id);
    playClickSound();
  };

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
    playToggleSound();
  };

  const handleLoopAll = () => {
    setLoopAll(!loopAll);
    playToggleSound();
  };

  const handleLoopCurrent = () => {
    setLoopCurrent(!loopCurrent);
    playToggleSound();
  };

  return (
    <div className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-800">
      <div className="flex items-center space-x-2">
        <button onClick={handlePrev} className="p-2">
          <FaStepBackward />
        </button>
        <button onClick={togglePlay} className="p-2">
          {isPlaying ? <IoPauseOutline size={24} /> : <IoPlayOutline size={24} />}
        </button>
        <button onClick={handleNext} className="p-2">
          <FaStepForward />
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleShuffle}
          className={`p-2 ${isShuffled ? "text-blue-500" : ""}`}
        >
          <FaRandom />
        </button>
        <button
          onClick={handleLoopAll}
          className={`p-2 ${loopAll ? "text-blue-500" : ""}`}
        >
          <FaRetweet />
        </button>
        <button
          onClick={handleLoopCurrent}
          className={`p-2 ${loopCurrent ? "text-blue-500" : ""}`}
        >
          <FaSync />
        </button>
        <button className="p-2">
          <FaShareSquare />
        </button>
      </div>
    </div>
  );
};

export default VideoControls;