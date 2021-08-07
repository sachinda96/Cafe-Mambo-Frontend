export interface DeliveryDetailsEntity {
  id: string;
  name: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  mobileNo: string;
  deliveryNote: string;
  deliveryDate: any;
  status: string;
  createBy: string;
  createDate: any;
  updateBy: string;
  updateDate: any;
}

export interface DeliveryDto {
  id: string;
  name: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  mobileNo: string;
  deliveryNote: string;
  deliveryDate: any;
}
