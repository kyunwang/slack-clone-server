export default (sequelize, DataTypes) => {
  // Define the table called 'user'
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          // Argument
          args: true,
          // Error message
          msg: 'The username may only contain letters and numbers',
        },
        len: {
          args: [3, 30],
          msg: 'The username needs to be between 3 and 30 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'The email is invalid. Made a typo?',
        },
      },
    },
    password: DataTypes.STRING,
  });


  User.associate = (models) => {
    // A join table

    // N:M
    // A user belongs to many teams
    // A team can have many users
    User.belongsToMany(models.Team, {
      through: 'member',
      foreignKey: {
        name: 'userId', // Camelcase in graphql
        field: 'user_id', // Snake_case in postgres
      },
    });

    // N:M
    // A user can be in many channels
    // A channel can have many users
    User.belongsToMany(models.Channel, {
      through: 'channel_member',
      foreignKey: {
        name: 'userId', // Camelcase in graphql
        field: 'user_id', // Snake_case in postgres
      },
    });
  };

  // Return the user
  return User;
};
