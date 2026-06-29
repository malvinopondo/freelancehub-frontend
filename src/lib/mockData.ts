export type JobStatus = "Open" | "In Progress" | "Completed";
export type AppStatus = "Pending" | "Reviewed" | "Accepted" | "Rejected";
export type PaymentStatus = "Paid" | "Pending" | "Processing";

export interface Job {
  id: string;
  title: string;
  company: string;
  companyInitial: string;
  category: string;
  rate: number;
  hours: number;
  skills: string[];
  description: string;
  status: JobStatus;
  type: "Hourly" | "Fixed";
  postedAt: string;
  applicants: number;
  email: string;
}

export const categories = ["Design", "Development", "Writing", "Marketing", "Video", "Data"];
export const skillTags = ["React", "TypeScript", "Figma", "Node.js", "Python", "SEO", "Copywriting", "Tailwind", "GraphQL", "AWS"];

export const jobs: Job[] = [
  { id: "j1", title: "Senior React Engineer", company: "Pixelcraft Studio", companyInitial: "PS", category: "Development", rate: 95, hours: 80, skills: ["React", "TypeScript", "GraphQL"], description: "Build a refreshed dashboard experience for our analytics product. Strong React + TS chops required.", status: "Open", type: "Hourly", postedAt: "2026-06-18", applicants: 14, email: "hire@pixelcraft.io" },
  { id: "j2", title: "Brand Identity Designer", company: "Northwind Coffee", companyInitial: "NC", category: "Design", rate: 70, hours: 40, skills: ["Figma", "Branding"], description: "Refresh our coffee chain's identity — logo, packaging, in-store materials.", status: "Open", type: "Fixed", postedAt: "2026-06-15", applicants: 32, email: "design@northwind.co" },
  { id: "j3", title: "Technical Writer — Developer Docs", company: "Forge API", companyInitial: "FA", category: "Writing", rate: 55, hours: 60, skills: ["Copywriting", "TypeScript"], description: "Author end-to-end developer documentation for our REST + GraphQL APIs.", status: "In Progress", type: "Hourly", postedAt: "2026-06-10", applicants: 9, email: "team@forgeapi.dev" },
  { id: "j4", title: "Data Engineer — Pipelines", company: "Lumen Health", companyInitial: "LH", category: "Data", rate: 110, hours: 120, skills: ["Python", "AWS"], description: "Design and ship ETL pipelines for clinical data warehousing.", status: "Open", type: "Hourly", postedAt: "2026-06-20", applicants: 6, email: "talent@lumenhealth.com" },
  { id: "j5", title: "Product Marketing Lead", company: "Orbital Apps", companyInitial: "OA", category: "Marketing", rate: 85, hours: 50, skills: ["SEO", "Copywriting"], description: "Own GTM for our upcoming mobile launch — positioning, landing, lifecycle.", status: "Completed", type: "Fixed", postedAt: "2026-05-22", applicants: 21, email: "hr@orbital.app" },
  { id: "j6", title: "Video Editor — YouTube Channel", company: "Cascade Media", companyInitial: "CM", category: "Video", rate: 45, hours: 30, skills: ["Premiere", "Motion"], description: "Edit weekly long-form videos with motion graphics and color grading.", status: "Open", type: "Hourly", postedAt: "2026-06-19", applicants: 18, email: "edit@cascade.media" },
];

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  rate: number;
  hours: number;
  status: AppStatus;
  applicantName: string;
}

export const applications: Application[] = [
  { id: "a1", jobId: "j1", jobTitle: "Senior React Engineer", company: "Pixelcraft Studio", appliedAt: "2026-06-19", rate: 95, hours: 80, status: "Reviewed", applicantName: "Alex Morgan" },
  { id: "a2", jobId: "j2", jobTitle: "Brand Identity Designer", company: "Northwind Coffee", appliedAt: "2026-06-16", rate: 70, hours: 40, status: "Pending", applicantName: "Alex Morgan" },
  { id: "a3", jobId: "j4", jobTitle: "Data Engineer — Pipelines", company: "Lumen Health", appliedAt: "2026-06-20", rate: 110, hours: 120, status: "Accepted", applicantName: "Alex Morgan" },
  { id: "a4", jobId: "j5", jobTitle: "Product Marketing Lead", company: "Orbital Apps", appliedAt: "2026-05-24", rate: 85, hours: 50, status: "Rejected", applicantName: "Alex Morgan" },
  { id: "a5", jobId: "j6", jobTitle: "Video Editor — YouTube Channel", company: "Cascade Media", appliedAt: "2026-06-19", rate: 45, hours: 30, status: "Pending", applicantName: "Jordan Lee" },
  { id: "a6", jobId: "j3", jobTitle: "Technical Writer", company: "Forge API", appliedAt: "2026-06-11", rate: 55, hours: 60, status: "Reviewed", applicantName: "Priya Shah" },
];

