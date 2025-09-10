import React from "react";
import { useSound } from "@/hooks/useSound";
import { SOUNDS } from "@/config/sounds";
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
} from "react-icons/io5";
import { useVideoStore } from "@/stores/useVideoStore";

interface VideoControlsProps {
  isPlaying: boolean;
  isShuffled: boolean;
  loopAll: boolean;
  loopCurrent: boolean;
  onPlayPause: () => void;
  onShuffle: () => void;
  onLoopAll: () => void;
  onLoopCurrent: () => void;
  onShare: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  isShuffled,
  loopAll,
  loopCurrent,
  onPlayPause,
  onShuffle,
  onLoopAll,
  onLoopCurrent,
  onShare,
}) => {
  const { setCurrentVideoId } = useVideoStore();
  const { play: playClickSound } = useSound(SOUNDS.CHORD_SUCCESS);

  const handleNext = () => {
    const { videos, videoIndexById, currentVideoId } = useVideoStore.getState();
    if (!currentVideoId || videos.length === 0) return;
    
    const currentIndex = videoIndexById[currentVideoId] ?? -1;
    if (currentIndex === -1) return;

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
    if (!currentVideoId || videos.length === 0) return;
    
    const currentIndex = videoIndexById[currentVideoId] ?? -1;
    if (currentIndex === -1) return;

    let prevIndex;
    if (isShuffled) {
      prevIndex = Math.floor(Math.random() * videos.length);
    } else {
      prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    }
    setCurrentVideoId(videos[prevIndex].id);
    playClickSound();
  };

  return (
    <div className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-800">
      <div className="flex items-center space-x-2">
        <button onClick={handlePrev} className="p-2">
          <FaStepBackward />
        </button>
        <button onClick={onPlayPause} className="p-2">
          {isPlaying ? <IoPauseOutline size={24} /> : <IoPlayOutline size={24} />}
        </button>
        <button onClick={handleNext} className="p-2">
          <FaStepForward />
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onShuffle}
          className={`p-2 ${isShuffled ? "text-blue-500" : ""}`}
        >
          <FaRandom />
        </button>
        <button
          onClick={onLoopAll}
          className={`p-2 ${loopAll ? "text-blue-500" : ""}`}
        >
          <FaRetweet />
        </button>
        <button
          onClick={onLoopCurrent}
          className={`p-2 ${loopCurrent ? "text-blue-500" : ""}`}
        >
          <FaSync />
        </button>
        <button onClick={onShare} className="p-2">
          <FaShareSquare />
        </button>
      </div>
    </div>
  );
};

export default VideoControls;