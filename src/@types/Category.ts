export type Category = {
  CategoryId: number;
  CategoryName: string;
  ProductsCount: number;
  ImageGuid: string;
}

export type MenuItem = {
  Url?: string;
  Id: number;
  ParentMenuItemId?: number;
  Title: string;
}

export type ArrangedMenu = {
  Id: number;
  Title: string;
  children: MenuItem[];
}