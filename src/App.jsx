import React, { Fragment, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Preloader from "./layouts/Preloader";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes.jsx";

const App = () => {
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPreloader(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fragment>
      <Toaster />
      {preloader && <Preloader />}
      {!preloader && (
        <BrowserRouter>
          <Routes>
            {routes.map(({ path, Component }, i) => (
              <Route
                key={i}
                path={path}
                element={React.createElement(Component)}
              />
            ))}
          </Routes>
        </BrowserRouter>
      )}
    </Fragment>
  );
};

export default App;
