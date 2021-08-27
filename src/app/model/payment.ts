// export interface Payment {
//   id: string;
//   amount: number;
//   method: string;
//   paymentStatus: string;
// }

export class Payment {
  id: string = '';
  amount: number = 0;
  method: string = '';
  paymentStatus: string = '';

  constructor() {}
}

export class paymentEntity {
  amount: number = 0;
  createBy: string = '';
  createDate: Date = new Date();
  id: string = '';
  method: string = '';
  paymentStatus: string = '';
  status: string = '';
  updateBy: string = '';
  updateDate: string = '';
}
