// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from '../src/components/redux/Store.js';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
let persistor = persistStore(store);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnHover
          theme="light"
        />
        <App />
      </PersistGate>
    </Provider>
  </>
  // </StrictMode>
);
