import { inject } from 'inversify';
import { OperationResult } from "../../../../domain/results/operation-result";
import { IHandler } from "../../../interfaces/handler";
import { IUserRepository } from "../../../interfaces/users.repository";
import { LoginRequest } from "./models/login-request";
import { LoginResponse } from "./models/login-response";

export class LoginHandler implements IHandler<LoginRequest, LoginResponse> {
  
  constructor(@inject('IUserRepository') private usersRepository:IUserRepository) {
  }

  async handle(request: LoginRequest): Promise<OperationResult<LoginResponse>> {
    
    var user = await this.usersRepository.findByEmailAndPassword(request.getEmail, request.getPassword);

    if(user == null){
      return {
        success: false,
        message: 'Invalid user and pass combination.'
      }
    }

    return {
      success: true,
      data: new LoginResponse(user)
    };
  }
}
