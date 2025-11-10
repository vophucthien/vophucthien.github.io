import { useState } from "react";
import { Trophy, TrendingUp, Award, Filter } from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { MovieCard } from "../components/MovieCard";
import { ScoreBadge } from "../components/ScoreBadge";
import { GenreChips } from "../components/GenreChips";
import { mockMovies, allGenres } from "../lib/mockData";
import { Movie } from "../lib/types";

interface RankingsProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function Rankings({ onNavigate }: RankingsProps) {
  const [scoreType, setScoreType] = useState<"user" | "critic">("user");
  const [filterGenre, setFilterGenre] = useState<string>("all");
  const [filterYear, setFilterYear] = useState<string>("all");

  // Create a larger ranked list by duplicating and modifying mock data
  const rankedMovies = [...Array(20)].map((_, idx) => {
    const baseMovie = mockMovies[idx % mockMovies.length];
    return {
      ...baseMovie,
      id: `${baseMovie.id}-${idx}`,
      rank: idx + 1,
      userRating: 5 - (idx * 0.02),
      criticScore: 100 - (idx * 0.8),
    };
  });

  const filteredMovies = rankedMovies.filter((movie) => {
    const matchesGenre = filterGenre === "all" || movie.genres.includes(filterGenre);
    const matchesYear =
      filterYear === "all" ||
      (filterYear === "2024" && movie.year === 2024) ||
      (filterYear === "2023" && movie.year === 2023) ||
      (filterYear === "pre-2023" && movie.year < 2023);
    return matchesGenre && matchesYear;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background-elevated to-background border-b border-border-subtle">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-warning" />
            </div>
            <h1>Top 250 Movies</h1>
          </div>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            The greatest films of all time, ranked by our community of movie lovers and professional critics
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Score Type Toggle */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex p-1 bg-card-elevated rounded-lg gap-1">
            <Button
              variant={scoreType === "user" ? "default" : "ghost"}
              onClick={() => setScoreType("user")}
              className="gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              User Ratings
            </Button>
            <Button
              variant={scoreType === "critic" ? "default" : "ghost"}
              onClick={() => setScoreType("critic")}
              className="gap-2"
            >
              <Award className="h-4 w-4" />
              Critic Scores
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={filterGenre} onValueChange={setFilterGenre}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {allGenres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="pre-2023">Before 2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-muted-foreground">
            Showing {filteredMovies.length} movies
          </p>
        </div>

        {/* Rankings List */}
        <div className="space-y-3">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="group flex items-center gap-4 p-4 bg-card-elevated rounded-lg hover:bg-card-elevated/80 border border-border hover:border-primary transition-all cursor-pointer"
              onClick={() => onNavigate?.("movie-detail", movie)}
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-16 shrink-0">
                {movie.rank <= 3 ? (
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      movie.rank === 1
                        ? "bg-warning text-warning-foreground"
                        : movie.rank === 2
                        ? "bg-muted text-foreground"
                        : "bg-chart-4/20 text-chart-4"
                    }`}
                  >
                    <Trophy className="h-6 w-6" />
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-muted-foreground">
                    {movie.rank}
                  </span>
                )}
              </div>

              {/* Poster */}
              <div className="w-16 h-24 rounded overflow-hidden bg-background shrink-0">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="truncate mb-1">{movie.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {movie.year} • {movie.director}
                </p>
                <GenreChips genres={movie.genres.slice(0, 3)} />
              </div>

              {/* Scores */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-center">
                  <ScoreBadge
                    type={scoreType}
                    score={scoreType === "user" ? movie.userRating : movie.criticScore}
                    size="lg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {scoreType === "user" ? "User Score" : "Critic Score"}
                  </p>
                </div>
                
                {scoreType === "user" ? (
                  <div className="text-center px-4 py-2 rounded-lg bg-critic-score/10 border border-critic-score/20">
                    <p className="text-lg font-semibold text-critic-score">
                      {movie.criticScore}
                    </p>
                    <p className="text-xs text-muted-foreground">Critic</p>
                  </div>
                ) : (
                  <div className="text-center px-4 py-2 rounded-lg bg-user-score/10 border border-user-score/20">
                    <p className="text-lg font-semibold text-user-score">
                      {movie.userRating.toFixed(1)} ★
                    </p>
                    <p className="text-xs text-muted-foreground">User</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg">
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
}
