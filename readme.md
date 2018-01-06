# Slack-clone-server

Learning along with a tutorial from benawad.

* Graphql
* Postgresql
* -

## postgres

in terminal after `brew install postgresql`

`msql`

see username as role

To create a role/user (`create user` is the same as `create role`)
`create user <username> with <optional permission>;`

Deleting a role/user
`drop role <username>;`

Adding/alterning permissions e.g `login` or `nologin`
`alter user <username> with <optional permission>;`

Adding a password to a role/user
`\password <username>`
