import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera, MapPin, Star, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — FreelanceHub" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const [skills, setSkills] = useState(["React", "TypeScript", "Figma", "Node.js"]);
  const [skillDraft, setSkillDraft] = useState("");

  const portfolio = [
    { t: "Linear-style task app", d: "React + TanStack + Supabase" },
    { t: "Brand refresh — Northwind", d: "Identity, packaging, motion" },
    { t: "Forge API docs", d: "End-to-end developer documentation" },
  ];

  return (
    <DashboardLayout>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
        <div className="relative h-44 md:h-56" style={{ background: "var(--gradient-hero)" }}>
          <button className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-lg bg-background/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur hover:bg-background/40">
            <Camera className="h-3.5 w-3.5" /> Update cover
          </button>
        </div>
        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-card shadow-lg">
                  <AvatarFallback className="bg-primary/15 text-2xl font-bold text-primary">{user?.name?.split(" ").map((s) => s[0]).join("").slice(0, 2)}</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-1 right-1 grid h-7 w-7 place-items-center rounded-full bg-card shadow-md ring-1 ring-border"><Camera className="h-3.5 w-3.5" /></button>
              </div>
              <div className="pb-1">
                <h2 className="text-2xl font-bold" style={{ fontFamily: "Sora, system-ui" }}>{user?.name}</h2>
                <p className="text-sm text-muted-foreground capitalize">{user?.role} · <MapPin className="inline h-3 w-3" /> San Francisco, CA</p>
              </div>
            </div>
            <Button onClick={() => toast.success("Profile saved")}>Save changes</Button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { l: "Jobs completed", v: "47" },
              { l: "Hours logged", v: "1,284" },
              { l: "Rating", v: "4.9", icon: true },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-border p-4">
                <div className="text-xs text-muted-foreground">{s.l}</div>
                <div className="mt-1 flex items-center gap-1 text-2xl font-bold" style={{ fontFamily: "Sora, system-ui" }}>
                  {s.v}
                  {s.icon && <Star className="h-5 w-5 fill-warning text-warning" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border shadow-[var(--shadow-soft)]">
          <CardHeader><CardTitle>Edit details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Full name</Label><Input defaultValue={user?.name} /></div>
              <div className="space-y-1.5"><Label>Location</Label><Input defaultValue="San Francisco, CA" /></div>
              <div className="space-y-1.5"><Label>Hourly rate ($)</Label><Input type="number" defaultValue={95} /></div>
              <div className="space-y-1.5"><Label>Portfolio URL</Label><Input defaultValue="https://alex.design" /></div>
            </div>
            <div className="space-y-1.5">
              <Label>Bio</Label>
              <Textarea rows={4} defaultValue="Senior product engineer building polished web apps with React, TypeScript, and a love for great UX." />
            </div>
            <div className="space-y-1.5">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-1.5 rounded-lg border border-input bg-background p-2">
                {skills.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {s}
                    <button onClick={() => setSkills(skills.filter((x) => x !== s))} aria-label="Remove"><X className="h-3 w-3" /></button>
                  </span>
                ))}
                <input
                  value={skillDraft}
                  onChange={(e) => setSkillDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && skillDraft.trim()) { e.preventDefault(); setSkills([...skills, skillDraft.trim()]); setSkillDraft(""); }
                  }}
                  placeholder="Add a skill…"
                  className="flex-1 min-w-[120px] bg-transparent text-sm outline-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-[var(--shadow-soft)]">
          <CardHeader><CardTitle>Portfolio</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {portfolio.map((p, i) => (
              <div key={i} className="rounded-xl border border-border p-3 transition-colors hover:border-primary/40">
                <div className="h-20 rounded-lg" style={{ background: `linear-gradient(135deg, oklch(0.6 0.2 ${280 + i * 30}), oklch(0.72 0.17 ${160 + i * 20}))` }} />
                <div className="mt-2 text-sm font-semibold">{p.t}</div>
                <div className="text-xs text-muted-foreground">{p.d}</div>
              </div>
            ))}
            <Button variant="outline" className="w-full">+ Add project</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}