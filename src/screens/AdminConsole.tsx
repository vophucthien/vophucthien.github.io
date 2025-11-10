import { useState } from "react";
import {
  Settings,
  Film,
  Users,
  FileText,
  Megaphone,
  BarChart3,
  Plus,
  Search,
  Shield,
  Lock,
  Unlock,
  Download,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { GenreChips } from "../components/GenreChips";
import { mockMovies, mockUser, allGenres } from "../lib/mockData";
import { toast } from "sonner@2.0.3";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface AdminConsoleProps {
  onNavigate?: (page: string) => void;
}

const analyticsData = {
  ratings: [
    { rating: "5★", count: 4200 },
    { rating: "4★", count: 5600 },
    { rating: "3★", count: 3800 },
    { rating: "2★", count: 1200 },
    { rating: "1★", count: 400 },
  ],
  genres: [
    { name: "Action", value: 2400 },
    { name: "Drama", value: 1800 },
    { name: "Sci-Fi", value: 1600 },
    { name: "Comedy", value: 1200 },
    { name: "Horror", value: 800 },
  ],
};

const COLORS = ["#4DA3FF", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"];

export function AdminConsole({ onNavigate }: AdminConsoleProps) {
  const [activeTab, setActiveTab] = useState("movies");
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock users data
  const mockUsers = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "user", status: "active" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", role: "critic", status: "active" },
    { id: "3", name: "Carol Davis", email: "carol@example.com", role: "moderator", status: "active" },
    { id: "4", name: "David Wilson", email: "david@example.com", role: "user", status: "locked" },
  ];

  const [users, setUsers] = useState(mockUsers);

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    toast.success("User role updated");
  };

  const handleToggleLock = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "locked" : "active" }
          : u
      )
    );
    const user = users.find((u) => u.id === userId);
    toast.success(user?.status === "active" ? "User locked" : "User unlocked");
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1>Admin Console</h1>
            <Badge className="bg-destructive text-destructive-foreground">
              <Shield className="h-3 w-3 mr-1" />
              Admin
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Manage movies, users, and platform settings
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="movies">
            <Film className="h-4 w-4 mr-2" />
            Movies
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="content">
            <FileText className="h-4 w-4 mr-2" />
            Content
          </TabsTrigger>
          <TabsTrigger value="announcements">
            <Megaphone className="h-4 w-4 mr-2" />
            Announcements
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Movies Tab */}
        <TabsContent value="movies" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search movies..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={isAddMovieOpen} onOpenChange={setIsAddMovieOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Movie
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Movie</DialogTitle>
                  <DialogDescription>
                    Enter the movie details below
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="movie-title">Title *</Label>
                      <Input id="movie-title" placeholder="Movie title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="movie-year">Year *</Label>
                      <Input id="movie-year" type="number" placeholder="2024" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="movie-director">Director</Label>
                    <Input id="movie-director" placeholder="Director name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="movie-cast">Cast (comma-separated)</Label>
                    <Input id="movie-cast" placeholder="Actor 1, Actor 2, Actor 3" />
                  </div>
                  <div className="space-y-2">
                    <Label>Genres</Label>
                    <GenreChips genres={allGenres.slice(0, 8)} variant="filter" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="movie-synopsis">Synopsis</Label>
                    <Textarea
                      id="movie-synopsis"
                      placeholder="Brief description..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="movie-runtime">Runtime (minutes)</Label>
                    <Input id="movie-runtime" type="number" placeholder="120" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="movie-poster">Poster URL</Label>
                    <Input id="movie-poster" placeholder="https://..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddMovieOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    toast.success("Movie added successfully");
                    setIsAddMovieOpen(false);
                  }}>
                    Add Movie
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Director</TableHead>
                  <TableHead>User Rating</TableHead>
                  <TableHead>Critic Score</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMovies.map((movie) => (
                  <TableRow key={movie.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 rounded overflow-hidden bg-background-elevated shrink-0">
                          <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{movie.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{movie.year}</TableCell>
                    <TableCell>{movie.director}</TableCell>
                    <TableCell>{movie.userRating.toFixed(1)} ★</TableCell>
                    <TableCell>{movie.criticScore}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6 mt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>

          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(value) => handleRoleChange(user.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="critic">Critic</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "destructive"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleLock(user.id)}
                      >
                        {user.status === "active" ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation</CardTitle>
              <CardDescription>Manage reviews, comments, and user-generated content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-background-elevated rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Reviews</p>
                  <p className="text-2xl font-semibold">3,847</p>
                </div>
                <div className="p-4 bg-background-elevated rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Pending Approval</p>
                  <p className="text-2xl font-semibold">23</p>
                </div>
                <div className="p-4 bg-background-elevated rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Flagged Content</p>
                  <p className="text-2xl font-semibold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Announcement</CardTitle>
              <CardDescription>Post a banner or system message for all users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="announcement-title">Title</Label>
                <Input id="announcement-title" placeholder="Announcement title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="announcement-message">Message</Label>
                <Textarea
                  id="announcement-message"
                  placeholder="Your announcement message..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="announcement-type">Type</Label>
                <Select defaultValue="banner">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banner">Banner</SelectItem>
                    <SelectItem value="popup">Popup</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => toast.success("Announcement published")}>
                <Megaphone className="h-4 w-4 mr-2" />
                Publish Announcement
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
                <CardDescription>How users are rating movies</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.ratings}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3A" />
                    <XAxis dataKey="rating" stroke="#909199" />
                    <YAxis stroke="#909199" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A1D24",
                        border: "1px solid #2A2F3A",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="count" fill="#4DA3FF" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Genre Popularity</CardTitle>
                <CardDescription>Most watched genres</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.genres}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => entry.name}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.genres.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Platform Statistics</CardTitle>
                  <CardDescription>Key metrics and insights</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-background-elevated rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Active Users</p>
                  <p className="text-2xl font-semibold">12,547</p>
                  <p className="text-xs text-success mt-1">+8.3% from last month</p>
                </div>
                <div className="p-4 bg-background-elevated rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Movies</p>
                  <p className="text-2xl font-semibold">2,845</p>
                  <p className="text-xs text-success mt-1">+42 this month</p>
                </div>
                <div className="p-4 bg-background-elevated rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Reviews</p>
                  <p className="text-2xl font-semibold">38,294</p>
                  <p className="text-xs text-success mt-1">+12% from last month</p>
                </div>
                <div className="p-4 bg-background-elevated rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Avg Session</p>
                  <p className="text-2xl font-semibold">24m</p>
                  <p className="text-xs text-muted-foreground mt-1">Per user visit</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
