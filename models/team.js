export default (sequelize, DataTypes) => {
  // (name of table, )
  const Team = sequelize.define('team', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Team.associate = (models) => {
    // (To, options)
    // m:m
    Team.belongsToMany(models.User, {
      through: 'member',
      foreignKey: 'teamId',
    });

    // 1:m
    Team.belongsTo(models.User, {
      foreignKey: 'owner',
    });
  };

  return Team;
};
