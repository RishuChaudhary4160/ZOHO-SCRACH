import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "../src/router";

function App() {
  return (
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={router}
    />
  );
}

export default App;
