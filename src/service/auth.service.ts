import { IUserRequest, IUserResponse } from '../interface/user.interface';
import { AuthRepository } from '../repository/auth.repository';
import { UserRepository } from '../repository/user.reposiotry';

export class AuthService {
  private userRepository: UserRepository;
  private authRepository: AuthRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.authRepository = new AuthRepository();
  }

  async signUp(data: IUserRequest): Promise<IUserResponse> {
    return this.userRepository.createUser(data);
  }

  async signInByEmail(email: string, password: string): Promise<string> {
    return this.authRepository.signInByEmail(email, password);
  }

  async signInByUsername(username: string, password: string): Promise<string> {
    return this.authRepository.signInByUsername(username, password);
  }
}
