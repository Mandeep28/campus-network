import React from "react";
import { StrictMode } from 'react';
import { render } from 'react-dom';
import "./index.css";
import App from "./App";

/* import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
})
 */

const rootElement = document.getElementById('root');
render(
	<StrictMode>
		<App />
	</StrictMode>,
	rootElement
);