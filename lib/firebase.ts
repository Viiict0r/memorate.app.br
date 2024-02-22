import firestore from '@react-native-firebase/firestore';

import { Person } from '@/types/person';

export async function addPerson(user_id: string, data: Person) {
  await firestore().doc(`persons/${user_id}`).collection('data').add(data);
}

export async function getPersons(user_id: string): Promise<Person[] | null> {
  try {
    const data = await firestore().doc(`persons/${user_id}`).collection('data').get();
    const result: Person[] = data.docs.map((doc) => ({
      id: doc.data().id,
      fullname: doc.data().fullname,
      photo: doc.data()?.photo,
      birthday: {
        day: doc.data().birthday.day,
        month: doc.data().birthday.month,
        year: doc.data().birthday?.year,
      },
      options: {
        email_notifications: doc.data()?.options?.email_notifications || false,
        reminder_days: doc.data()?.options?.reminder_days || 0,
      },
    }));

    return result;
  } catch (error) {
    /** capturar erro */
    return null;
  }
}

export async function savePushToken(user_id: string, token: string) {
  try {
    await firestore()
      .doc(`persons/${user_id}`)
      .collection('settings')
      .doc('push_token')
      .set({ token });
    console.log('Push token saved');
  } catch (error) {
    console.error(error);
  }
}
