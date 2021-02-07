import { GraphQLServer } from "graphql-yoga";
import resolvers from "./3_resolvers";

const server = new GraphQLServer({
  typeDefs: "graphql/schema.graphql", // "./graphql/schema.graphql"도 인식 가능.
  resolvers,
});

server.start(() =>
  console.log("GraphQL Server Running on http://localhost:4000/")
);
