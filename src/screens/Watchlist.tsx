import { useState } from "react";
import { Bookmark, SlidersHorizontal, LayoutGrid, LayoutList, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { MovieCard } from "../components/MovieCard";
import { StatusChip } from "../components/StatusChip";
import { EmptyState } from "../components/EmptyState";
import { mockMovies } from "../lib/mockData";
import { MovieStatus } from "../lib/types";
import { toast } from "sonner@2.0.3";

interface WatchlistProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function Watchlist({ onNavigate }: WatchlistProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<MovieStatus | "all">("all");
  const [sortBy, setSortBy] = useState("added");

  const [watchlistItems, setWatchlistItems] = useState(
    mockMovies.map((movie, idx) => ({
      movie,
      status: (["watched", "watching", "want"] as MovieStatus[])[idx % 3],
      addedDate: `2024-${String(11 - Math.floor(idx / 2)).padStart(2, '0')}-${String((idx % 28) + 1).padStart(2, '0')}`,
    }))
  );

  const filteredItems = watchlistItems.filter(
    (item) => filterStatus === "all" || item.status === filterStatus
  );

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map((item) => item.movie.id));
    }
  };

  const handleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (movieId: string, newStatus: MovieStatus | null) => {
    setWatchlistItems((prev) =>
      prev.map((item) =>
        item.movie.id === movieId
          ? { ...item, status: newStatus as MovieStatus }
          : item
      )
    );
    toast.success("Status updated");
  };

  const handleBulkDelete = () => {
    setWatchlistItems((prev) =>
      prev.filter((item) => !selectedItems.includes(item.movie.id))
    );
    setSelectedItems([]);
    toast.success(`Removed ${selectedItems.length} items from watchlist`);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2">My Watchlist</h1>
          <p className="text-muted-foreground">
            {filteredItems.length} {filteredItems.length === 1 ? "movie" : "movies"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="watched">Watched</SelectItem>
              <SelectItem value="watching">Watching</SelectItem>
              <SelectItem value="want">Want to Watch</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="added">Date Added</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
              <SelectItem value="year">Year</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedItems.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {selectedItems.length} selected
            </span>
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      {filteredItems.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="Your watchlist is empty"
          description="Start adding movies you want to watch to keep track of them here."
          actionLabel="Browse Movies"
          onAction={() => onNavigate?.("movies")}
        />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredItems.map((item) => (
            <div key={item.movie.id} className="relative">
              <div className="absolute top-2 left-2 z-10">
                <Checkbox
                  checked={selectedItems.includes(item.movie.id)}
                  onCheckedChange={() => handleSelect(item.movie.id)}
                  className="bg-background border-2"
                />
              </div>
              <MovieCard
                {...item.movie}
                status={item.status}
                onClick={() => onNavigate?.("movie-detail", item.movie)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === filteredItems.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Movie</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.movie.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.movie.id)}
                      onCheckedChange={() => handleSelect(item.movie.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div 
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => onNavigate?.("movie-detail", item.movie)}
                    >
                      <div className="w-12 h-16 rounded overflow-hidden bg-background-elevated shrink-0">
                        <img
                          src={item.movie.posterUrl}
                          alt={item.movie.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{item.movie.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.movie.year}</TableCell>
                  <TableCell>
                    <StatusChip
                      status={item.status}
                      onChange={(newStatus) => handleStatusChange(item.movie.id, newStatus)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-user-score">★</span>
                      <span>{item.movie.userRating.toFixed(1)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.addedDate}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setWatchlistItems((prev) =>
                          prev.filter((i) => i.movie.id !== item.movie.id)
                        );
                        toast.success("Removed from watchlist");
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