export interface Payment {
  id: string;
  jobTitle: string;
  client: string;
  hours: number;
  rate: number;
  status: PaymentStatus;
  date: string;
}

export const payments: Payment[] = [
  { id: "p1", jobTitle: "Senior React Engineer", client: "Pixelcraft", hours: 32, rate: 95, status: "Paid", date: "2026-06-01" },
  { id: "p2", jobTitle: "Brand Identity Designer", client: "Northwind", hours: 18, rate: 70, status: "Paid", date: "2026-05-18" },
  { id: "p3", jobTitle: "Data Engineer", client: "Lumen Health", hours: 40, rate: 110, status: "Processing", date: "2026-06-15" },
  { id: "p4", jobTitle: "Technical Writer", client: "Forge API", hours: 24, rate: 55, status: "Pending", date: "2026-06-20" },
  { id: "p5", jobTitle: "Video Editor", client: "Cascade", hours: 12, rate: 45, status: "Paid", date: "2026-04-29" },
];

export const monthlyEarnings = [
  { month: "Jan", earnings: 3200 },
  { month: "Feb", earnings: 4100 },
  { month: "Mar", earnings: 3800 },
  { month: "Apr", earnings: 5200 },
  { month: "May", earnings: 6100 },
  { month: "Jun", earnings: 7400 },
];

export interface Contact {
  id: string;
  name: string;
  role: string;
  initial: string;
  last: string;
  time: string;
  unread: number;
  online: boolean;
}

export const contacts: Contact[] = [
  { id: "c1", name: "Sasha Williams", role: "Client · Pixelcraft", initial: "SW", last: "Sounds great, let's hop on a call tomorrow.", time: "9:42 AM", unread: 2, online: true },
  { id: "c2", name: "Marcus Chen", role: "Client · Forge API", initial: "MC", last: "Sent over the contract draft.", time: "Yesterday", unread: 0, online: false },
  { id: "c3", name: "Priya Shah", role: "Freelancer · Writer", initial: "PS", last: "I can start Monday.", time: "Mon", unread: 1, online: true },
  { id: "c4", name: "FreelanceHub Support", role: "Admin", initial: "FH", last: "Your payout has been approved.", time: "Jun 18", unread: 0, online: true },
];

export interface Message {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
}

export const sampleThread: Message[] = [
  { id: "m1", from: "them", text: "Hi Alex! Thanks for applying to the React role.", time: "9:21 AM" },
  { id: "m2", from: "me", text: "Happy to chat — I had a few questions about the codebase.", time: "9:25 AM" },
  { id: "m3", from: "them", text: "Of course. We use React 19 with TanStack everywhere.", time: "9:30 AM" },
  { id: "m4", from: "me", text: "Perfect, that's my stack daily.", time: "9:33 AM" },
  { id: "m5", from: "them", text: "Sounds great, let's hop on a call tomorrow.", time: "9:42 AM" },
];

export const users = [
  { id: "u1", name: "Alex Morgan", role: "freelancer", email: "alex@freelancehub.app", joined: "2025-11-12", status: "Active" },
  { id: "u2", name: "Sasha Williams", role: "client", email: "sasha@pixelcraft.io", joined: "2025-09-04", status: "Active" },
  { id: "u3", name: "Priya Shah", role: "freelancer", email: "priya@writer.co", joined: "2026-01-22", status: "Active" },
  { id: "u4", name: "Marcus Chen", role: "client", email: "marcus@forgeapi.dev", joined: "2025-12-09", status: "Active" },
  { id: "u5", name: "Jordan Lee", role: "freelancer", email: "jordan@motion.tv", joined: "2026-03-14", status: "Pending" },
];