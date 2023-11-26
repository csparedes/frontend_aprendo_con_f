export interface User {
  id: number;
  registered: boolean;
  imageUrl: string,
  username: string;
  password: string;
  email: string;
  name: string;
  postalcode: string;
  country: string;
  role: string,
  knowledgeAreas: string[];
  location: {
    name: string;
    country: string;
    pinImage: string;
  };
  price: string;
  rating: number;
  phone?: string;
  description?: string
}
