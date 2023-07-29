import { createContext, useContext } from 'react';
import PredictionsApiClient from '../PredictionsApiClient';

const ApiContext = createContext();

export default function ApiProvider({ children }) {
  const api = new PredictionsApiClient();

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}