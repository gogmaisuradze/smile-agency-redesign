import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App.jsx';

try {
  console.log("Rendering App component...");
  const html = ReactDOMServer.renderToString(React.createElement(App));
  console.log("Success! Rendered HTML length:", html.length);
} catch (error) {
  console.error("RENDER ERROR:", error);
  process.exit(1);
}
