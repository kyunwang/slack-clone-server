# Slack-clone-server

Learning along with a tutorial from benawad.

* Graphql
* Postgresql
* -

## postgres
A kind of cheatsheet for myself of the command used:

In terminal after `brew install postgresql`

`psql`

see username as role

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
// Enter
psql

// Exit
/q

// Connect to database
\c <dbname> ;

// Display list of relations
\d

// Display table
\d <table-name>

// Basic query
select * from <table-name>;
```

## GraphQL

We got resolvers and schema's

The info here comes from the docs from the apollographql docs

### Resolver



When using grapqql-tools. Schema's are defined as a GraphQL type language string. 
The schema describes all the fields, rguments and result types.



The resolver is a collection of functions to execute the Schema's fields. This collection of functions is called an **resolver map**

A resolver function
`fieldName(parent/obj, args, context, info) { result }`

