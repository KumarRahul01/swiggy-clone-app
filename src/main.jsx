import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import appStore, { persistor } from "./components/Store/SwiggyStore.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
