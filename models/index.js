import Sequelize from 'sequelize';

// Sequelize instance. Connects to out postgres database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  { dialect: 'postgres' },
);

const models = {
  User: sequelize.import('./user'),
  Channel: sequelize.import('./channel'),
  Message: sequelize.import('./message'),
  Team: sequelize.import('./team'),
};

Object.keys(models).forEach((modelName) => {
  // if (models[modelName].associate) {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models); // If there is a association
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
