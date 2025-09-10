import React from "react";
import { Video } from "../../../stores/useVideoStore";

interface VideoPlaylistProps {
  videos: Video[];
  currentVideoId: string | null;
  onSelectVideo: (id: string) => void;
}

export const VideoPlaylist: React.FC<VideoPlaylistProps> = ({
  videos,
  currentVideoId,
  onSelectVideo,
}) => {
  return (
    <div className="video-playlist">
      {videos.map((video) => (
        <div
          key={video.id}
          className={`video-item ${currentVideoId === video.id ? "active" : ""}`}
          onClick={() => onSelectVideo(video.id)}
        >
          {video.title}
        </div>
      ))}
    </div>
  );
};