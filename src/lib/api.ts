import { type Application, type Contact, type Job, type Message, type Payment, type User } from "./mockData";

// In dev, an empty base lets Vite's "/api" proxy (see vite.config.ts) forward to localhost:8000.
// In prod there is no proxy, so we default to the deployed Render API unless VITE_API_URL overrides it.
const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "" : "https://freelancehub-api-3.onrender.com");

const api = async <T>(path: string): Promise<T> => {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
};

export const fetchJobs = () => api<Job[]>("/api/jobs");
export const fetchApplications = () => api<Application[]>("/api/applications");
export const fetchPayments = () => api<Payment[]>("/api/payments");
export const fetchContacts = () => api<Contact[]>("/api/contacts");
export const fetchMessages = () => api<Message[]>("/api/messages");
export const fetchUsers = () => api<User[]>("/api/users");