import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { fetchJobs } from "@/lib/api";
import { type Job, categories, skillTags } from "@/lib/mockData";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Search, Mail, Briefcase, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/jobs")({
  head: () => ({ meta: [{ title: "Jobs — FreelanceHub" }] }),
  component: JobsPage,
});

function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [rateRange, setRateRange] = useState<[number]>([200]);
  const [activeSkills, setActiveSkills] = useState<string[]>([]);
  const [type, setType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchJobs()
      .then(setJobs)
      .catch((err) => setError(err.message ?? "Failed to load jobs."))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.company.toLowerCase().includes(search.toLowerCase())) return false;
      if (category && j.category !== category) return false;
      if (j.rate > rateRange[0]) return false;
      if (activeSkills.length && !activeSkills.some((s) => j.skills.includes(s))) return false;
      if (type && j.type !== type) return false;
      return true;
    });
  }, [jobs, search, category, rateRange, activeSkills, type]);

  const toggleSkill = (s: string) =>
    setActiveSkills((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  return (
    <DashboardLayout title="Browse jobs">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6">
          <Card className="border-border shadow-[var(--shadow-soft)]">
            <CardContent className="space-y-5 p-5">
              <div>
                <Label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</Label>
                <div className="space-y-1.5">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(category === c ? null : c)}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-sm transition-colors ${category === c ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground/80"}`}
                    >
                      <span>{c}</span>
                      <span className="text-xs text-muted-foreground">{jobs.filter((j) => j.category === c).length}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Max hourly rate</Label>
                  <span className="text-sm font-semibold">KES {rateRange[0]}/hr</span>
                </div>
                <Slider value={rateRange} onValueChange={(v) => setRateRange([v[0]])} min={20} max={200} step={5} />
              </div>

              <div>
                <Label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Skills</Label>
                <div className="flex flex-wrap gap-1.5">
                  {skillTags.map((s) => {
                    const on = activeSkills.includes(s);
                    return (
                      <button
                        key={s}
                        onClick={() => toggleSkill(s)}
                        className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Job type</Label>
                <div className="space-y-2">
                  {(["Hourly", "Fixed"] as const).map((t) => (
                    <label key={t} className="flex items-center gap-2 text-sm">
                      <Checkbox checked={type === t} onCheckedChange={() => setType(type === t ? null : t)} />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search jobs by title or company" className="pl-9" />
            </div>
            <span className="hidden text-sm text-muted-foreground md:inline">{filtered.length} jobs</span>
          </div>

          {isLoading ? (
            <Card className="border-dashed">
              <CardContent className="flex items-center justify-center py-16 text-center">
                <span className="text-sm text-muted-foreground">Loading jobs…</span>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="border-dashed">
              <CardContent className="flex items-center justify-center py-16 text-center">
                <span className="text-sm text-destructive">{error}</span>
              </CardContent>
            </Card>
          ) : filtered.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-muted">
                  <Briefcase className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold">No jobs match your filters</h3>
                <p className="mt-1 text-sm text-muted-foreground">Try widening the rate range or clearing some skills.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((j) => <JobCard key={j.id} job={j} />)}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function JobCard({ job }: { job: Job }) {
  const [letter, setLetter] = useState("");
  const [portfolio, setPortfolio] = useState("");
  return (
    <Card className="group border-border shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <Avatar className="h-11 w-11 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">{job.companyInitial}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-snug">{job.title}</h3>
              <span className="shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">KES {job.rate}/hr</span>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">{job.company} · <MapPin className="inline h-3 w-3" /> Remote</p>
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{job.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.skills.map((s) => (
            <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">{s}</span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="flex-1 text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>Apply Now</Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{job.title}</SheetTitle>
                <SheetDescription>{job.company} · KES {job.rate}/hr · {job.hours}h estimated</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6 px-1">
                <div>
                  <h4 className="text-sm font-semibold">About the role</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{job.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Skills</h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {job.skills.map((s) => (
                      <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
                  <div className="space-y-1.5">
                    <Label>Cover letter</Label>
                    <Textarea rows={5} value={letter} onChange={(e) => setLetter(e.target.value)} placeholder="Tell the client why you're a great fit…" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Portfolio URL</Label>
                    <Input value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="https://" />
                  </div>
                  <Button className="w-full text-primary-foreground" style={{ background: "var(--gradient-primary)" }} onClick={() => toast.success("Application submitted!")}>Submit application</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Button variant="outline" size="icon" asChild aria-label="Apply via email">
            <a href={`mailto:${job.email}?subject=Application for ${encodeURIComponent(job.title)}`}>
              <Mail className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
