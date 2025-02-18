export class User {
  private id: string;
  private email: string;
  private password: string;

  constructor(id:string, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  getId() {
    return this.id;
  }

  getText() {
    return this.email;
  }

  getOwner() {
    return this.password;
  }
}
