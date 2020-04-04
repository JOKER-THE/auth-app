class User {
	constructor(username, password) {
		this.username = username
		this.password = password
	}
}
module.export = User

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const users = [
  new User('Bruce', 'Wayne'),
  new User('Alfred', 'Penniort')
];

const typeDefs = gql`
  type Query {
    hello: String
    getUsers: [User]
  }
  type User {
  	username: String
  	password: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getUsers: () => users
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(cors());
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);