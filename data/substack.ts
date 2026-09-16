import snapshot from "@/public/data/substack-posts.json";

export type SubstackPost = {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  url: string;
  publishedAt: string;
};

export const substackArchive: { syncedAt: string; posts: SubstackPost[] } = snapshot;
