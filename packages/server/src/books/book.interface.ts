export interface IBook {
  id: number;
  name: string;
  author: string;
  publisher: string;
  status: number;
  category: number;
  image_path: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
