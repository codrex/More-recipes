import bcrypt from 'bcrypt-nodejs';

/**
 * @return {boole} true|false
 * @param {string} hashedPassword
 * @param {string} password
 */
const comparePassword = (
  hashedPassword,
  password
) => bcrypt.compareSync(password, hashedPassword);

export default comparePassword;
