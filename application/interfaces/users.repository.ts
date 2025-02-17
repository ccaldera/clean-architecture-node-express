import { User } from "../../domain/entities/user";

export interface IUserRepository {  
  findByEmailAndPassword(email: string, password:string): Promise<User | null>;
}
