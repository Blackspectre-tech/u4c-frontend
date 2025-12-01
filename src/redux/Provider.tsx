"use client";

import { persistor, store } from "@/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </ReduxProvider>
  );
};

export default Provider;
