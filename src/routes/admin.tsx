import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/StatusBadge";
import { fetchApplications, fetchJobs, fetchUsers } from "@/lib/api";
import { type Application, type Job, type User } from "@/lib/mockData";
import { Users, Briefcase, FileCheck, DollarSign, Trash2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — FreelanceHub" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewed, setReviewed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    Promise.all([fetchApplications(), fetchJobs(), fetchUsers()])
      .then(([applicationsData, jobsData, usersData]) => {
        setApplications(applicationsData);
        setJobs(jobsData);
        setUsers(usersData);
      })
      .catch((err) => setError(err.message ?? "Failed to load admin data."))
      .finally(() => setIsLoading(false));
  }, []);

  const stats = [
    { i: Users, l: "Total Users", v: users.length.toLocaleString() },
    { i: Briefcase, l: "Total Jobs Posted", v: jobs.length.toLocaleString() },
    { i: FileCheck, l: "Applications this week", v: applications.length.toLocaleString() },
    { i: DollarSign, l: "Revenue Processed", v: "$184K" },
  ];

  if (isLoading) {
    return (
      <DashboardLayout title="Admin overview">
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">Loading admin data…</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Admin overview">
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-destructive">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Admin overview">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.l} className="border-border shadow-[var(--shadow-soft)]">
            <CardContent className="p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <s.i className="h-5 w-5" />
              </div>
              <div className="mt-4 text-2xl font-bold" style={{ fontFamily: "Sora, system-ui" }}>{s.v}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="applications" className="mt-6">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="mt-4">
          <Card className="border-border shadow-[var(--shadow-soft)]">
            <CardHeader><CardTitle>All applications</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Job</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Amount owed</TableHead>
                      <TableHead>Reviewed</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="font-medium">{a.applicantName}</TableCell>
                        <TableCell>{a.jobTitle}</TableCell>
                        <TableCell className="text-muted-foreground">{a.appliedAt}</TableCell>
                        <TableCell>${a.rate}/hr</TableCell>
                        <TableCell>{a.hours}h</TableCell>
                        <TableCell className="font-semibold">${(a.rate * a.hours).toLocaleString()}</TableCell>
                        <TableCell>
                          <Switch
                            checked={reviewed[a.id] ?? a.status !== "Pending"}
                            onCheckedChange={(c) => { setReviewed({ ...reviewed, [a.id]: c }); toast.success(c ? "Marked reviewed" : "Marked pending"); }}
                          />
                        </TableCell>
                        <TableCell><StatusBadge status={a.status} /></TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost">Approve</Button>
                          <Button size="sm" variant="ghost" className="text-destructive">Reject</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="mt-4">
          <Card className="border-border shadow-[var(--shadow-soft)]">
            <CardHeader><CardTitle>Manage jobs</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((j) => (
                    <TableRow key={j.id}>
                      <TableCell className="font-medium">{j.title}</TableCell>
                      <TableCell>{j.company}</TableCell>
                      <TableCell>${j.rate}/hr</TableCell>
                      <TableCell><StatusBadge status={j.status} /></TableCell>
                      <TableCell className="text-muted-foreground">{j.postedAt}</TableCell>
                      <TableCell><Switch defaultChecked={j.status !== "Completed"} /></TableCell>
                      <TableCell className="text-right">
                        <Button size="icon" variant="ghost"><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card className="border-border shadow-[var(--shadow-soft)]">
            <CardHeader><CardTitle>All users</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell className="text-muted-foreground">{u.email}</TableCell>
                      <TableCell className="capitalize">{u.role}</TableCell>
                      <TableCell>{u.joined}</TableCell>
                      <TableCell><StatusBadge status={u.status} /></TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">Message</Button>
                        <Button size="sm" variant="ghost" className="text-destructive">Suspend</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}