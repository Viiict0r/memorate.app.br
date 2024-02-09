import auth from '@react-native-firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

import { User } from '@/types/user';

type IUserContext = {
  user: User | null;
  isLogged: boolean;
};

type UserProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  // ! Salvar um identificador de primeiro login no asyncstorage
  // ! caso seja o primeiro login, mostrar uma tela de bem-vindo

  // ! Upload de imagens em um back-end próprio ou no firebase cloud storage

  useEffect(() => {
    /** Firebase user */
    const subscriber = auth().onAuthStateChanged((user) => {
      if (!user) {
        setUser(null);
        return;
      }
      console.log(user.uid);
      setUser({
        isAnonymous: user.isAnonymous || true,
        uid: user.uid,
      });
    });

    return subscriber;
  }, []);

  useEffect(() => {
    /** Make anonymous login */
    auth()
      .signInAnonymously()
      .then(() => setLoading(false))
      .catch(() => {
        console.log('Firebase login failed');
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLogged: !!user,
      }}>
      {isLoading ? null : children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
