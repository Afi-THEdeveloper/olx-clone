import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { db, auth, storage } from "./firebase/config";
import Context, { FirebaseContext } from "./store/Contexts";

ReactDOM.render(
  <FirebaseContext.Provider value={{ db, auth, storage }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
