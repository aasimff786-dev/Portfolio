export type VideoProvider = "vimeo" | "youtube";

export interface showReelI {
  title: string;
  provider: VideoProvider;
  videoId: string;
  thumbnail: string;
  stats: {
    views: number;
    likes: number;
    comments: number;
    repost: number;
  };
}

/** High-res Vimeo thumbnail via vumbnail.com (free, no API key). */
function vimeoThumb(id: string) {
  return `https://vumbnail.com/${id}_large.jpg`;
}

/** High-res YouTube thumbnail (no API key needed). */
function youtubeThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

// Example project data — replace with your own Vimeo/YouTube IDs, titles, and stats.
export const showRealData: showReelI[] = [
  {
    title: "Project One",
    provider: "youtube",
    videoId: "A08Ur5F8JGc", // https://youtu.be/A08Ur5F8JGc
    thumbnail: youtubeThumb("A08Ur5F8JGc"),
    stats: {
      views: 100000,
      likes: 10000,
      comments: 100,
      repost: 500,
    },
  },
  {
    title: "Project Two",
    provider: "youtube",
    videoId: "CZ4nRSVJB8A", // https://youtube.com/watch?v=CZ4nRSVJB8A
    thumbnail: youtubeThumb("CZ4nRSVJB8A"),
    stats: {
      views: 100000,
      likes: 10000,
      comments: 100,
      repost: 500,
    },
  },
  {
    title: "Project Three",
    provider: "vimeo",
    videoId: "000000000", // TODO: replace with your Vimeo ID
    thumbnail: vimeoThumb("000000000"),
    stats: {
      views: 100000,
      likes: 10000,
      comments: 100,
      repost: 500,
    },
  },
  {
    title: "Project Four",
    provider: "vimeo",
    videoId: "000000000", // TODO: replace with your Vimeo ID
    thumbnail: vimeoThumb("000000000"),
    stats: {
      views: 100000,
      likes: 10000,
      comments: 100,
      repost: 500,
    },
  },
  {
    title: "Project Five",
    provider: "vimeo",
    videoId: "000000000", // TODO: replace with your Vimeo ID
    thumbnail: vimeoThumb("000000000"),
    stats: {
      views: 100000,
      likes: 10000,
      comments: 100,
      repost: 500,
    },
  },
];
