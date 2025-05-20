export type Member = {
    id: number;
    name: string;
    title: string;
    email: string;
    phone: string;
    domain: string;
    shared: number;
    avatar: string;
    coverPhoto: string;
    expiresAt: string;
    viewed: number;
    facebook: string;
    instagram: string;
    linkedin: string;
    website?: string;
    bio?: string;
    companyId: number | null;
  
    messenger?: string;
    x?: string;
    location?: string;
  }
  