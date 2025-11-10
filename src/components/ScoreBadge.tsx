import { Star, Award } from "lucide-react";

interface ScoreBadgeProps {
  type: "user" | "critic";
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function ScoreBadge({
  type,
  score,
  maxScore = type === "user" ? 5 : 100,
  size = "md",
  showLabel = false,
}: ScoreBadgeProps) {
  const isUser = type === "user";
  
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className="flex flex-col gap-1">
      {showLabel && (
        <span className="text-xs text-muted-foreground">
          {isUser ? "User Score" : "Critic Score"}
        </span>
      )}
      <div
        className={`inline-flex items-center gap-2 rounded-lg font-medium ${sizeClasses[size]} ${
          isUser
            ? "bg-user-score/10 text-user-score border border-user-score/20"
            : "bg-critic-score/10 text-critic-score border border-critic-score/20"
        }`}
      >
        {isUser ? (
          <Star className={`${iconSizes[size]} fill-current`} />
        ) : (
          <Award className={iconSizes[size]} />
        )}
        <span>
          {isUser ? score.toFixed(1) : Math.round(score)}
          <span className="text-xs opacity-70">/{maxScore}</span>
        </span>
      </div>
    </div>
  );
}
