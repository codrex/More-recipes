module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validation: {
        max: 50,
      },
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
      validation: {
        max: 50,
        isAlpha: true,
      },
    },
    profilePicture: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'none',
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validation: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validation: {
        min: 6,
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Users'),
};
