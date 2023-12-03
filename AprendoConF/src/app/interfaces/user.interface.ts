export interface User {
  // id: number;
  // registered: boolean;
  // imageUrl: string,
  // username: string;
  // password: string;
  // email: string;
  // name: string;
  // postalcode: string;
  // country: string;
  // role: string,
  // knowledgeAreas: string[];
  // location: {
  //   name: string;
  //   country: string;
  //   pinImage: string;
  // };
  // price: string;
  // rating: number;
  // phone?: string;
  // description?: string
  // experience?: number
  id: number;
  name: string;
  email: string;
  country: string;
  city: string;
  imageUrl: string;
  hourly_rate: string;
  role: string;
  knowledgeAreas: string[];
  rating: number;
  phone?: string;
  description?: string;
  experience?: number;
}

export interface UserPr {
  id: number;
  registered: boolean;
  imageUrl: string;
  username: string;
  password: string;
  email: string;
  name: string;
  postalcode: string;
  country: string;
  role: string;
  knowledgeAreas: string[];
  location: {
    name: string;
    country: string;
    pinImage: string;
  };
  price: string;
  rating: number;
  phone?: string;
  description?: string;
  experience?: number;
}
