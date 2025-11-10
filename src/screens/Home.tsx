import { Play, TrendingUp, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { MovieCard } from "../components/MovieCard";
import { GenreChips } from "../components/GenreChips";
import { mockMovies, allGenres } from "../lib/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface HomeProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={mockMovies[0].backdropUrl}
            alt="Featured"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-4">
              <TrendingUp className="h-4 w-4" />
              Featured This Week
            </div>
            <h1 className="mb-4">Discover Your Next Favorite Film</h1>
            <p className="text-xl text-foreground-subtle mb-6">
              Join thousands of movie lovers rating, reviewing, and sharing their passion for cinema.
            </p>
            <div className="flex gap-3">
              <Button size="lg" onClick={() => onNavigate?.("register")}>
                <Play className="h-5 w-5 mr-2" />
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate?.("movies")}>
                Browse Movies
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 space-y-16">
        {/* Trending Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="mb-1">Trending Now</h2>
              <p className="text-muted-foreground">Most popular movies this week</p>
            </div>
            <Button variant="ghost" onClick={() => onNavigate?.("movies")}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
                onClick={() => onNavigate?.("movie-detail", movie)}
              />
            ))}
          </div>
        </section>

        {/* Top 250 Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="mb-1">Top 250 Movies</h2>
              <p className="text-muted-foreground">The greatest films of all time</p>
            </div>
            <Button variant="ghost" onClick={() => onNavigate?.("rankings")}>
              View Full List
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockMovies.slice(0, 6).map((movie, idx) => (
              <div key={movie.id} className="relative">
                <div className="absolute -left-2 -top-2 z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-semibold text-primary-foreground">{idx + 1}</span>
                </div>
                <MovieCard
                  {...movie}
                  onClick={() => onNavigate?.("movie-detail", movie)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Genres Section */}
        <section>
          <div className="mb-6">
            <h2 className="mb-1">Browse by Genre</h2>
            <p className="text-muted-foreground">Explore movies by your favorite genres</p>
          </div>
          <GenreChips genres={allGenres} variant="filter" onToggle={(genre) => {
            onNavigate?.("search", { genre });
          }} />
        </section>

        {/* Recommended Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="mb-1">Because You Liked Sci-Fi</h2>
              <p className="text-muted-foreground">Personalized recommendations for you</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockMovies.filter(m => m.genres.includes("Sci-Fi")).map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
                onClick={() => onNavigate?.("movie-detail", movie)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border-subtle bg-background-subtle">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h4 className="mb-4">About</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => onNavigate?.("about")}>About Us</button></li>
                <li><button>Contact</button></li>
                <li><button>Careers</button></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => onNavigate?.("guidelines")}>Guidelines</button></li>
                <li><button>Help Center</button></li>
                <li><button>API</button></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button>Terms of Service</button></li>
                <li><button>Privacy Policy</button></li>
                <li><button>Cookie Policy</button></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button>Twitter</button></li>
                <li><button>Instagram</button></li>
                <li><button>Facebook</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border-subtle text-center text-sm text-muted-foreground">
            <p>© 2024 MovieHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
