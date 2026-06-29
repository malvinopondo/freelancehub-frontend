import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/lib/auth";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchApplications, fetchJobs } from "@/lib/api";
import { type Application, type Job } from "@/lib/mockData";
import { Briefcase, Clock, DollarSign, FileText, TrendingUp, ArrowUpRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — FreelanceHub" }] }),
  component: DashboardPage,
});

function StatCard({ icon: Icon, label, value, delta, tone = "primary" }: { icon: typeof Briefcase; label: string; value: string; delta?: string; tone?: "primary" | "accent" | "info" | "warning" }) {
  const toneMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/15 text-accent",
    info: "bg-info/15 text-info",
    warning: "bg-warning/15 text-warning",
  };
  return (
    <Card className="shadow-[var(--shadow-soft)] border-border">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className={`grid h-10 w-10 place-items-center rounded-xl ${toneMap[tone]}`}>
            <Icon className="h-5 w-5" />
          </div>
          {delta && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
              <ArrowUpRight className="h-3 w-3" />
              {delta}
            </span>
          )}
        </div>
        <div className="mt-4 text-2xl font-bold tracking-tight" style={{ fontFamily: "Sora, system-ui" }}>{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}

function DashboardPage() {
  const { user } = useAuth();
  const role = user?.role ?? "freelancer";
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    Promise.all([fetchJobs(), fetchApplications()])
      .then(([jobsData, applicationsData]) => {
        setJobs(jobsData);
        setApplications(applicationsData);
      })
      .catch((err) => setError(err.message ?? "Failed to load dashboard data."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout title={`Welcome back, ${user?.name?.split(" ")[0] ?? "there"} 👋`}>
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">Loading dashboard data…</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title={`Welcome back, ${user?.name?.split(" ")[0] ?? "there"} 👋`}>
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-destructive">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={`Welcome back, ${user?.name?.split(" ")[0] ?? "there"} 👋`}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FileText} label="Total Applications" value="24" delta="+12%" tone="primary" />
        <StatCard icon={Briefcase} label="Active Jobs" value="6" delta="+3" tone="accent" />
        <StatCard icon={DollarSign} label="Pending Payments" value="$3,240" tone="warning" />
        <StatCard icon={Clock} label="Hours Logged" value="128h" delta="+8h" tone="info" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-[var(--shadow-soft)] border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Jobs</CardTitle>
              <p className="text-sm text-muted-foreground">Hand-picked for your skill set.</p>
            </div>
            <Button asChild variant="ghost" size="sm"><Link to="/jobs">View all</Link></Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.slice(0, 5).map((j) => (
                    <TableRow key={j.id}>
                      <TableCell className="font-medium">{j.title}</TableCell>
                      <TableCell className="text-muted-foreground">{j.company}</TableCell>
                      <TableCell>${j.rate}/hr</TableCell>
                      <TableCell>{j.hours}h</TableCell>
                      <TableCell><StatusBadge status={j.status} /></TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => toast.success(`Applied to ${j.title}`)}>Apply</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-[var(--shadow-soft)] border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-accent" />This week</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { l: "Profile views", v: "412", d: "+18%" },
              { l: "Proposals sent", v: "7", d: "+2" },
              { l: "Interviews", v: "3", d: "+1" },
              { l: "Avg response", v: "2.1h", d: "-12%" },
            ].map((s) => (
              <div key={s.l} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0">
                <span className="text-sm text-muted-foreground">{s.l}</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{s.v}</span>
                  <span className="text-xs text-success">{s.d}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {role === "freelancer" && (
        <Card className="mt-6 shadow-[var(--shadow-soft)] border-border">
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.filter((a) => a.applicantName === "Alex Morgan").map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium">{a.jobTitle}</TableCell>
                      <TableCell className="text-muted-foreground">{a.appliedAt}</TableCell>
                      <TableCell><StatusBadge status={a.status} /></TableCell>
                      <TableCell className="text-right"><Button size="sm" variant="ghost">View</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {role === "client" && (
        <Card className="mt-6 shadow-[var(--shadow-soft)] border-border">
          <CardHeader>
            <CardTitle>Your Posted Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Posted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.slice(0, 4).map((j) => (
                    <TableRow key={j.id}>
                      <TableCell className="font-medium">{j.title}</TableCell>
                      <TableCell>{j.applicants}</TableCell>
                      <TableCell><StatusBadge status={j.status} /></TableCell>
                      <TableCell className="text-muted-foreground">{j.postedAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}