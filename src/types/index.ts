export type Lead = {
  id: string;
  name: string;
  email?: string;
  status: "new" | "contacted" | "qualified" | "lost";
  owner?: string;
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
