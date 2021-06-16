import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const hashPassword = (password) => bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS, 2));

export default hashPassword;
