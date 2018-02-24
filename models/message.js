export default (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text: DataTypes.STRING,
  });

  Message.associate = (models) => {
	 // 1:M
	 // A message belongs to one channel
	 // A channel can have many messages
    Message.belongsTo(models.Channel, {
      foreignKey: {
        name: 'channelId', // Camelcase in graphql
        field: 'channel_id', // Snake_case in postgres
      },
	 });

	 // 1:M
	 // A message can belong to one user
    // A user can have many messages
    Message.belongsTo(models.User, {
      foreignKey: {
        name: 'userId', // Camelcase in graphql
        field: 'user_id', // Snake_case in postgres
      },
    });
  };

  return Message;
};
