import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useUser } from './use-user';

import { getPersons } from '@/lib/firebase';
import { Person } from '@/types/person';

type IPersonContext = {
  data: Person[];
  isLoading: boolean;
};

type PersonProviderProps = {
  children: React.ReactNode;
};

const PersonContext = createContext<IPersonContext>({} as IPersonContext);

export const PersonProvider = ({ children }: PersonProviderProps) => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { user, isLogged } = useUser();

  useEffect(() => {
    if (!isLogged) return;

    getPersons(user!.uid)
      .then((data) => {
        if (!data) {
          Alert.alert('Erro', 'Falha ao carregar as informações');
          return;
        }

        setData(data);
        setLoading(false);
      })
      .catch(() => Alert.alert('Erro', 'Falha ao carregar as informações'));
  }, [user, isLogged]);

  return (
    <PersonContext.Provider
      value={{
        data,
        isLoading,
      }}>
      {children}
    </PersonContext.Provider>
  );
};

export const usePerson = () => useContext(PersonContext);
