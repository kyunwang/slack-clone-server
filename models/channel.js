export default (sequelize, DataTypes) => {
  // (name of table, )
  const Channel = sequelize.define('channel', {
    name: DataTypes.STRING,
    public: DataTypes.BOOLEAN,
  });

  Channel.associate = (models) => {
    //   1:m
    Channel.belongsTo(models.Team, {
      foreignKey: 'teamId',
    });
  };

  return Channel;
};
