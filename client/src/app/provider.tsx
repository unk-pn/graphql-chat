"use client";

import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client/react";
import { store } from "@/store";
import { client } from "@/shared/api/apolloClient";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>{children}</Provider>
    </ApolloProvider>
  );
}
