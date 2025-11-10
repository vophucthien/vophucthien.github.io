import { AlertCircle, MessageSquareWarning, Eye, Copyright } from "lucide-react";
import { Badge } from "./ui/badge";

interface ViolationTagProps {
  type: "spam" | "offensive" | "spoiler" | "copyright";
  size?: "sm" | "md";
}

export function ViolationTag({ type, size = "md" }: ViolationTagProps) {
  const configs = {
    spam: {
      label: "Spam",
      icon: AlertCircle,
      className: "bg-warning/10 text-warning border-warning/20",
    },
    offensive: {
      label: "Offensive",
      icon: MessageSquareWarning,
      className: "bg-destructive/10 text-destructive border-destructive/20",
    },
    spoiler: {
      label: "Spoiler",
      icon: Eye,
      className: "bg-primary/10 text-primary border-primary/20",
    },
    copyright: {
      label: "Copyright",
      icon: Copyright,
      className: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    },
  };

  const config = configs[type];
  const Icon = config.icon;
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <Badge variant="outline" className={`${config.className} ${sizeClass}`}>
      <Icon className={`${size === "sm" ? 'h-3 w-3' : 'h-4 w-4'} mr-1`} />
      {config.label}
    </Badge>
  );
}
