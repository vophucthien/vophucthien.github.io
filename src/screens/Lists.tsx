import { useState } from "react";
import { Plus, Lock, Globe, Grip, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { mockLists, mockMovies } from "../lib/mockData";
import { toast } from "sonner@2.0.3";

interface ListsProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function Lists({ onNavigate }: ListsProps) {
  const [lists, setLists] = useState(mockLists);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListDescription, setNewListDescription] = useState("");
  const [newListPublic, setNewListPublic] = useState(true);

  const handleCreateList = () => {
    if (!newListName.trim()) {
      toast.error("Please enter a list name");
      return;
    }

    const newList = {
      id: String(lists.length + 1),
      name: newListName,
      description: newListDescription,
      coverUrl: mockMovies[0].posterUrl,
      itemCount: 0,
      isPublic: newListPublic,
      createdAt: new Date().toISOString().split("T")[0],
      movies: [],
    };

    setLists([...lists, newList]);
    setIsCreateDialogOpen(false);
    setNewListName("");
    setNewListDescription("");
    setNewListPublic(true);
    toast.success("List created successfully!");
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2">My Lists</h1>
          <p className="text-muted-foreground">
            {lists.length} {lists.length === 1 ? "list" : "lists"}
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New List
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New List</DialogTitle>
              <DialogDescription>
                Create a custom collection of your favorite movies
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="list-name">List Name</Label>
                <Input
                  id="list-name"
                  placeholder="e.g. My Favorite Sci-Fi Movies"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="list-description">Description</Label>
                <Textarea
                  id="list-description"
                  placeholder="Describe your list..."
                  rows={3}
                  value={newListDescription}
                  onChange={(e) => setNewListDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public List</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow others to view this list
                  </p>
                </div>
                <Switch
                  checked={newListPublic}
                  onCheckedChange={setNewListPublic}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateList}>Create List</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.map((list) => (
          <Card
            key={list.id}
            className="group cursor-pointer hover:border-primary transition-all"
            onClick={() => onNavigate?.("list-detail", list)}
          >
            <div className="aspect-video overflow-hidden rounded-t-lg relative">
              <img
                src={list.coverUrl}
                alt={list.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">
                    {list.itemCount} movies
                  </span>
                  <div className="flex items-center gap-1 text-white">
                    {list.isPublic ? (
                      <Globe className="h-4 w-4" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{list.name}</CardTitle>
              <CardDescription>
                {list.isPublic ? "Public" : "Private"} • Created {list.createdAt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground-subtle line-clamp-2">
                {list.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* List Detail View (shown when a list is clicked) */}
      {false && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="mb-2">{lists[0].name}</h1>
                <p className="text-muted-foreground">{lists[0].description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Movies
                </Button>
                <Button variant="outline">Share</Button>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {lists[0].movies.map((movie, idx) => (
                <div
                  key={movie.id}
                  className="flex items-center gap-4 p-4 bg-card-elevated rounded-lg hover:bg-card transition-colors"
                >
                  <button className="cursor-grab">
                    <Grip className="h-5 w-5 text-muted-foreground" />
                  </button>
                  <span className="text-muted-foreground font-medium w-8">
                    {idx + 1}
                  </span>
                  <div className="w-16 h-20 rounded overflow-hidden bg-background shrink-0">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4>{movie.title}</h4>
                    <p className="text-sm text-muted-foreground">{movie.year}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
