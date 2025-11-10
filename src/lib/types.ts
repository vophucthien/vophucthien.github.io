export type UserRole = "user" | "critic" | "moderator" | "admin";

export type MovieStatus = "watched" | "watching" | "want";

export interface Movie {
  id: string;
  title: string;
  year: number;
  runtime: number;
  posterUrl: string;
  backdropUrl: string;
  director: string;
  cast: string[];
  genres: string[];
  synopsis: string;
  userRating: number;
  criticScore: number;
  trailerUrl?: string;
}

export interface Review {
  id: string;
  movieId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  isCritic: boolean;
  rating: number;
  criticScore?: number;
  title: string;
  content: string;
  spoilers: boolean;
  likes: number;
  createdAt: string;
}

export interface List {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  itemCount: number;
  isPublic: boolean;
  createdAt: string;
  movies: Movie[];
}

export interface Report {
  id: string;
  type: "spam" | "offensive" | "spoiler" | "copyright";
  contentType: "review" | "comment" | "list";
  contentId: string;
  contentPreview: string;
  reporterId: string;
  reporterName: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio: string;
  role: UserRole;
  stats: {
    ratingsCount: number;
    reviewsCount: number;
    avgRating: number;
    timeWatched: number; // in hours
  };
}
