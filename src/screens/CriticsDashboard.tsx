import { PenTool, TrendingUp, ThumbsUp, MessageSquare, Award } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { CriticBadge } from "../components/CriticBadge";
import { ScoreBadge } from "../components/ScoreBadge";
import { mockMovies, mockReviews } from "../lib/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CriticsDashboardProps {
  onNavigate?: (page: string, data?: any) => void;
}

const trendData = [
  { month: "Jun", views: 1200, likes: 450 },
  { month: "Jul", views: 1800, likes: 680 },
  { month: "Aug", views: 2100, likes: 820 },
  { month: "Sep", views: 2400, likes: 950 },
  { month: "Oct", views: 2800, likes: 1100 },
  { month: "Nov", views: 3200, likes: 1280 },
];

export function CriticsDashboard({ onNavigate }: CriticsDashboardProps) {
  const myReviews = mockReviews.filter((r) => r.isCritic).map((review, idx) => ({
    ...review,
    views: 3200 - idx * 400,
    comments: 24 - idx * 3,
  }));

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1>Critics Dashboard</h1>
            <CriticBadge size="lg" />
          </div>
          <p className="text-muted-foreground">
            Track your reviews and audience engagement
          </p>
        </div>
        <Button onClick={() => onNavigate?.("review-editor")}>
          <PenTool className="h-4 w-4 mr-2" />
          Write New Review
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Reviews</CardDescription>
            <CardTitle className="text-3xl">52</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="text-success">+12%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg Critic Score</CardDescription>
            <CardTitle className="text-3xl">78</CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreBadge type="critic" score={78} size="sm" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Likes</CardDescription>
            <CardTitle className="text-3xl">1,280</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <ThumbsUp className="h-4 w-4 text-primary mr-1" />
              <span className="text-muted-foreground">Across all reviews</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Comments</CardDescription>
            <CardTitle className="text-3xl">347</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <MessageSquare className="h-4 w-4 text-primary mr-1" />
              <span className="text-muted-foreground">Total discussions</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trends Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Engagement Trends</CardTitle>
            <CardDescription>Views and likes over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3A" />
                <XAxis
                  dataKey="month"
                  stroke="#909199"
                  style={{ fontSize: 12 }}
                />
                <YAxis stroke="#909199" style={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1D24",
                    border: "1px solid #2A2F3A",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#4DA3FF"
                  strokeWidth={2}
                  name="Views"
                />
                <Line
                  type="monotone"
                  dataKey="likes"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Likes"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
            <CardDescription>November 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Reviews Written</span>
              <span className="text-xl font-semibold">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Views</span>
              <span className="text-xl font-semibold">3,200</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">New Followers</span>
              <span className="text-xl font-semibold">47</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg Rating Given</span>
              <span className="text-xl font-semibold">7.8/10</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reviews Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Your Recent Reviews</CardTitle>
          <CardDescription>Performance of your latest articles</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Movie</TableHead>
                <TableHead>Your Score</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myReviews.map((review, idx) => {
                const movie = mockMovies.find((m) => m.id === review.movieId);
                return (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 rounded overflow-hidden bg-background-elevated shrink-0">
                          <img
                            src={movie?.posterUrl}
                            alt={movie?.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{review.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {movie?.title}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ScoreBadge
                        type="critic"
                        score={review.criticScore || 0}
                        size="sm"
                      />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {review.createdAt}
                    </TableCell>
                    <TableCell>{myReviews[idx].views.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-success" />
                        {review.likes}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        {myReviews[idx].comments}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const movie = mockMovies.find(
                            (m) => m.id === review.movieId
                          );
                          onNavigate?.("movie-detail", movie);
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Achievement Badge */}
      <Card className="mt-6 bg-gradient-to-r from-warning/10 to-warning/5 border-warning/20">
        <CardContent className="flex items-center gap-4 py-6">
          <div className="w-16 h-16 rounded-full bg-warning flex items-center justify-center">
            <Award className="h-8 w-8 text-warning-foreground" />
          </div>
          <div className="flex-1">
            <h3>Top Critic Status</h3>
            <p className="text-muted-foreground">
              You're in the top 5% of critics this month! Keep up the great work.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
