import { useState } from "react";
import { User, Star, Film, Clock, Calendar, Edit, Settings } from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { CriticBadge } from "../components/CriticBadge";
import { StarRating } from "../components/StarRating";
import { mockUser, mockMovies, mockLists } from "../lib/mockData";
import { UserProfile } from "../lib/types";

interface ProfileProps {
  user?: UserProfile;
  onNavigate?: (page: string, data?: any) => void;
}

export function Profile({ user = mockUser, onNavigate }: ProfileProps) {
  const [activeTab, setActiveTab] = useState("ratings");

  const recentRatings = mockMovies.slice(0, 10).map((movie, idx) => ({
    movie,
    rating: 5 - idx * 0.3,
    date: `2024-11-${String(10 - idx).padStart(2, '0')}`,
  }));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-card-elevated border-b border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-start gap-6">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                <User className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1>{user.name}</h1>
                {user.role === "critic" && <CriticBadge size="lg" />}
                {user.role === "moderator" && (
                  <span className="px-3 py-1 rounded-lg bg-chart-4/10 text-chart-4 border border-chart-4/20 text-sm font-medium">
                    Moderator
                  </span>
                )}
                {user.role === "admin" && (
                  <span className="px-3 py-1 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 text-sm font-medium">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mb-4">@{user.username}</p>
              <p className="text-foreground-subtle mb-6 max-w-2xl">{user.bio}</p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => onNavigate?.("settings")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" onClick={() => onNavigate?.("settings")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Ratings</CardDescription>
              <CardTitle className="text-3xl">{user.stats.ratingsCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <Film className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Reviews Written</CardDescription>
              <CardTitle className="text-3xl">{user.stats.reviewsCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Avg Rating</CardDescription>
              <CardTitle className="text-3xl">{user.stats.avgRating.toFixed(1)}</CardTitle>
            </CardHeader>
            <CardContent>
              <Star className="h-4 w-4 text-user-score fill-user-score" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Time Watched</CardDescription>
              <CardTitle className="text-3xl">{user.stats.timeWatched}h</CardTitle>
            </CardHeader>
            <CardContent>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="ratings">Rating History</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="lists">Lists</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Rating History */}
          <TabsContent value="ratings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Rating History</CardTitle>
                <CardDescription>
                  Your recent movie ratings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Movie</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Your Rating</TableHead>
                      <TableHead>Date Rated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRatings.map((item) => (
                      <TableRow 
                        key={item.movie.id}
                        className="cursor-pointer"
                        onClick={() => onNavigate?.("movie-detail", item.movie)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
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
                          <StarRating rating={item.rating} readonly size="sm" />
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {item.date}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Watchlist */}
          <TabsContent value="watchlist" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2>My Watchlist</h2>
                <p className="text-muted-foreground">Movies you want to watch</p>
              </div>
              <Button onClick={() => onNavigate?.("watchlist")}>
                View Full Watchlist
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {mockMovies.slice(0, 6).map((movie) => (
                <div
                  key={movie.id}
                  className="cursor-pointer"
                  onClick={() => onNavigate?.("movie-detail", movie)}
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-background-elevated mb-2">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="truncate">{movie.title}</h4>
                  <p className="text-sm text-muted-foreground">{movie.year}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Lists */}
          <TabsContent value="lists" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2>My Lists</h2>
                <p className="text-muted-foreground">Custom movie collections</p>
              </div>
              <Button onClick={() => onNavigate?.("lists")}>
                Create New List
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockLists.map((list) => (
                <Card 
                  key={list.id} 
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => onNavigate?.("list-detail", list)}
                >
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={list.coverUrl}
                      alt={list.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{list.name}</CardTitle>
                    <CardDescription>{list.itemCount} movies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {list.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Reviews</CardTitle>
                <CardDescription>
                  Reviews you've written
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-muted-foreground">
                  You haven't written any reviews yet. Start by rating a movie!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
