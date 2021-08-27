// export interface Delivery {
//   id: string;
//   name: string;
//   address: string;
//   city: string;
//   district: string;
//   postalCode: string;
//   mobileNo: string;
//   deliveryNote: string;
//   deliveryDate: any;
// }

export class Delivery {
  id: string = '';
  name: string = '';
  address: string = '';
  city: string = '';
  district: string = '';
  postalCode: string = '';
  mobileNo: string = '';
  deliveryNote: string = '';
  deliveryDate: any;

  constructor() {}
}

export class DeliveryDetailsEntity {
  address: string = '';
  city: string = '';
  createBy: string = '';
  createDate: Date = new Date();
  DeliveryDate: Date = new Date();
  deliveryNote: string = '';
  district: string = '';
  id: string | undefined = '';
  mobileNo: string = '';
  name: string = '';
  postalCode: string = '';
  status: string = '';
  updateBy: string = '';
  updateDate: Date = new Date();
}
