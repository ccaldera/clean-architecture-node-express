import { OperationResult } from "../../domain/results/operation-result";

export interface IHandler<TRequest, TResponse> {  
  handle(request:TRequest):Promise<OperationResult<TResponse>>;
}
