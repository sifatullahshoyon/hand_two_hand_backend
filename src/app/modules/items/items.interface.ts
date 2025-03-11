export interface IProduct {
  name: string;
  brand: string;
  price: number;
  categories: string;
  description: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
