import { LoginEntity } from './login';

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createBy: string;
  createDate: string;
  updateBy: string;
  updateDate: string;
  loginEntity: LoginEntity;
}
