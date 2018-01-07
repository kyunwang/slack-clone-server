import Sequelize from 'sequelize';

// Sequelize instance. Connects to out postgres database
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     dialect: "postgres"
//   }
// );
const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
  dialect: 'postgres',
});

const models = {
  User: sequelize.import('./user'),
  Channel: sequelize.import('./channel'),
  Team: sequelize.import('./team'),
  Message: sequelize.import('./message'),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models); // If there is a association
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
