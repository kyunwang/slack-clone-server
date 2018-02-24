export default (sequelize, DataTypes) => {
  // (name of table, )
  const Team = sequelize.define('team', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Team.associate = (models) => {
	 // M:M
	 // A team has many users
    // A user can be in many teams
    Team.belongsToMany(models.User, {
      through: 'member',
      foreignKey: {
        name: 'teamId', // Camelcase in graphql
        field: 'team_id', // Snake_case in postgres
      },
    });

	 // 1:M
	 // A owner can have many teams.
    // A team can have one owner
    Team.belongsTo(models.User, {
      foreignKey: {
        name: 'owner',
        allowNull: false,
      },
    });
  };

  return Team;
};
