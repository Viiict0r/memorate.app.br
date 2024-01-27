import { createContext, useContext } from 'react';

import { Person } from '@/types/person';

type IPersonContext = {
  data: Person[];
};

type PersonProviderProps = {
  children: React.ReactNode;
};

const PersonContext = createContext<IPersonContext>({} as IPersonContext);

export const PersonProvider = ({ children }: PersonProviderProps) => {
  return (
    <PersonContext.Provider
      value={{
        data: [],
      }}>
      {children}
    </PersonContext.Provider>
  );
};

export const usePerson = () => useContext(PersonContext);
