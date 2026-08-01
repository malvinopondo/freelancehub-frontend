import { type Application, type Contact, type Job, type Message, type Payment, type User } from "./mockData";

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

type AuthResponse = { user: { id: number; name: string; email: string }; token: string };

const postAuth = async (path: string, body: Record<string, string>): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status === 422) {
      const data = await response.json().catch(() => null);
      const firstError = data?.errors ? (Object.values(data.errors)[0] as string[])?.[0] : undefined;
      throw new Error(firstError ?? "Please check your details and try again.");
    }
    throw new Error("Something went wrong. Please try again.");
  }

  return response.json() as Promise<AuthResponse>;
};

export const login = (email: string, password: string) => postAuth("/api/login", { email, password });

export const register = (name: string, email: string, password: string) =>
  postAuth("/api/register", { name, email, password });
