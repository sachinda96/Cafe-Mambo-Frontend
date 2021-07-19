import { HttpClient } from '@angular/common/http';

export interface Item {
  id: number;
  name: string;
  type: string;
  price: number;
  description: string;
  image: HTMLImageElement;
}

export const items = [
  {
    id: 1,
    name: 'Mojitto',
    type: 'drinks',
    price: 300,
    description:
      "This is an authentic recipe for mojito. I sized the recipe for one serving, but you can adjust it accordingly and make a pitcher full. It's a very refreshing drink for hot summer days. Be careful when drinking it, however. If you make a pitcher you might be tempted to drink the whole thing yourself, and you just might find yourself talking Spanish in no time! Tonic water can be substituted instead of the soda water but the taste is different and somewhat bitter.",
  },
  {
    id: 2,
    name: 'Spiced Edamame',
    type: 'food',
    price: 350,
    description:
      "Toss tender, cooked edamame pods in a homemade chili salt made using chili powder, red pepper flakes and dried oregano. The spicy blend complements the beans' mildly sweet flavor.",
  },
];
