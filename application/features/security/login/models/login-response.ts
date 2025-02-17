import { User } from "../../../../../domain/entities/user";

export class LoginResponse {
  
  constructor(private user:User) {
  }

  getUser() {
    return this.user;
  }
}
