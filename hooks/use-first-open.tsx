import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export const useFirstOpen = (onFirstOpen: () => void) => {
  useEffect(() => {
    AsyncStorage.getItem('is-first-open')
      .then((value) => {
        if (value !== 'no') {
          // is first open
          onFirstOpen();
        }
      })
      .catch(() => {
        console.log('Falha ao verificar first open');
      });
  }, []);
};
