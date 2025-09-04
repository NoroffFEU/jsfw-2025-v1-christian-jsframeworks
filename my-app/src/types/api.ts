export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: { url: string; alt: string };
  rating: number;
  tags: string[];
  reviews: Review[];
};

export type Review = {
  id: string;
  username: string;
  rating: number;
  description: string;
};

export type ApiListResponse<T> = {
  data: T[];
  meta: unknown;
};
