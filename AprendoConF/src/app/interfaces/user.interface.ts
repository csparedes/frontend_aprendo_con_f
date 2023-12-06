export interface User {
  id?: any;
  role: string;
  username: string;
  password: string;
  email: string;
  name: string;
  postal_code: string
  country: string;
  city: string;
  areas?: string[];
  experience?: number;
  imageUrl: string;
  description: string;
  hourly_rate: any;
  rating: number;
  phone?: string;
  status: string;
}

export interface sendStatus {
  status: string;
}
