import React, { useRef, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { AppProps } from "../../../types/apps";
import { useVideoStore } from "../../../stores/useVideoStore";
import { VideoControls } from "./VideoControls";
import { VideoPlaylist } from "./VideoPlaylist";

export const VideosComponent: React.FC<AppProps> = ({ initialData }) => {
  const {
    videos,
    currentVideoId,
    isPlaying,
    isShuffled,
    loopAll,
    loopCurrent,
    setCurrentVideoId,
    setIsPlaying,
    togglePlay,
    setLoopAll,
    setLoopCurrent,
    setIsShuffled,
    getCurrentIndex,
    isPlaylistVisible,
  } = useVideoStore();

  const playerRef = useRef<any | null>(null);

  useEffect(() => {
    if (initialData?.id && videos.find((v) => v.id === initialData.id)) {
      setCurrentVideoId(initialData.id);
      setIsPlaying(true);
    }
  }, [initialData, videos, setCurrentVideoId, setIsPlaying]);

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  const onReady = (event: { target: any }) => {
    playerRef.current = event.target;
  };

  const onEnd = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex === -1) return;

    if (loopCurrent) {
      playerRef.current?.seekTo(0, true);
      playerRef.current?.playVideo();
    } else if (isShuffled) {
      const nextIndex = Math.floor(Math.random() * videos.length);
      setCurrentVideoId(videos[nextIndex].id);
    } else if (currentIndex < videos.length - 1) {
      setCurrentVideoId(videos[currentIndex + 1].id);
    } else if (loopAll) {
      setCurrentVideoId(videos[0].id);
    } else {
      setIsPlaying(false);
    }
  };

  const onStateChange = (event: { data: number }) => {
    // data === 1 means playing, 2 means paused
    if (event.data === 1 && !isPlaying) {
      setIsPlaying(true);
    } else if (event.data === 2 && isPlaying) {
      setIsPlaying(false);
    }
  };

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
      iv_load_policy: 3,
      controls: 1,
    },
  };

  const handleShare = () => {
    if (currentVideoId) {
      const video = videos.find((v) => v.id === currentVideoId);
      if (video) {
        const shareUrl = `${window.location.origin}/videos/${currentVideoId}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
          // Maybe show a notification that link is copied
          console.log("Share URL copied to clipboard:", shareUrl);
        });
      }
    }
  };

  return (
    <div className="flex h-full bg-black">
      <div className="flex flex-col flex-grow">
        <div className="flex-grow relative">
          {currentVideoId ? (
            <YouTube
              videoId={currentVideoId}
              opts={opts}
              onReady={onReady}
              onEnd={onEnd}
              onStateChange={onStateChange}
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-black flex items-center justify-center text-white">
              <p>No video selected.</p>
            </div>
          )}
        </div>
        <VideoControls
          isPlaying={isPlaying}
          isShuffled={isShuffled}
          loopAll={loopAll}
          loopCurrent={loopCurrent}
          onPlayPause={togglePlay}
          onShuffle={() => setIsShuffled(!isShuffled)}
          onLoopAll={() => setLoopAll(!loopAll)}
          onLoopCurrent={() => setLoopCurrent(!loopCurrent)}
          onShare={handleShare}
        />
      </div>
      {isPlaylistVisible && (
        <div className="w-64 flex-shrink-0 border-l border-gray-300">
          <VideoPlaylist
            videos={videos}
            currentVideoId={currentVideoId}
            onSelectVideo={setCurrentVideoId}
          />
        </div>
      )}
    </div>
  );
};