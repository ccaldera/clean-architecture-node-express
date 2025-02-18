export class LoginRequest {
  private email: string;
  private password: string;

  constructor(email:string, password: string) {
    this.email = email;
    this.password = password;
  }

  get getEmail() {
    return this.email;
  }

  get getPassword() {
    return this.password;
  }
}
