import { createContext, useContext, useEffect, useState } from 'react';

import { useUser } from './use-user';

import { getPersons } from '@/lib/firebase';
import { Person } from '@/types/person';

type IPersonContext = {
  data: Person[];
};

type PersonProviderProps = {
  children: React.ReactNode;
};

const PersonContext = createContext<IPersonContext>({} as IPersonContext);

export const PersonProvider = ({ children }: PersonProviderProps) => {
  const [data, setData] = useState<Person[]>([]);
  const { user, isLogged } = useUser();

  useEffect(() => {
    if (!isLogged) return;

    getPersons(user!.uid).then((data) => {
      if (!data) {
        console.log('falha ao carregar dados do firebase');
        return;
      }

      setData(data);
      console.log('loaded');
    });
  }, [user, isLogged]);

  return (
    <PersonContext.Provider
      value={{
        data,
      }}>
      {children}
    </PersonContext.Provider>
  );
};

export const usePerson = () => useContext(PersonContext);
