class User {
  constructor(username, password) {
    this.username = username
    this.password = password
  }
}
module.export = User

const express = require('express')
const { graphql, buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

const users = [
  new User('Bruce', 'Wayne'),
  new User('Alfred', 'Penniort')
]

const schema = buildSchema(`
  type Query {
    getUser(username: String!): User
  }
  type User {
    username: String
    password: String
  }
`)

const rootValue = {
  getUser: ({ username }) => {
    return users.find(x => x.username === username)
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