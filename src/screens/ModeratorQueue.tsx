import { useState } from "react";
import { Shield, Eye, Trash2, CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { ViolationTag } from "../components/ViolationTag";
import { mockReports } from "../lib/mockData";
import { Report } from "../lib/types";
import { toast } from "sonner@2.0.3";

interface ModeratorQueueProps {
  onNavigate?: (page: string) => void;
}

export function ModeratorQueue({ onNavigate }: ModeratorQueueProps) {
  const [reports, setReports] = useState(mockReports);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("pending");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [actionNote, setActionNote] = useState("");

  const filteredReports = reports.filter((report) => {
    const matchesType = filterType === "all" || report.type === filterType;
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const handleAction = (
    reportId: string,
    action: "approve" | "hide" | "delete" | "warn" | "ban"
  ) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId
          ? { ...r, status: action === "approve" ? "approved" : "rejected" as any }
          : r
      )
    );
    setSelectedReport(null);
    setActionNote("");
    
    const actionMessages = {
      approve: "Content approved",
      hide: "Content hidden from public view",
      delete: "Content deleted",
      warn: "Warning sent to user",
      ban: "User temporarily banned",
    };
    
    toast.success(actionMessages[action]);
  };

  const statusCounts = {
    pending: reports.filter((r) => r.status === "pending").length,
    approved: reports.filter((r) => r.status === "approved").length,
    rejected: reports.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1>Moderator Queue</h1>
            <Badge className="bg-chart-4 text-chart-4-foreground">
              <Shield className="h-3 w-3 mr-1" />
              Moderator
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Review and manage reported content
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card-elevated rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-semibold">{statusCounts.pending}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-card-elevated rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Approved</p>
              <p className="text-3xl font-semibold">{statusCounts.approved}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-card-elevated rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Rejected</p>
              <p className="text-3xl font-semibold">{statusCounts.rejected}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <XCircle className="h-6 w-6 text-destructive" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="spam">Spam</SelectItem>
            <SelectItem value="offensive">Offensive</SelectItem>
            <SelectItem value="spoiler">Spoiler</SelectItem>
            <SelectItem value="copyright">Copyright</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  No reports found
                </TableCell>
              </TableRow>
            ) : (
              filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <ViolationTag type={report.type} size="sm" />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium mb-1">
                        {report.contentType.charAt(0).toUpperCase() + report.contentType.slice(1)}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {report.contentPreview}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{report.reporterName}</TableCell>
                  <TableCell className="text-muted-foreground">{report.createdAt}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        report.status === "pending"
                          ? "secondary"
                          : report.status === "approved"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedReport(report)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedReport && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle>Report Details</SheetTitle>
                <SheetDescription>
                  Review and take action on this report
                </SheetDescription>
              </SheetHeader>

              <Tabs defaultValue="content" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
                  <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-6 mt-6">
                  {/* Report Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Violation Type</label>
                      <div className="mt-1">
                        <ViolationTag type={selectedReport.type} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground">Content Type</label>
                      <p className="mt-1 capitalize">{selectedReport.contentType}</p>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground">Reported By</label>
                      <p className="mt-1">{selectedReport.reporterName}</p>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground">Report Date</label>
                      <p className="mt-1">{selectedReport.createdAt}</p>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Content Preview
                    </label>
                    <div className="p-4 bg-background-elevated rounded-lg border border-border">
                      <p className="text-foreground-subtle">{selectedReport.contentPreview}</p>
                    </div>
                  </div>

                  {/* Action Note */}
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Action Note (Optional)
                    </label>
                    <Textarea
                      placeholder="Add notes about your decision..."
                      value={actionNote}
                      onChange={(e) => setActionNote(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <p className="font-medium">Take Action</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleAction(selectedReport.id, "approve")}
                      >
                        <CheckCircle className="h-4 w-4 mr-2 text-success" />
                        Approve Content
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleAction(selectedReport.id, "hide")}
                      >
                        <Eye className="h-4 w-4 mr-2 text-warning" />
                        Hide Content
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleAction(selectedReport.id, "delete")}
                      >
                        <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                        Delete Content
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleAction(selectedReport.id, "warn")}
                      >
                        <AlertTriangle className="h-4 w-4 mr-2 text-warning" />
                        Warn User
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => handleAction(selectedReport.id, "ban")}
                    >
                      Ban User (Temporary)
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <AlertTriangle className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Report Created</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedReport.createdAt} by {selectedReport.reporterName}
                        </p>
                      </div>
                    </div>
                    <div className="text-center text-sm text-muted-foreground py-8">
                      No additional history
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
