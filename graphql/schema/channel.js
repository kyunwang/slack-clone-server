export default `
	type Channel {
		id: Int!
		name: String!
		public: Boolean		
		message: [Message!]!
		user: [User!]!
	}
`;
