export default (sequelize, DataTypes) => {
  // (name of table, )
  const Channel = sequelize.define('channel', {
    name: DataTypes.STRING,
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Channel.associate = (models) => {
    // 1:M
    // A channel can have one team
    // A team can have many channels
    Channel.belongsTo(models.Team, {
      foreignKey: {
        name: 'teamId', // Camelcase in graphql
        field: 'team_id', // Snake_case in postgres
      },
    });

    // N:M
    // A channel has many users
    // A user has many channels
    Channel.belongsToMany(models.User, {
      through: 'channel_member',
      foreignKey: {
        name: 'channelId', // Camelcase in graphql
        field: 'channel_id', // Snake_case in postgres
      },
    });
  };

  return Channel;
};
