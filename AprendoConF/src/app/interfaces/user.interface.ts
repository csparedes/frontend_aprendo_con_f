export interface User {
  id?: any;
  role: string;
  username: string;
  password: string;
  email: string;
  name: string;
  postal_code: string;
  country: string;
  city: string;
  areas?: string[];
  experience?: any;
  imageUrl: string;
  description: string;
  hourly_rate: any;
  rating: any;
  phone?: string;
  status: string;
  fatal?: string;
  respuesta?: boolean;
  mensaje?: any;
}

export interface sendStatus {
  status: string;
}

export interface loginBody {
  email: string;
  password: string;
}
