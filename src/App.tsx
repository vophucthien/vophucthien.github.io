import { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { TopBar } from "./components/TopBar";
import { Home } from "./screens/Home";
import { MovieDetail } from "./screens/MovieDetail";
import { Search } from "./screens/Search";
import { Auth } from "./screens/Auth";
import { Profile } from "./screens/Profile";
import { Watchlist } from "./screens/Watchlist";
import { Lists } from "./screens/Lists";
import { ReviewEditor } from "./screens/ReviewEditor";
import { CriticsDashboard } from "./screens/CriticsDashboard";
import { ModeratorQueue } from "./screens/ModeratorQueue";
import { AdminConsole } from "./screens/AdminConsole";
import { Rankings } from "./screens/Rankings";
import { UserRole } from "./lib/types";
import { mockUser } from "./lib/mockData";

type Page =
  | "home"
  | "movie-detail"
  | "search"
  | "auth"
  | "profile"
  | "watchlist"
  | "lists"
  | "list-detail"
  | "review-editor"
  | "critic-dashboard"
  | "moderator-queue"
  | "admin-console"
  | "rankings"
  | "movies"
  | "critics"
  | "register"
  | "forgot-password"
  | "settings"
  | "about"
  | "guidelines";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [pageData, setPageData] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("user");

  // For demo purposes, you can change this to test different roles
  const demoUserRole: UserRole = "critic"; // Change to "user", "critic", "moderator", or "admin"

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page as Page);
    setPageData(data);
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUserRole(demoUserRole);
    setCurrentPage("home");
  };

  const renderPage = () => {
    // Auth check for protected pages
    const protectedPages = [
      "profile",
      "watchlist",
      "lists",
      "list-detail",
      "review-editor",
      "critic-dashboard",
      "moderator-queue",
      "admin-console",
    ];

    if (protectedPages.includes(currentPage) && !isAuthenticated) {
      return <Auth onNavigate={handleNavigate} onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      
      case "movie-detail":
        return <MovieDetail movie={pageData} onNavigate={handleNavigate} />;
      
      case "search":
      case "movies":
        return <Search initialGenre={pageData?.genre} onNavigate={handleNavigate} />;
      
      case "auth":
      case "register":
      case "forgot-password":
        return <Auth onNavigate={handleNavigate} onLogin={handleLogin} />;
      
      case "profile":
        return <Profile user={mockUser} onNavigate={handleNavigate} />;
      
      case "watchlist":
        return <Watchlist onNavigate={handleNavigate} />;
      
      case "lists":
      case "list-detail":
        return <Lists onNavigate={handleNavigate} />;
      
      case "review-editor":
        return (
          <ReviewEditor
            movie={pageData}
            isCriticMode={userRole === "critic"}
            onNavigate={handleNavigate}
          />
        );
      
      case "critic-dashboard":
      case "critics":
        if (userRole === "critic" || userRole === "moderator" || userRole === "admin") {
          return <CriticsDashboard onNavigate={handleNavigate} />;
        }
        return <Home onNavigate={handleNavigate} />;
      
      case "moderator-queue":
        if (userRole === "moderator" || userRole === "admin") {
          return <ModeratorQueue onNavigate={handleNavigate} />;
        }
        return <Home onNavigate={handleNavigate} />;
      
      case "admin-console":
        if (userRole === "admin") {
          return <AdminConsole onNavigate={handleNavigate} />;
        }
        return <Home onNavigate={handleNavigate} />;
      
      case "rankings":
        return <Rankings onNavigate={handleNavigate} />;
      
      case "about":
      case "guidelines":
      case "settings":
        return (
          <div className="container mx-auto px-6 py-12 text-center">
            <h1 className="mb-4">{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}</h1>
            <p className="text-muted-foreground mb-6">This page is under construction.</p>
            <button
              onClick={() => handleNavigate("home")}
              className="text-primary hover:underline"
            >
              Return to Home
            </button>
          </div>
        );
      
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  const shouldShowTopBar = currentPage !== "auth" && 
                          currentPage !== "register" && 
                          currentPage !== "forgot-password";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {shouldShowTopBar && (
        <TopBar
          userRole={isAuthenticated ? userRole : undefined}
          onNavigate={handleNavigate}
          notificationCount={3}
        />
      )}
      
      <main>
        {renderPage()}
      </main>

      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1A1D24',
            color: '#F5F5F7',
            border: '1px solid #2A2F3A',
          },
        }}
      />

      {/* Quick Role Switcher for Demo (remove in production) */}
      {isAuthenticated && (
        <div className="fixed bottom-4 left-4 z-50 bg-card-elevated border border-border rounded-lg p-4 shadow-lg">
          <p className="text-xs text-muted-foreground mb-2">Demo: Switch Role</p>
          <div className="flex gap-2">
            <button
              onClick={() => setUserRole("user")}
              className={`px-3 py-1 rounded text-xs ${
                userRole === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              User
            </button>
            <button
              onClick={() => setUserRole("critic")}
              className={`px-3 py-1 rounded text-xs ${
                userRole === "critic"
                  ? "bg-warning text-warning-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              Critic
            </button>
            <button
              onClick={() => setUserRole("moderator")}
              className={`px-3 py-1 rounded text-xs ${
                userRole === "moderator"
                  ? "bg-chart-4 text-white"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              Moderator
            </button>
            <button
              onClick={() => setUserRole("admin")}
              className={`px-3 py-1 rounded text-xs ${
                userRole === "admin"
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
