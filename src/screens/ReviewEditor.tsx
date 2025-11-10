import { useState } from "react";
import { Bold, Italic, Eye, EyeOff, Image, Send, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";
import { Slider } from "../components/ui/slider";
import { ScoreBadge } from "../components/ScoreBadge";
import { StarRating } from "../components/StarRating";
import { mockMovies, mockUser } from "../lib/mockData";
import { Movie } from "../lib/types";
import { toast } from "sonner@2.0.3";

interface ReviewEditorProps {
  movie?: Movie;
  isCriticMode?: boolean;
  onNavigate?: (page: string, data?: any) => void;
}

export function ReviewEditor({
  movie = mockMovies[0],
  isCriticMode = mockUser.role === "critic",
  onNavigate,
}: ReviewEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [criticScore, setCriticScore] = useState([75]);
  const [hasSpoilers, setHasSpoilers] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const handleSave = () => {
    toast.success("Review saved as draft");
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim() || rating === 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Review published successfully!");
    setTimeout(() => {
      onNavigate?.("movie-detail", movie);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border-subtle bg-background-subtle sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2>Write a Review</h2>
              <p className="text-sm text-muted-foreground">
                {movie.title} ({movie.year})
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handlePublish}>
                <Send className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Movie Info */}
          <div className="flex gap-4 p-4 bg-card-elevated rounded-lg mb-6">
            <div className="w-24 h-36 rounded overflow-hidden bg-background shrink-0">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="mb-2">{movie.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {movie.year} • Directed by {movie.director}
              </p>
              <div className="flex items-center gap-4">
                <ScoreBadge type="user" score={movie.userRating} size="sm" />
                <ScoreBadge type="critic" score={movie.criticScore} size="sm" />
              </div>
            </div>
          </div>

          {/* Rating Section */}
          <div className="bg-card-elevated rounded-lg p-6 mb-6 space-y-6">
            <div>
              <Label className="mb-3 block">Your Rating *</Label>
              <StarRating rating={rating} onChange={setRating} size="lg" showValue={false} />
              <p className="text-sm text-muted-foreground mt-2">
                {rating === 0 ? "Click to rate" : `You rated this ${rating} out of 5 stars`}
              </p>
            </div>

            {isCriticMode && (
              <div>
                <Label className="mb-3 block">
                  Critic Score: {criticScore[0]}/100
                </Label>
                <Slider
                  value={criticScore}
                  onValueChange={setCriticScore}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="mt-2">
                  <ScoreBadge type="critic" score={criticScore[0]} size="md" />
                </div>
              </div>
            )}
          </div>

          {/* Editor */}
          <div className="bg-card-elevated rounded-lg overflow-hidden">
            <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
              <div className="border-b border-border px-4 py-2">
                <TabsList>
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="write" className="p-6 space-y-4 m-0">
                <div className="space-y-2">
                  <Label htmlFor="review-title">Review Title *</Label>
                  <Input
                    id="review-title"
                    placeholder="e.g., A Masterpiece of Modern Cinema"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-1 border-b border-border pb-2">
                  <Button variant="ghost" size="sm">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-border mx-2" />
                  <Button variant="ghost" size="sm">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const spoilerText = "\n[SPOILER]\nYour spoiler text here\n[/SPOILER]\n";
                      setContent(content + spoilerText);
                    }}
                  >
                    {hasSpoilers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="ml-2 text-sm">Spoiler</span>
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review-content">Your Review *</Label>
                  <Textarea
                    id="review-content"
                    placeholder="Share your thoughts about this movie..."
                    rows={12}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="resize-none"
                  />
                  <p className="text-sm text-muted-foreground">
                    {content.length} characters
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="spoilers"
                      checked={hasSpoilers}
                      onCheckedChange={setHasSpoilers}
                    />
                    <Label htmlFor="spoilers" className="cursor-pointer">
                      This review contains spoilers
                    </Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="p-6 m-0">
                <div className="prose prose-invert max-w-none">
                  <h3>{title || "Review Title"}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <StarRating rating={rating} readonly size="sm" />
                    {isCriticMode && criticScore[0] > 0 && (
                      <ScoreBadge type="critic" score={criticScore[0]} size="sm" />
                    )}
                  </div>
                  {hasSpoilers && (
                    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-4">
                      <p className="text-warning flex items-center gap-2 m-0">
                        <EyeOff className="h-4 w-4" />
                        This review contains spoilers
                      </p>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-foreground-subtle">
                    {content || "Your review content will appear here..."}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h4 className="mb-2">Writing Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Be specific about what you liked or didn't like</li>
              <li>Avoid revealing major plot points without marking spoilers</li>
              <li>Keep your review constructive and respectful</li>
              <li>Explain your reasoning behind your rating</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
