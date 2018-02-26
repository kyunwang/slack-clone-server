# Slack-clone-server

Learning along with a tutorial from benawad while applying some changes.
Link to the client [repo](#client-url)

* Graphql
* Postgresql
* -

Notes will be written down here and some more stuff to return to for me. Mostly from the docs.

Not everything is noted here by all means. Only the basic things are noted here of which I think is important. So don't forget to check the documentation of them too.

## Table of content

1. [Postgres](#postgres)
	- [Sequelize](#sequelize)
2. [GrapqQL](#graphql)
	<!-- - [Schema](#) -->
	<!-- - [Resolvers](#) -->
<!-- 3. [Semantic-UI](#semantic-ui) -->
<!-- 3. [JWT](#) -->
4. [Others](#others)

## Postgres
A kind of cheatsheet for myself of the command used:

You need to have postgresql on your system.

*OSX*
```
	// With homebrew
	brew install postgresql
```

Connect to postGres

`psql`

*See username as role*

To create a role/user (`create user` is the same as `create role`)

`create user <username> with <optional permission>;`

Deleting a role/user

`drop role <username>;`

Adding/alterning permissions e.g `login` or `nologin`

`alter user <username> with <optional permission>;`

Adding a password to a role/user

`\password <username>`

Cheatlist

```
// Enter postgres
psql

// Exit postgres
/q

// Connect to database
\c <dbname> ; 

// Display list of tables/relations
\d

// Display table
\d <table-name>

// Basic query
select * from <table-name>;
```

### Sequelize
With sequelize we define out postgres tables

**Docs**
- [sequelize](http://docs.sequelizejs.com/)

This section contains:
- The setup
- Defining a model
- Associations
- More?

**Setup**
We always need to define a `new Sequelize instance`
like so
```
const sequelize = new Sequelize(db_name, db_user, db_password, {options});
```

**Defining a model**

A model is defined through a callback (If I am saying it right)

```
export default (sequelize, DataTypes) {
	...

	return ModelName;
}
```

sequelize: 
DataTypes: With this we define what type a field is

```
const ModelName = sequelize.define(tabelNameInPostGres, {
	fieldName: DataTypes.STRING,
	fieldName: {
		type: DataTypes.BOOLEAN,
		unique: true
	}
})
```

The notation of the first fieldname contains no options.
With the notation of the second fieldname, options can be passed along with it

**Associations**

Postgres is a relational database so to define the relationschips, called associations here we define it like so.

```
ModelName.associate = (model) => {
	ModelName.belongsTo(model.OtherModelName, {
		foreignKey: theKeyName
	});

	ModelName.belongsToMany(model.OtherModelName, {
		through: not sure what to put here yet,
		foreignKey: {
			name: theKeyName,
			field: the_key_name
		}
	});
}
```

The foreignkey has two notations just like the fieldName. You can choose to pass options with it. In the second notation we defined the **name**, which we will use throughout the application, and the **field** which will be the field name in the database.

-- models imports and adding the association


## GraphQL

We got resolvers and schema's

The info here comes from the docs from the apollographql docs

**Docs:**
- [graphql-tools](https://www.apollographql.com/docs/graphql-tools)
- [apollo-server](https://www.apollographql.com/docs/apollo-server/)


### Schema
Schema or Types whatever you want to call it.
When using grapqql-tools. Schema's are defined as a **GraphQL type language string**. 
The schema describes all the fields, arguments and result types.

```
export default ``
```

This is where we define our types in.

**Using the `models/user.js` as example**

```
	type User {
		id: Int!,
		username: String!,
		email: String!
		teams: [Team!]!
	}
```
Here we define the *Types* for the *User* model for GraphQL

The **!** means *non-NULL*

The `[Team!]!` refers to another *Model*. This refers to the teams the user partakes in. (If I am right)

**Queries**

To create a Query/Read operation:

```
	type Query {
		getUser(id: Int!): User!
		getAllUsers: [User!]!
	}
```

- The `getUser` query needs to be passed an `id` which will return a User.
- `getAllUsers` will simple return all users, which reside in an array (array of users)


**Mutations**
Here we CRUD, Create Read Update Delete, althought the Read is for the Query Type.

--

### Resolver

The resolver is a collection of functions to execute the Schema's fields. This collection of functions is called an **resolver map**


A resolver function gets the following params: obj, args, context and info
`fieldName(parent/obj, args, context, info) { result }`

**Using the `resolvers/user.js` as example**

The resolver file exports an object where all the operations are defined.

`export default { ... }`

**Queries**

To create a Query/Read operation:

```
	Query: {
		getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } })
	}
```

In this example we defined a query to get one specific user.
We deconstructed the `id` and `models` and make a `findOne` query to get a specific user where the id is equal to the passed id.

`models` refer to the `sequelize` postgres database and so we get access to methods like `findOne`

**Mutations**

```
	Mutation: {
		register: (parent, args, { models }) => models.User.create(args)
	}
```

This is a really simple mutation to create a user. Do not do it this way as it is only a example to build up on.

Here we simple get the passed in `args` and create a user with it with `models.User.create(args)` and return it.

*Make it async*
```
	Mutation: async (parent, args, { models }) => {
		try {
			return await models.USer.create(args);
		} catch (error) {
			return error;
		}
	}
```
Again do not do it this wat. This is just an example to build up on.

## Others
A list of smaller packages used, which might be of relevance for reference.

A quick rundown of a few used methods.

### Bcrypt
A library which helps with hashing passwords

[Doc: bcrypt](#bcrypt)

*Note: bcrypt works async*

`e.g. bcrypt.hash()`

- `hash(password: String, saltrounds: Number)`
Hash the password through the amount of given saltrounds
- `compare(data: String, encryptedData: String)`
Compares a already hashed string with a non hashed string
- ``


### JWT
JSON Web Tokens, a way to stansmit information securely.

[Doc: jwt](#jwt)


`e.g. jwt.sign()`

- `sign(payload, secret/publicKey, [options, callback])`
Return jwt as a string
- `verify(token, secret/publickey, [options, callback]))`
Checks wether the token is not expired and is signed with ...
- `decode(token, [options])`
Will decode the *payload* without verifying the token.

[bcrypt](https://github.com/kelektiv/node.bcrypt.js)
[jwt](https://github.com/auth0/node-jsonwebtoken)
[]()

[client-url]: https://github.com/kyunwang/slack-clone-client