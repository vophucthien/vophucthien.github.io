import { Badge } from "./ui/badge";
import { X } from "lucide-react";

interface GenreChipsProps {
  genres: string[];
  selectedGenres?: string[];
  onToggle?: (genre: string) => void;
  removable?: boolean;
  onRemove?: (genre: string) => void;
  variant?: "default" | "filter";
}

export function GenreChips({
  genres,
  selectedGenres = [],
  onToggle,
  removable = false,
  onRemove,
  variant = "default",
}: GenreChipsProps) {
  const isInteractive = variant === "filter";

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => {
        const isSelected = selectedGenres.includes(genre);
        
        return (
          <Badge
            key={genre}
            variant={isSelected ? "default" : "secondary"}
            className={`
              ${isInteractive ? 'cursor-pointer hover:bg-primary/80 transition-colors' : ''}
              ${isSelected ? 'bg-primary text-primary-foreground' : ''}
              ${removable ? 'pr-1' : ''}
            `}
            onClick={() => isInteractive && onToggle?.(genre)}
          >
            {genre}
            {removable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove?.(genre);
                }}
                className="ml-2 hover:bg-background/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </Badge>
        );
      })}
    </div>
  );
}
