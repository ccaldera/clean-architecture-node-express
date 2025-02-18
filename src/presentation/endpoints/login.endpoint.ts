import 'reflect-metadata';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { LoginRequest } from '../../application/features/security/login/models/login-request';
import { LoginResponse } from '../../application/features/security/login/models/login-response';
import { IHandler } from '../../application/interfaces/handler';
import { validationResult } from 'express-validator';
import { OperationResult } from "../../domain/results/operation-result";

export class LoginEndpoint {
  private handler: IHandler<LoginRequest, LoginResponse>;

  constructor(@inject('IHandler<LoginRequest, LoginResponse>') handler: IHandler<LoginRequest, LoginResponse>) {
    this.handler = handler;
  }

  public async login(req: Request, res: Response) {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {

     let result = {
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      } as OperationResult<any>;

      return res.status(400).json(result);
    }

    const request = new LoginRequest(req.body.email, req.body.password);
    
    const result = await this.handler.handle(request);
    
    if (!result || !result.success) {
      return res.status(404).json(result);
    } 
    
    return res.status(200).json(result);    
  }
}
