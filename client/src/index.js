import React from "react";
import { render } from "react-dom";
import "./index.css";
/* -------------------------------------------------------------------------- */
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
/* -------------------------------------------------------------------------- */
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import CurrentUser from "./GQL/queries/CurrentUser";
import setUser from "./GQL/queries/setUser";
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
const cache = new InMemoryCache();
const init = async () => {
  await persistCache({
    cache,
    storage: window.localStorage,
  });
};
// console.log("hi", process.env.REACT_APP_GRAPHQL_PORT);
// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: `http://localhost:${process.env.REACT_APP_GRAPHQL_PORT}/graphql`,
//     credentials: "include",
//   }),
//   cache: cache,
//   connectToDevTools: true,
// });
const httpLink = new HttpLink({
  uri: `http://localhost:${process.env.REACT_APP_GRAPHQL_PORT}/graphql`,
});
const client = new ApolloClient({
  link: new HttpLink({
    link: httpLink,
  }),
  cache: cache,
  connectToDevTools: true,
});
try {
  cache.readQuery({
    query: setUser,
  });
} catch (error) {
  cache.writeData({
    data: {
      user: [],
    },
  });
}
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: "http://localhost:4000/graphql",
//     credentials: "include",
//   }),
//   cache: new InMemoryCache(),
//   connectToDevTools: true,
// });
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
init();
