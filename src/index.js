import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from 'react-router-dom'
import App from "./App";
const client = new QueryClient();
ReactDOM.render(
  <Router>
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
  </Router>,
  document.getElementById("root")
);
