import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  onChange?: (rating: number) => void;
  showValue?: boolean;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  readonly = false,
  onChange,
  showValue = true,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => {
          const isFilled = star <= displayRating;
          const isHalf = star === Math.ceil(displayRating) && displayRating % 1 !== 0;

          return (
            <button
              key={star}
              type="button"
              disabled={readonly}
              className={`relative ${readonly ? 'cursor-default' : 'cursor-pointer'} transition-transform hover:scale-110 disabled:hover:scale-100`}
              onMouseEnter={() => !readonly && setHoverRating(star)}
              onMouseLeave={() => !readonly && setHoverRating(0)}
              onClick={() => !readonly && onChange?.(star)}
            >
              <Star
                className={`${sizeClasses[size]} ${
                  isFilled
                    ? 'fill-user-score text-user-score'
                    : 'fill-transparent text-border'
                } transition-colors`}
              />
              {isHalf && (
                <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                  <Star
                    className={`${sizeClasses[size]} fill-user-score text-user-score`}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium min-w-[2rem]">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
