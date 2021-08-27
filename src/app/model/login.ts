// export interface LoginEntity {
//   id: string;
//   email: string;
//   password: string;
//   locked: string;
//   status: string;
//   createBy: string;
//   createDate: any;
//   updateBy: string;
//   updateDate: any;
// }

export interface LoginDto {
  email: string;
  password: string;
}

export class Login {
  email: string = '';
  password: string = '';
}

export class loginEntity {
  createBy: string = '';
  createDate: Date = new Date();
  email: string = '';
  id: string = '';
  locked: boolean = false;
  password: string = '';
  status: string = '';
  updateBy: string = '';
  updateDate: Date = new Date();

  constructor() {}
}
