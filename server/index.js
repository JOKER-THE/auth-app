class User {
  constructor(id, username, password, token) {
    this.id = id
    this.username = username
    this.password = password
    this.token = token
  }
}
module.export = User

const express = require('express')
const { graphql, buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

const users = [
  new User('0000001', 'Bruce', 'Wayne', 'this-is-a-batman'),
  new User('0000002', 'Alfred', 'Penniort', 'this-is-a-butler')
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