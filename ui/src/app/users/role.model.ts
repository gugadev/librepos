export class Role {
  id: number;
  name: string;
  description: string;
  isActive: boolean;

  constructor(id: number, name: string, description: string, isActive: boolean) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isActive = isActive;
  }
}