import { StringifyOptions } from 'querystring';

export interface ReviewEntity {
  id: string;
  review: string;
  integerRate: string;
  level: string;
  status: string;
  createBy: string;
  createDate: any;
  updateBy: string;
  updateDate: any;
}
