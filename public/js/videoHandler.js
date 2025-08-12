const videoGrid = document.getElementById("video_grid");

export function createVideo() {
  const video = document.createElement("video");
  video.autoplay = true;
  video.playsInline = true;
  videoGrid.appendChild(video);
  return video;
}
export function removeVideo(video) {
  if (video) {
    videoGrid.removeChild(video);
  }
}
