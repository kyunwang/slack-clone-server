export default (sequelize, DataTypes) => {
  // (name of table, )
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  });

  User.associate = (models) => {
    // (To, options)
    User.belongsToMany(models.Team, {
      through: 'member',
      foreignKey: 'userId',
    });

    // n:m
    User.belongsToMany(models.Channel, {
      through: 'channel_member',
      foreignKey: 'userId',
    });
  };

  return User;
};
