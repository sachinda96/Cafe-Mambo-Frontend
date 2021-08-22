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
