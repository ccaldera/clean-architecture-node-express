import { Container } from 'inversify';
import { IUserRepository } from './application/interfaces/users.repository';
import { UserRepository } from './infrastructure/repositories/users.repository';
import { LoginEndpoint } from './presentation/endpoints/login.endpoint';
import { LoginHandler } from './application/features/security/login/login.handler';
import { LoginRequest } from './application/features/security/login/models/login-request';
import { LoginResponse } from './application/features/security/login/models/login-response';
import { IHandler } from './application/interfaces/handler';

const container = new Container();

container.bind<IUserRepository>('IUserRepository').to(UserRepository);
container.bind<IHandler<LoginRequest, LoginResponse>>('IHandler<LoginRequest, LoginResponse>').to(LoginHandler);

// Bind UserController
container.bind<LoginEndpoint>(LoginEndpoint).toSelf();

export { container };
