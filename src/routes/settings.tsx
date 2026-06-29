import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — FreelanceHub" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggle } = useTheme();
  return (
    <DashboardLayout title="Settings">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border shadow-[var(--shadow-soft)]">
          <CardHeader><CardTitle>Account</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5"><Label>Display name</Label><Input defaultValue="Alex Morgan" /></div>
            <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="alex@freelancehub.app" /></div>
            <div className="space-y-1.5"><Label>Timezone</Label><Input defaultValue="America/Los_Angeles" /></div>
            <Button onClick={() => toast.success("Account updated")}>Save</Button>
          </CardContent>
        </Card>

        <Card className="border-border shadow-[var(--shadow-soft)]">
          <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Row label="Dark mode" desc="Switch between light and dark themes.">
              <Switch checked={theme === "dark"} onCheckedChange={toggle} />
            </Row>
            <Row label="Email notifications" desc="New messages and job matches."><Switch defaultChecked /></Row>
            <Row label="Weekly digest" desc="A Monday summary of activity."><Switch defaultChecked /></Row>
            <Row label="Public profile" desc="Allow clients to discover you."><Switch defaultChecked /></Row>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function Row({ label, desc, children }: { label: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      {children}
    </div>
  );
}