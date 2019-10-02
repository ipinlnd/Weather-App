import React from "react";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { Main } from "./Components/Main";
import ApolloClient from "apollo-client";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id,
});

const client = new ApolloClient({ link: httpLink, cache });

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
};

export default App;
