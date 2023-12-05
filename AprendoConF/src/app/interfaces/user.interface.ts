export interface User {
  id: number;
  name: string;
  email: string;
  country: string;
  city: string;
  imageUrl: string;
  hourly_rate: string;
  role: string;
  areas: string[];
  rating: number;
  phone?: string;
  description?: string;
  experience?: number;
  status: string;
}


