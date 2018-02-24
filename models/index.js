import Sequelize from 'sequelize';

require('dotenv').config({ path: './variables.env' });

// Sequelize instance will connect to our postgres database
// db name, username, password, options
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
	  // Specify that we are using postgres
	 dialect: 'postgres',
	 define: {
		 // Make our table names snake_cased (doens't snake_case our defined fields e.g. foreign keys)
		 underscored: true,
	 },
  },
);

// Define the models using or models
const models = {
  User: sequelize.import('./user'),
  Channel: sequelize.import('./channel'),
  Team: sequelize.import('./team'),
  Message: sequelize.import('./message'),
};

Object.keys(models).forEach((modelName) => {
  // Create the relations made in the models
  // If there is a association
  //  if ('associate' in models[modelName]) {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Add our sequelize instance to our models object
models.sequelize = sequelize;

// Add Sequelize to out models object
models.Sequelize = Sequelize;

export default models;
