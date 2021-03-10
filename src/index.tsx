import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import nightMode from "./config/theme";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={nightMode}>
      <ColorModeScript initialColorMode={nightMode.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
