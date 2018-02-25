export default `
	type Team {
		owner: User!
		members: [User!]!
		channel: [Channel!]!
	}

	type Query {}

	type Mutation {
		createTeam(name: String!): CreateTeamResponse!
	}

	type CreateTeamResponse {
		ok: Boolean!
		team: Team
		errors: [Error!]
	}
`;
