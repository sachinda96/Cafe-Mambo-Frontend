export interface PaymentEntity {
  id: string;
  amount: number;
  method: string;
  paymentStatus: string;
  status: string;
  createBy: string;
  createDate: any;
  updateBy: string;
  updateDate: any;
}

export interface PaymentDto {
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
