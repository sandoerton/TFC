import IUser from '../interfaces/userInterface';
import { tokenGenerate, tokenCheck } from '../helpers/token';
import Users from '../models/users';
import checkPassword from '../helpers/bcrypt';

class UserService {
  findUser = async (email: string, password: string): Promise<string> => {
    const user = await Users.findOne({ where: { email }, raw: true }) as IUser;
    if (!user) {
      throw new Error('Incorrect email or password');
    }

    const validatePassword = checkPassword(password, user.password);
    if (!validatePassword) {
      throw new Error('Incorrect email or password');
    }

    const token = tokenGenerate(user.username);
    return token;
  };

  findRole = async (token: string): Promise<string> => {
    const username = tokenCheck(token);
    const user = await Users.findOne({ where: { username }, raw: true }) as IUser;
    return user.role;
  };
}

export default UserService;
