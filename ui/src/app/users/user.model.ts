import { Role } from './role.model';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class User {
  id: number;
  @IsNotEmpty()
  name: string;
  photo: string;
  @IsNotEmpty()
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  isActive = true;
  role: any;
  @IsNotEmpty()
  roleId: any = '';
  emissionPoint: any;
  @IsNotEmpty()
  emissionPointId: any = '';
  turn: any;
  @IsNotEmpty()
  turnId: any = '';

  reset(): void {
    this.id = undefined;
    this.photo = null;
    this.name = '';
    this.username = '';
    this.email = '';
    this.isActive = true;
    this.role = {};
    this.roleId = '';
    this.emissionPoint = {};
    this.emissionPointId = '';
    this.turn = {};
    this.turnId = '';
  }
}
