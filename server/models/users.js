import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validation: {
        max: 50,
      },
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'UNKNOWN',
      validation: {
        max: 50,
        isAlpha: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validation: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        min: 6,
      },
      set(val) {
        this.setDataValue('password', bcrypt.hashSync(val));
      },
    },
  });
  return users;
};
