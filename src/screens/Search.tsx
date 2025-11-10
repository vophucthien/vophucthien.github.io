import { useState } from "react";
import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { MovieCard } from "../components/MovieCard";
import { GenreChips } from "../components/GenreChips";
import { EmptyState } from "../components/EmptyState";
import { Skeleton } from "../components/ui/skeleton";
import { mockMovies, allGenres } from "../lib/mockData";
import { Movie } from "../lib/types";

interface SearchProps {
  initialGenre?: string;
  onNavigate?: (page: string, data?: any) => void;
}

export function Search({ initialGenre, onNavigate }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    initialGenre ? [initialGenre] : []
  );
  const [yearRange, setYearRange] = useState([1990, 2024]);
  const [minUserRating, setMinUserRating] = useState([0]);
  const [minCriticScore, setMinCriticScore] = useState([0]);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const filteredMovies = mockMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenres.length === 0 || 
      selectedGenres.some(g => movie.genres.includes(g));
    const matchesYear = movie.year >= yearRange[0] && movie.year <= yearRange[1];
    const matchesRating = movie.userRating >= minUserRating[0];
    const matchesScore = movie.criticScore >= minCriticScore[0];
    
    return matchesSearch && matchesGenre && matchesYear && matchesRating && matchesScore;
  });

  const clearFilters = () => {
    setSelectedGenres([]);
    setYearRange([1990, 2024]);
    setMinUserRating([0]);
    setMinCriticScore([0]);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search movies, shows, people..."
            className="pl-12 pr-12 h-14 text-lg bg-card-elevated border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-card-elevated rounded-lg p-6 mb-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3>Filters</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Genres */}
          <div>
            <label className="block mb-3">Genres</label>
            <GenreChips
              genres={allGenres}
              selectedGenres={selectedGenres}
              onToggle={handleGenreToggle}
              variant="filter"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Year Range */}
            <div>
              <label className="block mb-3">
                Year Range: {yearRange[0]} - {yearRange[1]}
              </label>
              <Slider
                min={1900}
                max={2024}
                step={1}
                value={yearRange}
                onValueChange={setYearRange}
                className="w-full"
              />
            </div>

            {/* User Rating */}
            <div>
              <label className="block mb-3">
                Min User Rating: {minUserRating[0].toFixed(1)}+
              </label>
              <Slider
                min={0}
                max={5}
                step={0.1}
                value={minUserRating}
                onValueChange={setMinUserRating}
                className="w-full"
              />
            </div>

            {/* Critic Score */}
            <div>
              <label className="block mb-3">
                Min Critic Score: {minCriticScore[0]}+
              </label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={minCriticScore}
                onValueChange={setMinCriticScore}
                className="w-full"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="block mb-3">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2>
            {searchQuery ? `Results for "${searchQuery}"` : "All Movies"}
          </h2>
          <p className="text-muted-foreground">
            {filteredMovies.length} {filteredMovies.length === 1 ? "movie" : "movies"} found
          </p>
        </div>
        {!showFilters && (
          <Button variant="outline" onClick={() => setShowFilters(true)}>
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-[2/3] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Results Grid */}
      {!isLoading && filteredMovies.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              {...movie}
              onClick={() => onNavigate?.("movie-detail", movie)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredMovies.length === 0 && (
        <EmptyState
          icon={SearchIcon}
          title="No movies found"
          description="Try adjusting your search or filters to find what you're looking for."
          actionLabel="Clear Filters"
          onAction={clearFilters}
        />
      )}
    </div>
  );
}
