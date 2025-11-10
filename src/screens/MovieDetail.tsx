import { useState } from "react";
import { Play, Plus, Clock, User, Star, Award, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { StarRating } from "../components/StarRating";
import { ScoreBadge } from "../components/ScoreBadge";
import { StatusChip } from "../components/StatusChip";
import { GenreChips } from "../components/GenreChips";
import { MovieCard } from "../components/MovieCard";
import { CriticBadge } from "../components/CriticBadge";
import { mockMovies, mockReviews } from "../lib/mockData";
import { Movie, MovieStatus } from "../lib/types";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface MovieDetailProps {
  movie?: Movie;
  onNavigate?: (page: string, data?: any) => void;
}

export function MovieDetail({ movie = mockMovies[0], onNavigate }: MovieDetailProps) {
  const [userRating, setUserRating] = useState<number>(0);
  const [status, setStatus] = useState<MovieStatus | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const handleRate = (rating: number) => {
    setUserRating(rating);
    toast.success(`You rated "${movie.title}" ${rating} stars`);
  };

  const handleStatusChange = (newStatus: MovieStatus | null) => {
    setStatus(newStatus);
    if (newStatus) {
      toast.success(`Status updated to ${newStatus}`);
    }
  };

  const similarMovies = mockMovies.filter(m => 
    m.id !== movie.id && m.genres.some(g => movie.genres.includes(g))
  ).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 h-full flex items-end pb-12">
          <div className="flex gap-8 w-full">
            {/* Poster */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="aspect-[2/3] rounded-lg overflow-hidden border-4 border-background-elevated shadow-2xl">
                <ImageWithFallback
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="mb-2">
                {movie.title} <span className="text-foreground-subtle">({movie.year})</span>
              </h1>
              
              <div className="flex items-center gap-4 mb-4 text-muted-foreground">
                <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                <span>•</span>
                <span>Directed by {movie.director}</span>
              </div>

              <GenreChips genres={movie.genres} />

              <div className="flex flex-wrap gap-3 mt-6">
                <Button size="lg" onClick={() => toast.success("Playing trailer...")}>
                  <Play className="h-5 w-5 mr-2" />
                  Watch Trailer
                </Button>
                <Button 
                  size="lg" 
                  variant={isInWatchlist ? "secondary" : "outline"}
                  onClick={() => {
                    setIsInWatchlist(!isInWatchlist);
                    toast.success(isInWatchlist ? "Removed from watchlist" : "Added to watchlist");
                  }}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                </Button>
                <StatusChip status={status} onChange={handleStatusChange} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Rating Section */}
            <div className="bg-card-elevated rounded-lg p-6 mb-6">
              <h3 className="mb-4">Rate This Movie</h3>
              <StarRating
                rating={userRating}
                onChange={handleRate}
                size="lg"
                showValue={false}
              />
              {userRating > 0 && (
                <p className="mt-2 text-muted-foreground">
                  You rated this movie {userRating} out of 5 stars
                </p>
              )}
            </div>

            {/* Scores */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-card-elevated rounded-lg p-6">
                <ScoreBadge type="user" score={movie.userRating} showLabel size="lg" />
                <p className="mt-2 text-sm text-muted-foreground">Based on 12,547 ratings</p>
              </div>
              <div className="bg-card-elevated rounded-lg p-6">
                <ScoreBadge type="critic" score={movie.criticScore} showLabel size="lg" />
                <p className="mt-2 text-sm text-muted-foreground">Based on 47 reviews</p>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="quotes">Quotes</TabsTrigger>
                <TabsTrigger value="trivia">Trivia</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h3 className="mb-3">Synopsis</h3>
                  <p className="text-foreground-subtle">{movie.synopsis}</p>
                </div>

                <div>
                  <h3 className="mb-3">Cast</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map((actor) => (
                      <div key={actor} className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{actor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="bg-card-elevated rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.authorName}</span>
                            {review.isCritic && <CriticBadge size="sm" />}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{review.createdAt}</span>
                            <span>•</span>
                            <StarRating rating={review.rating} size="sm" readonly />
                          </div>
                        </div>
                      </div>
                      {review.criticScore && (
                        <ScoreBadge type="critic" score={review.criticScore} size="sm" />
                      )}
                    </div>
                    <h4 className="mb-2">{review.title}</h4>
                    <p className="text-foreground-subtle mb-4">{review.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{review.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                ))}
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => onNavigate?.("review-editor", movie)}
                >
                  Write a Review
                </Button>
              </TabsContent>

              <TabsContent value="quotes">
                <div className="text-center py-12 text-muted-foreground">
                  <p>No quotes available yet. Be the first to add one!</p>
                </div>
              </TabsContent>

              <TabsContent value="trivia">
                <div className="text-center py-12 text-muted-foreground">
                  <p>No trivia available yet. Be the first to add some!</p>
                </div>
              </TabsContent>

              <TabsContent value="gallery">
                <div className="text-center py-12 text-muted-foreground">
                  <p>No images available yet.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Similar Movies */}
            <div>
              <h3 className="mb-4">Similar Movies</h3>
              <div className="space-y-4">
                {similarMovies.map((similarMovie) => (
                  <MovieCard
                    key={similarMovie.id}
                    {...similarMovie}
                    onClick={() => onNavigate?.("movie-detail", similarMovie)}
                  />
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="bg-card-elevated rounded-lg p-6">
              <h4 className="mb-3">Share</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
