import { Bell, Search, Menu, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface TopBarProps {
  userRole?: "user" | "critic" | "moderator" | "admin";
  onNavigate?: (page: string) => void;
  onSearch?: (query: string) => void;
  notificationCount?: number;
}

export function TopBar({ 
  userRole = "user", 
  onNavigate, 
  onSearch,
  notificationCount = 3 
}: TopBarProps) {
  const getRoleLabel = () => {
    switch (userRole) {
      case "critic": return "Critic";
      case "moderator": return "Moderator";
      case "admin": return "Admin";
      default: return "";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-background-subtle backdrop-blur supports-[backdrop-filter]:bg-background-subtle/95">
      <div className="flex h-16 items-center px-6 gap-6">
        {/* Logo */}
        <button 
          onClick={() => onNavigate?.("home")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">M</span>
          </div>
          <span className="font-semibold">MovieHub</span>
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search movies, shows, people..."
              className="pl-10 bg-background-elevated border-border"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate?.("movies")}
          >
            Movies
          </Button>
          <Button 
            variant="ghost"
            onClick={() => onNavigate?.("lists")}
          >
            Lists
          </Button>
          <Button 
            variant="ghost"
            onClick={() => onNavigate?.("rankings")}
          >
            Rankings
          </Button>
          {(userRole === "critic" || userRole === "moderator" || userRole === "admin") && (
            <Button 
              variant="ghost"
              onClick={() => onNavigate?.("critics")}
            >
              Critics
            </Button>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs">
                {notificationCount}
              </span>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-auto py-2 px-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                {getRoleLabel() && (
                  <Badge variant="secondary" className="bg-warning text-warning-foreground">
                    {getRoleLabel()}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate?.("profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate?.("watchlist")}>
                Watchlist
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate?.("lists")}>
                My Lists
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {userRole === "critic" && (
                <>
                  <DropdownMenuItem onClick={() => onNavigate?.("critic-dashboard")}>
                    Critics Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              {userRole === "moderator" && (
                <>
                  <DropdownMenuItem onClick={() => onNavigate?.("moderator-queue")}>
                    Moderator Queue
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              {userRole === "admin" && (
                <>
                  <DropdownMenuItem onClick={() => onNavigate?.("admin-console")}>
                    Admin Console
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
