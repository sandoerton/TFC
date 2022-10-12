import IUser from '../interfaces/userInterface';
import tokenGenerate from '../helpers/token';
import ILogin from '../interfaces/loginInterface';
import Users from '../models/users';
import checkPassword from '../helpers/bcrypt';

class UserService {
  findUser = async (login: ILogin): Promise<string> => {
    const { email, password } = login;
    const user = await Users.findOne({ where: { email }, raw: true }) as IUser;
    if (!user) {
      throw new Error('Unregistered email');
    }

    const validatePassword = checkPassword(password, user.password);
    if (!validatePassword) {
      throw new Error('Incorrect password');
    }

    const token = tokenGenerate(user.username);
    return token;
  };
}

export default UserService;
