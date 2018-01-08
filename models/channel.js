export default (sequelize, DataTypes) => {
  // (name of table, )
  const Channel = sequelize.define('channel', {
    name: DataTypes.STRING,
    public: DataTypes.BOOLEAN,
  });

  Channel.associate = (models) => {
    // 1:m
    Channel.belongsTo(models.Team, {
      foreignKey: {
        name: 'teamId',
        field: 'team_id',
      },
    });

    // n:m
    Channel.belongsToMany(models.User, {
      through: 'channel_member',
      foreignKey: {
        name: 'channelId', // camelcase in graphql
        field: 'channel_id', // snake case in postgres
      },
    });
  };

  return Channel;
};
