import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/lib/mockData";
import { useState } from "react";
import { MapPin, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export const Route = createFileRoute("/post-job")({
  head: () => ({ meta: [{ title: "Post a job — FreelanceHub" }] }),
  component: PostJobPage,
});

function PostJobPage() {
  const [form, setForm] = useState({
    title: "Senior Product Designer",
    category: "Design",
    desc: "We need a thoughtful designer to lead a refresh of our product UI…",
    rate: 85,
    hours: 60,
    deadline: "2026-07-15",
    email: "hire@yourco.com",
  });
  const [skills, setSkills] = useState(["Figma", "Design Systems"]);
  const [draft, setDraft] = useState("");

  return (
    <DashboardLayout title="Post a new job">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card className="border-border shadow-[var(--shadow-soft)]">
          <CardHeader><CardTitle>Job details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5"><Label>Job title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Application deadline</Label><Input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} /></div>
            </div>

            <div className="space-y-1.5"><Label>Description</Label><Textarea rows={6} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} /></div>

            <div className="space-y-1.5">
              <Label>Skills required</Label>
              <div className="flex flex-wrap gap-1.5 rounded-lg border border-input bg-background p-2">
                {skills.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {s}<button onClick={() => setSkills(skills.filter((x) => x !== s))}><X className="h-3 w-3" /></button>
                  </span>
                ))}
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && draft.trim()) { e.preventDefault(); setSkills([...skills, draft.trim()]); setDraft(""); } }}
                  placeholder="Add skill + Enter"
                  className="flex-1 min-w-[140px] bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5"><Label>Hourly rate ($)</Label><Input type="number" value={form.rate} onChange={(e) => setForm({ ...form, rate: Number(e.target.value) })} /></div>
              <div className="space-y-1.5"><Label>Estimated hours</Label><Input type="number" value={form.hours} onChange={(e) => setForm({ ...form, hours: Number(e.target.value) })} /></div>
              <div className="space-y-1.5"><Label>Apply email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline">Save draft</Button>
              <Button className="text-primary-foreground" style={{ background: "var(--gradient-primary)" }} onClick={() => toast.success("Job published!")}>Publish job</Button>
            </div>
          </CardContent>
        </Card>

        <div className="lg:sticky lg:top-20 self-start">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Live preview</p>
          <Card className="border-border shadow-[var(--shadow-elegant)]">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Avatar className="h-11 w-11"><AvatarFallback className="bg-primary/10 text-primary font-semibold">YC</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold leading-snug">{form.title || "Job title"}</h3>
                    <span className="shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">${form.rate}/hr</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">Your Company · <MapPin className="inline h-3 w-3" /> Remote</p>
                </div>
              </div>
              <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">{form.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {skills.map((s) => <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">{s}</span>)}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{form.hours}h estimated</span>
                <span>Deadline {form.deadline}</span>
              </div>
              <Button className="mt-4 w-full text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>Apply Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}