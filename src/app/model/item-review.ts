// export interface ItemReview {
//   id: string;
//   review: string;
//   rate: string;
//   level: string;
//   status: string;
//   createBy: string;
//   createDate: any;
//   updateBy: string;
//   updateDate: any;
// }

export class ItemReview {
  id: string | null = '';
  review: string = '';
  rate: number = 0;
  userId: string = '';
  userName: string = '';
  itemId: string = '';
  level: string = '';
  // createDate: Date = new Date();

  constructor() {}
}
