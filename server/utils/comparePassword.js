import bcrypt from 'bcrypt-nodejs';

const comparePassword = (hash, password) => bcrypt.compareSync(password, hash);
export default comparePassword;
