export interface IRating {
  rate: number;
  count: number;
}

export interface IProdutoData {
  image: string;
  title: string;
  price: number;
  id: number;
  description: string;
  category: string;
  rating: IRating;
}
