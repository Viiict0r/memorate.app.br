import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useUser } from './use-user';

import { getPersons } from '@/lib/firebase';
import { Person } from '@/types/person';

type IPersonContext = {
  data: Person[];
  isLoading: boolean;
  refetch: () => void;
};

type PersonProviderProps = {
  children: React.ReactNode;
};

const PersonContext = createContext<IPersonContext>({} as IPersonContext);

export const PersonProvider = ({ children }: PersonProviderProps) => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { user, isLogged } = useUser();

  const refetch = () => {
    setLoading(true);

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
  };

  useEffect(() => {
    if (!isLogged) return;

    refetch();
  }, [user, isLogged]);

  return (
    <PersonContext.Provider
      value={{
        data,
        isLoading,
        refetch,
      }}>
      {children}
    </PersonContext.Provider>
  );
};

export const usePerson = () => useContext(PersonContext);
