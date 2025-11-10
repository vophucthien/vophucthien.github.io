import { Eye, Clock, Bookmark, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface StatusChipProps {
  status?: "watched" | "watching" | "want" | null;
  onChange?: (status: "watched" | "watching" | "want" | null) => void;
  readonly?: boolean;
}

export function StatusChip({ status, onChange, readonly = false }: StatusChipProps) {
  const statusOptions = [
    { value: "watched", label: "Watched", icon: Eye, color: "bg-success text-success-foreground" },
    { value: "watching", label: "Watching", icon: Clock, color: "bg-warning text-warning-foreground" },
    { value: "want", label: "Want to Watch", icon: Bookmark, color: "bg-primary text-primary-foreground" },
  ];

  const currentStatus = statusOptions.find(opt => opt.value === status);

  if (readonly && currentStatus) {
    const Icon = currentStatus.icon;
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${currentStatus.color}`}>
        <Icon className="h-4 w-4" />
        {currentStatus.label}
      </div>
    );
  }

  return (
    <Select
      value={status || undefined}
      onValueChange={(value) => onChange?.(value as any)}
    >
      <SelectTrigger 
        className={`w-auto min-w-[160px] ${currentStatus ? currentStatus.color : 'bg-secondary text-secondary-foreground'}`}
      >
        <SelectValue placeholder="Set Status">
          {currentStatus && (
            <div className="flex items-center gap-2">
              <currentStatus.icon className="h-4 w-4" />
              {currentStatus.label}
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              <option.icon className="h-4 w-4" />
              {option.label}
            </div>
          </SelectItem>
        ))}
        {status && (
          <>
            <SelectItem value="remove" className="text-destructive">
              Remove Status
            </SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  );
}
