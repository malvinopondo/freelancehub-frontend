import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Briefcase, Github, Mail, Code, Building2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, type Role } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — FreelanceHub" }] }),
  component: RegisterPage,
});

const ROLES: { value: Role; title: string; desc: string; icon: typeof Code }[] = [
  { value: "freelancer", title: "Freelancer", desc: "Find work, build a portfolio.", icon: Code },
  { value: "client", title: "Client", desc: "Post jobs and hire experts.", icon: Building2 },
  { value: "admin", title: "Admin", desc: "Manage a team workspace.", icon: Shield },
];

function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("freelancer");
  const [form, setForm] = useState({ name: "", email: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ name: form.name || "New User", email: form.email, role });
    toast.success("Welcome to FreelanceHub!");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-10 md:px-8">
        <Link to="/" className="flex items-center gap-2 self-start">
          <div className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            <Briefcase className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold">FreelanceHub</span>
        </Link>

        <div className="mx-auto mt-12 w-full max-w-2xl">
          <h1 className="text-center text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: "Sora, system-ui" }}>
            Create your account
          </h1>
          <p className="mt-2 text-center text-muted-foreground">Pick your role — you can change it anytime.</p>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {ROLES.map((r) => {
              const active = role === r.value;
              return (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`group rounded-2xl border p-5 text-left transition-all ${active ? "border-primary bg-primary/5 shadow-[var(--shadow-elegant)]" : "border-border bg-card hover:border-primary/40"}`}
                >
                  <div className={`mb-3 grid h-10 w-10 place-items-center rounded-xl ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    <r.icon className="h-5 w-5" />
                  </div>
                  <div className="font-semibold">{r.title}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{r.desc}</p>
                </button>
              );
            })}
          </div>

          <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Full name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Alex Morgan" required />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@work.com" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Password</Label>
              <Input type="password" placeholder="At least 8 characters" required />
            </div>
            <Button type="submit" className="w-full h-11 text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              Create my account
            </Button>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or</span></div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline"><Github className="mr-2 h-4 w-4" />GitHub</Button>
              <Button type="button" variant="outline"><Mail className="mr-2 h-4 w-4" />Google</Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already a member? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}