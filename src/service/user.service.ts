import { IUserRequest, IUserResponse } from '../interface/user.interface';
import { UserRepository } from '../repository/user.reposiotry';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data: IUserRequest): Promise<IUserResponse> {
    return this.userRepository.createUser(data);
  }

  async findUserByEmail(email: string): Promise<IUserResponse> {
    return this.userRepository.findUserByEmail(email);
  }

  async findUserById(id: string): Promise<IUserResponse> {
    return this.userRepository.findUserById(id);
  }

  async findUserByUsername(username: string): Promise<IUserResponse> {
    return this.userRepository.findUserByUsername(username);
  }
}
