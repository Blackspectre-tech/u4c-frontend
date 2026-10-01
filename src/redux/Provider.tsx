// src/app/Provider.tsx (or wherever this file is located)
"use client";

import { persistor, store } from "@/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useState, useEffect } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  // Use a state to check if we are truly mounted in the browser
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a minimal placeholder during the server build/initial load
    return <div></div>;
  }

  return (
    <ReduxProvider store={store}>
      {/* Set loading={null} because we are handling the loading state above */}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </ReduxProvider>
  );
};

export default Provider;
