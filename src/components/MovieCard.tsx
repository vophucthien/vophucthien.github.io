import { Star, Eye, Clock, Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MovieCardProps {
  id: string;
  title: string;
  year: number;
  posterUrl: string;
  userRating?: number;
  criticScore?: number;
  status?: "watched" | "watching" | "want";
  genres?: string[];
  onClick?: () => void;
  onWatchlistToggle?: () => void;
  isInWatchlist?: boolean;
}

export function MovieCard({
  title,
  year,
  posterUrl,
  userRating,
  criticScore,
  status,
  genres = [],
  onClick,
  onWatchlistToggle,
  isInWatchlist = false,
}: MovieCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "watched":
        return { icon: Eye, label: "Watched", color: "bg-success text-success-foreground" };
      case "watching":
        return { icon: Clock, label: "Watching", color: "bg-warning text-warning-foreground" };
      case "want":
        return { icon: Bookmark, label: "Want to Watch", color: "bg-primary text-primary-foreground" };
      default:
        return null;
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div 
      className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-all cursor-pointer"
      onClick={onClick}
    >
      {/* Poster */}
      <div className="aspect-[2/3] relative overflow-hidden bg-background-elevated">
        <ImageWithFallback
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay with quick actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              size="sm"
              variant={isInWatchlist ? "secondary" : "default"}
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                onWatchlistToggle?.();
              }}
            >
              <Bookmark className={`h-4 w-4 mr-2 ${isInWatchlist ? 'fill-current' : ''}`} />
              {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </Button>
          </div>
        </div>

        {/* Status Badge */}
        {statusConfig && (
          <div className="absolute top-2 left-2">
            <Badge className={statusConfig.color}>
              <statusConfig.icon className="h-3 w-3 mr-1" />
              {statusConfig.label}
            </Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium truncate mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{year}</p>

        {/* Ratings */}
        <div className="flex items-center gap-3 mb-3">
          {userRating !== undefined && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-user-score text-user-score" />
              <span className="text-sm font-medium">{userRating.toFixed(1)}</span>
            </div>
          )}
          {criticScore !== undefined && (
            <div className="flex items-center gap-1">
              <div className="px-2 py-0.5 rounded bg-critic-score/10 border border-critic-score/20">
                <span className="text-sm font-medium text-critic-score">{criticScore}</span>
              </div>
            </div>
          )}
        </div>

        {/* Genres */}
        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {genres.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
