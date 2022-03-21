import { LoginUser } from '../interface/User';
import User from '../database/models/User';
// import { compare } from 'bcryptjs';
import tokenGenerator from '../auth/Jwt';

async function loginService({ email, password }: LoginUser) {
  const user = await User.findOne({
    where: { email },
    // Source: https://www.codegrepper.com/code-examples/javascript/how+to+exclude+the+password+when+from+the+User+Model+in+sequelize
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const token = await tokenGenerator({ role: user.role, email: user.email });
  return { user, token };
}

export default loginService;
