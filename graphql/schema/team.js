export default `
	type Team {
		owner: User!
		members: [User!]!
		channel: [Channel!]!
	}

	type Query {}

	type Mutation {
		createTeam(name: String!): Boolean!
	}
`;
