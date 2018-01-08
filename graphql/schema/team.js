export default `
	type Team {
		owner: User!
		members: [User!]!
		channel: [Channel!]!
	}
`;
