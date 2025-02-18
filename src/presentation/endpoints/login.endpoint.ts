import 'reflect-metadata';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { LoginRequest } from '../../application/features/security/login/models/login-request';
import { LoginResponse } from '../../application/features/security/login/models/login-response';
import { IHandler } from '../../application/interfaces/handler';

export class LoginEndpoint {
  private handler: IHandler<LoginRequest, LoginResponse>;

  constructor(@inject('IHandler<LoginRequest, LoginResponse>') handler: IHandler<LoginRequest, LoginResponse>) {
    this.handler = handler;
  }

  async login(req: Request, res: Response) {

    const request = new LoginRequest(req.body.email, req.body.password);
    
    const result = await this.handler.handle(request);
    
    if (!result || !result.success) {
      return res.status(404).json(result);
    } 
    
    return res.status(200).json(result);    
  }
}
