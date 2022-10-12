import * as bcrypt from 'bcryptjs';

const checkPassword = (pwd: string, hash: string): boolean => bcrypt.compareSync(pwd, hash);

export default checkPassword;
