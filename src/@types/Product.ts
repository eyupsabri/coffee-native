export type Product = {
  ProductId: number;
  ProductName: string;
  ProductPrice: number;
  ProductDescription: string;
  CategoryId: number;
  CategoryName: string;
  ImageGuid: string;
}

export type Paging = {
  dtos: Product[] | null;
  PageIndex: number;
  PageCount: number;
}

export type ProductUpdateReq = {
  product: Product;
  image: string;
}