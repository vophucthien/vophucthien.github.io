import { Star, Film, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { MovieCard } from "../components/MovieCard";
import { StarRating } from "../components/StarRating";
import { ScoreBadge } from "../components/ScoreBadge";
import { StatusChip } from "../components/StatusChip";
import { GenreChips } from "../components/GenreChips";
import { EmptyState } from "../components/EmptyState";
import { ViolationTag } from "../components/ViolationTag";
import { CriticBadge } from "../components/CriticBadge";
import { mockMovies, allGenres } from "../lib/mockData";

export function ComponentsShowcase() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <h1 className="mb-2">Component Library</h1>
          <p className="text-muted-foreground">
            Reusable components for the Movie Review System
          </p>
        </div>

        {/* Design Tokens */}
        <section>
          <h2 className="mb-6">Design Tokens</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Colors</CardTitle>
                <CardDescription>Dark theme color palette</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-background border border-border" />
                    <div>
                      <p className="text-sm">Background</p>
                      <p className="text-xs text-muted-foreground">#0F1115</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-background-elevated border border-border" />
                    <div>
                      <p className="text-sm">Elevated</p>
                      <p className="text-xs text-muted-foreground">#2A2F3A</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-primary" />
                    <div>
                      <p className="text-sm">Primary</p>
                      <p className="text-xs text-muted-foreground">#4DA3FF</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-success" />
                    <div>
                      <p className="text-sm">Success</p>
                      <p className="text-xs text-muted-foreground">#10B981</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-warning" />
                    <div>
                      <p className="text-sm">Warning</p>
                      <p className="text-xs text-muted-foreground">#F59E0B</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-destructive" />
                    <div>
                      <p className="text-sm">Destructive</p>
                      <p className="text-xs text-muted-foreground">#EF4444</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Typography */}
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Inter font family with predefined sizes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h1>Heading 1 - 32/40</h1>
                </div>
                <div>
                  <h2>Heading 2 - 24/32</h2>
                </div>
                <div>
                  <h3>Heading 3 - 20/28</h3>
                </div>
                <div>
                  <p>Body text - 16/24</p>
                </div>
                <div>
                  <p className="text-sm">Caption - 12/16</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="mb-6">Buttons</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges */}
        <section>
          <h2 className="mb-6">Badges & Tags</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Status Badges</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <CriticBadge />
                <CriticBadge size="sm" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Violation Tags</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <ViolationTag type="spam" />
                <ViolationTag type="offensive" />
                <ViolationTag type="spoiler" />
                <ViolationTag type="copyright" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Ratings & Scores */}
        <section>
          <h2 className="mb-6">Ratings & Scores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Star Rating</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <StarRating rating={4.5} size="sm" />
                <StarRating rating={3.5} size="md" />
                <StarRating rating={5} size="lg" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Score Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScoreBadge type="user" score={4.5} showLabel />
                <ScoreBadge type="critic" score={85} showLabel />
                <div className="flex gap-3">
                  <ScoreBadge type="user" score={4.2} size="sm" />
                  <ScoreBadge type="critic" score={78} size="sm" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Status Chips */}
        <section>
          <h2 className="mb-6">Status Chips</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <StatusChip status="watched" readonly />
                <StatusChip status="watching" readonly />
                <StatusChip status="want" readonly />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Genre Chips */}
        <section>
          <h2 className="mb-6">Genre Chips</h2>
          <Card>
            <CardContent className="pt-6">
              <GenreChips genres={allGenres.slice(0, 8)} />
            </CardContent>
          </Card>
        </section>

        {/* Movie Cards */}
        <section>
          <h2 className="mb-6">Movie Cards</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mockMovies.slice(0, 6).map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </section>

        {/* Forms */}
        <section>
          <h2 className="mb-6">Form Elements</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <Input placeholder="Text input" />
              <Input type="email" placeholder="Email input" />
              <Input type="password" placeholder="Password input" />
              <Input placeholder="Disabled input" disabled />
            </CardContent>
          </Card>
        </section>

        {/* Empty State */}
        <section>
          <h2 className="mb-6">Empty States</h2>
          <Card>
            <CardContent className="pt-6">
              <EmptyState
                icon={Film}
                title="No movies found"
                description="Try adjusting your search or filters to find what you're looking for."
                actionLabel="Browse Movies"
              />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
