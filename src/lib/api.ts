import { type Application, type Contact, type Job, type Message, type Payment, type User } from "./mockData";

const api = async <T>(path: string): Promise<T> => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
};

export const fetchJobs = () => api<Job[]>("/api/jobs");
export const fetchApplications = () => api<Application[]>("/api/applications");
export const fetchPayments = () => api<Payment[]>("/api/payments");
export const fetchContacts = () => api<Contact[]>("/api/contacts");
export const fetchMessages = () => api<Message[]>("/api/messages");
export const fetchUsers = () => api<User[]>("/api/users");