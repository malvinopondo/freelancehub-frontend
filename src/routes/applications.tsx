import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { fetchApplications } from "@/lib/api";
import { type Application } from "@/lib/mockData";
import { Download, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/applications")({
  head: () => ({ meta: [{ title: "My Applications — FreelanceHub" }] }),
  component: ApplicationsPage,
});

function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [q, setQ] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchApplications()
      .then(setApplications)
      .catch((err) => setError(err.message ?? "Failed to load applications."))
      .finally(() => setIsLoading(false));
  }, []);

  const list = useMemo(
    () => applications.filter((a) => a.jobTitle.toLowerCase().includes(q.toLowerCase())),
    [applications, q],
  );

  return (
    <DashboardLayout title="My applications">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search applications" className="pl-9" />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground">Legend:</span>
          {["Pending", "Reviewed", "Accepted", "Rejected"].map((s) => <StatusBadge key={s} status={s} />)}
        </div>
        <Button variant="outline" size="sm" className="ml-auto" onClick={() => toast.success("CSV exported")}>
          <Download className="mr-2 h-4 w-4" />Export CSV
        </Button>
      </div>

      {isLoading ? (
        <Card className="border-border shadow-[var(--shadow-soft)]">
          <CardContent className="p-5 text-center text-sm text-muted-foreground">Loading applications…</CardContent>
        </Card>
      ) : error ? (
        <Card className="border-border shadow-[var(--shadow-soft)]">
          <CardContent className="p-5 text-center text-sm text-destructive">{error}</CardContent>
        </Card>
      ) : (
        <Card className="border-border shadow-[var(--shadow-soft)]">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Total value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.jobTitle}</TableCell>
                    <TableCell className="text-muted-foreground">{a.company}</TableCell>
                    <TableCell>{a.appliedAt}</TableCell>
                    <TableCell>${a.rate}/hr</TableCell>
                    <TableCell>{a.hours}h</TableCell>
                    <TableCell className="font-semibold">${(a.rate * a.hours).toLocaleString()}</TableCell>
                    <TableCell><StatusBadge status={a.status} /></TableCell>
                    <TableCell className="text-right"><Button size="sm" variant="ghost">View details</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between border-t border-border p-3 text-xs text-muted-foreground">
            <span>Showing {list.length} of {applications.length}</span>
            <div className="flex gap-1">
              <Button size="sm" variant="outline">Previous</Button>
              <Button size="sm" variant="outline">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      )}
    </DashboardLayout>
  );
}