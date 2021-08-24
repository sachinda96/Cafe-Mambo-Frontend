export class Item {
  id: string | undefined;
  name: string | undefined;
  price: number = 0;
  imagePath: string | undefined;
  categoryId: string | undefined;
  description: string | undefined;
  ingredients: Array<string> | undefined;
  rateCount: number | undefined;
}

export class ItemDTO {
  id: string | undefined;
  name: string | undefined;
  price: number = 0;
  imagePath: string | undefined;
  categoryId: string | undefined;
  description: string | undefined;
  ingredients: Array<string> | undefined;
  rateCount: number | undefined;
  qty: number | undefined;
}
