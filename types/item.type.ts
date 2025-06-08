export interface Item {
  _id: string;
  category_enum: "shirt" | "pants" | "shoes";
  imageLink: string;
  name: string;
  user: string;
  description?: string;
  is_favorite: boolean;
  create_at: string;
  update_at: string;
}

export interface ItemResponse {
  data: Item[];
  httpStatusCode: number;
}
