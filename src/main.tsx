import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { DndProvider } from "react-dnd";
import { Provider } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import store from "./store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>
  </React.StrictMode>
);
