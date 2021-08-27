import {Item} from "./item";
import {Payment} from "./payment";

export class ShopOrder {

  id:string = "";
  tableId:number = 0;
  customerName:string = "";
  contactNumber:string = "";
  itemDtoList:Array<Item> = new Array<Item>();
  paymentDto:Payment = new Payment();
  price:number = 0;

}
