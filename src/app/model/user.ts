import { Login, LoginDto } from './login';

export class User {
  id: string = '';
  name: string = '';
  email: string = '';
  role: string = '';
  status: string = '';
  loginDto: Login = new Login();
  constructor() {}
}

export class UserEntity {
  address: string | null = '';
  createBy: string = '';
  createDate: Date = new Date();
  email: string = '';
  id: string | undefined = '';
  name: string = '';
  role: string = '';
  status: string = '';
  telNo: string = '';
  updateBy: string = '';
  updateDate: string = '';
  constructor() {}
}

export class UserProfile {
  id: string | null = '';
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  telNo: string = '';
  address: string = '';
  constructor() {}
}
