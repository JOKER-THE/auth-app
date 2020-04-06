class User {
  constructor(id, username, password) {
    this.id = id
    this.username = username
    this.password = password
    this.token = JWT(id, username)
  }
}
module.export = User

function JWT(id, username) {
  var header = '{"alg": "none", "typ": "JWT"}'
  var payload = '{"id": '+ id +', "username": ' + username + '}'
  var headerBase64 = Buffer.from(header).toString('base64')
  var payloadBase64 = Buffer.from(payload).toString('base64')

  return headerBase64 + '.' + payloadBase64
}

const express = require('express')
const { graphql, buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

const users = [
  new User('0000001', 'Bruce', 'Wayne'),
  new User('0000002', 'Alfred', 'Penniort')
]

const schema = buildSchema(`
  type Query {
    getUser(username: String!, password: String!): User
    auth(token: String!): User
  }
  type User {
    id: String
    username: String
    password: String
    token: String
  }
`)

const rootValue = {
  getUser: ({ username, password }) => {
    user = users.find(x => x.username === username)
    if (user.password === password) {
      return user
    }
  },
  auth: ({ token }) => {
    return users.find(x => x.token === token)
  }
}

const app = express();

app.use(cors())
app.use('/graphql', graphqlHTTP({
  rootValue, schema, graphiql: true
}))

app.listen(4000, () => 
  console.log('Now browse to http://localhost:4000/graphql')
)