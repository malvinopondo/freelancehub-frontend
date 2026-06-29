import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, ArrowRight, Sparkles, Shield, Zap, Globe, Star, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FreelanceHub — Find work. Hire talent." },
      { name: "description", content: "The modern marketplace connecting freelancers and clients. Post jobs, hire vetted talent, get paid fast." },
      { property: "og:title", content: "FreelanceHub — Find work. Hire talent." },
      { property: "og:description", content: "The modern marketplace connecting freelancers and clients." },
    ],
  }),
  component: Index,
});

function Index() {
  const { theme, toggle } = useTheme();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">FreelanceHub</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <Link to="/jobs" className="hover:text-foreground">Browse jobs</Link>
            <a href="#stats" className="hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.18]" style={{ background: "var(--gradient-hero)" }} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,transparent_0%,var(--background)_70%)]" />
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Trusted by 50,000+ teams worldwide
            </div>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl" style={{ fontFamily: "Sora, system-ui" }}>
              Where great work
              <span className="block bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
                finds great people.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Post a project in minutes, hire vetted freelancers, and pay securely — all in one beautifully simple workspace.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-6 text-base shadow-lg text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                <Link to="/post-job">
                  Post a Job <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
                <Link to="/jobs">Find Work</Link>
              </Button>
            </div>
          </div>

          <div id="stats" className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { v: "24,581", l: "Active jobs" },
              { v: "120K+", l: "Freelancers" },
              { v: "$48.2M", l: "Paid to talent" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-soft)]">
                <div className="text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: "Sora, system-ui" }}>{s.v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-border bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: "Sora, system-ui" }}>
              A platform built for both sides.
            </h2>
            <p className="mt-4 text-muted-foreground">From discovery to payout, every step has been thoughtfully designed.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { i: Zap, t: "Find work in minutes", d: "Smart matching surfaces the most relevant projects for your skills, in real time." },
              { i: Shield, t: "Protected payments", d: "Escrow-backed milestones make sure no one pays — or works — without trust." },
              { i: Globe, t: "Truly global", d: "Hire across 190+ countries with localized payments in 50+ currencies." },
            ].map((f) => (
              <div key={f.t} className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <f.i className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border p-10 md:p-16" style={{ background: "var(--gradient-primary)" }}>
            <div className="relative z-10 max-w-2xl text-primary-foreground">
              <Star className="mb-4 h-6 w-6" />
              <h2 className="text-3xl font-bold md:text-4xl" style={{ fontFamily: "Sora, system-ui" }}>Ready to ship something great?</h2>
              <p className="mt-3 text-primary-foreground/90">Join FreelanceHub today and meet the talent or clients changing how work gets done.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="secondary" className="h-12">
                  <Link to="/register">Create free account</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/dashboard">Live demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} FreelanceHub. Designed for builders.
      </footer>
    </div>
  );
}