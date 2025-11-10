import { Award } from "lucide-react";
import { Badge } from "./ui/badge";

interface CriticBadgeProps {
  size?: "sm" | "md" | "lg";
}

export function CriticBadge({ size = "md" }: CriticBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <Badge 
      className={`bg-warning text-warning-foreground ${sizeClasses[size]}`}
    >
      <Award className={`${iconSizes[size]} mr-1`} />
      Critic
    </Badge>
  );
}
