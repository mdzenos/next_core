// app/types/index.ts
export type Lead = {
  id: string;
  title: string | null;
  description: string | null;
  rating: string | null;
};

export type Contact = {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyId?: string;
};

export type Account = {
  id: string;
  name: string;
  industry?: string;
  website?: string;
};
