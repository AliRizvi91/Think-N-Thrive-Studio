"use client";

import { Provider } from 'react-redux';
import { store } from "../../react_redux/store";
import { ReactNode } from 'react';

interface ReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxProvider;