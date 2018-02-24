export default `
	type User {
		id: Int!
		username: String!
		email: String!
		teams: [Team!]!
	}

	type Query {
		getUser(id: Int!): User!
		getAllUsers: [User!]!
	}
	
	type Mutation {
		register(username: String!, email: String!, password: String!): RegisterResponse!
	}

	type RegisterResponse {
		ok: Boolean!
		user: User
		errors: [Error!]
	}
`;
