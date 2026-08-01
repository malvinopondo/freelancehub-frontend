import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Briefcase, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, type Role } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — FreelanceHub" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("freelancer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, role);
      toast.success("Signed in");
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 bg-background/10" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-primary-foreground">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">FreelanceHub</span>
          </Link>
          <blockquote className="max-w-md">
            <p className="text-2xl font-medium leading-snug" style={{ fontFamily: "Sora, system-ui" }}>
              "FreelanceHub helped us hire three engineers in under a week. The quality of talent is unreal."
            </p>
            <footer className="mt-4 text-sm opacity-80">— Sasha Williams, CTO at Pixelcraft</footer>
          </blockquote>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <form onSubmit={submit} className="w-full max-w-sm space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "Sora, system-ui" }}>Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to continue to your dashboard.</p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-lg border border-border bg-muted/40 p-1">
            {(["freelancer", "client", "admin"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${role === r ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>

          <Button type="submit" className="w-full h-11 text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            Sign in as {role}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="outline"><Github className="mr-2 h-4 w-4" />GitHub</Button>
            <Button type="button" variant="outline"><Mail className="mr-2 h-4 w-4" />Google</Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            New here? <Link to="/register" className="font-semibold text-primary hover:underline">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
