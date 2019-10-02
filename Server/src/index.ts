import { GraphQLServer } from "graphql-yoga";
import { Types } from "./graphql/types";
import { Resolvers } from "./graphql/resolvers";

const server = new GraphQLServer({
  typeDefs: Types,
  resolvers: Resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
