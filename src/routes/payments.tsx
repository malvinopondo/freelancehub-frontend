import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { fetchPayments } from "@/lib/api";
import { type Payment } from "@/lib/mockData";
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { Download, DollarSign, Clock, Wallet, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/payments")({
  head: () => ({ meta: [{ title: "Payments — FreelanceHub" }] }),
  component: PaymentsPage,
});

function PaymentsPage() {
  const { user } = useAuth();
  const isClient = user?.role === "client";
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchPayments()
      .then(setPayments)
      .catch((err) => setError(err.message ?? "Failed to load payments."))
      .finally(() => setIsLoading(false));
  }, []);

  const totalEarned = payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.hours * p.rate, 0);
  const pendingPayout = payments.filter((p) => p.status !== "Paid").reduce((s, p) => s + p.hours * p.rate, 0);
  const thisMonth = 7400;
  const avgRate = payments.length ? Math.round(payments.reduce((s, p) => s + p.rate, 0) / payments.length) : 0;

  if (isLoading) {
    return (
      <DashboardLayout title="Payments">
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">Loading payments…</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Payments">
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-destructive">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Payments">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { i: DollarSign, l: "Total Earned", v: `$${totalEarned.toLocaleString()}`, tone: "bg-success/15 text-success" },
          { i: Clock, l: "Pending Payout", v: `$${pendingPayout.toLocaleString()}`, tone: "bg-warning/15 text-warning" },
          { i: TrendingUp, l: "This Month", v: `$${thisMonth.toLocaleString()}`, tone: "bg-primary/10 text-primary" },
          { i: Wallet, l: "Avg Hourly Rate", v: `$${avgRate}/hr`, tone: "bg-accent/15 text-accent" },
        ].map((s) => (
          <Card key={s.l} className="border-border shadow-[var(--shadow-soft)]">
            <CardContent className="p-5">
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${s.tone}`}><s.i className="h-5 w-5" /></div>
              <div className="mt-4 text-2xl font-bold" style={{ fontFamily: "Sora, system-ui" }}>{s.v}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border shadow-[var(--shadow-soft)]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Monthly earnings</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>Request payout</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Request a payout</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div className="space-y-1.5"><Label>Amount</Label><Input defaultValue={`$${pendingPayout}`} /></div>
                  <div className="space-y-1.5"><Label>Destination</Label><Input defaultValue="Bank •••• 4421" /></div>
                </div>
                <DialogFooter>
                  <Button onClick={() => toast.success("Payout requested!")} className="text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={payments.map(p => ({ month: p.date, earnings: p.hours * p.rate }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} axisLine={false} tickLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Bar dataKey="earnings" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-[var(--shadow-soft)]">
          <CardHeader><CardTitle>Quick stats</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { l: "Lifetime invoices", v: "47" },
              { l: "On-time payments", v: "100%" },
              { l: "Disputes", v: "0" },
              { l: "Tax docs", v: "Up to date" },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0">
                <span className="text-muted-foreground">{r.l}</span>
                <span className="font-semibold">{r.v}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-border shadow-[var(--shadow-soft)]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isClient ? "Amounts owed" : "Earnings"}</CardTitle>
          <Button variant="outline" size="sm" onClick={() => toast.success("CSV exported")}>
            <Download className="mr-2 h-4 w-4" />Export CSV
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job</TableHead>
                  <TableHead>{isClient ? "Freelancer" : "Client"}</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Subtotal</TableHead>
                  <TableHead>Fee (10%)</TableHead>
                  <TableHead>Net</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  {isClient && <TableHead className="text-right">Action</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p) => {
                  const sub = p.hours * p.rate;
                  const fee = +(sub * 0.1).toFixed(2);
                  return (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.jobTitle}</TableCell>
                      <TableCell>{p.client}</TableCell>
                      <TableCell>{p.hours}h</TableCell>
                      <TableCell>${p.rate}/hr</TableCell>
                      <TableCell>${sub.toLocaleString()}</TableCell>
                      <TableCell className="text-muted-foreground">${fee.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">${(sub - fee).toLocaleString()}</TableCell>
                      <TableCell><StatusBadge status={p.status} /></TableCell>
                      <TableCell className="text-muted-foreground">{p.date}</TableCell>
                      {isClient && (
                        <TableCell className="text-right">
                          {p.status !== "Paid" && (
                            <Button size="sm" variant="outline" onClick={() => toast.success("Marked as paid")}>Mark as Paid</Button>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}


