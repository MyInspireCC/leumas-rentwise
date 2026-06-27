export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'TENANT' | 'AGENT' | 'LANDLORD';
}