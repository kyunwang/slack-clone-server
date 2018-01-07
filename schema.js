// Here we define all our graphql types
export default `

	type Team {
		owner: User!
		members: [User!]!
		channel: [Channel!]!
	}

	type Channel {
		id: Int!
		name: String!
		public: Boolean		
		message: [Message!]!
		user: [User!]!
	}

	type Message {
		id: Int!
		text: String!
		user: User!
		channel: Channel!
	}

	type User {
		id: Int!
		username: String!
		email: String!
		teams: [Team!]!
	}

	type Query {
		hi: String
		bye: String
	}
`;
