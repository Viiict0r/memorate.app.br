import auth from '@react-native-firebase/auth';

export async function makeAnonymousLogin() {
  return auth().signInAnonymously();
}
