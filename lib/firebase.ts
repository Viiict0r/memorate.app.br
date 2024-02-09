import firestore from '@react-native-firebase/firestore'
import { Person } from "@/types/person";

export async function addPerson(user_id: string, data: Person) {
  await firestore().doc(`persons/${user_id}`).collection('data').add(data)
  console.log('new person')
}

export async function getPersons(user_id: string): Promise<Person[] | null> {
  try {
    const data = await firestore().doc(`persons/${user_id}`).collection('data').get()
    const result = data.docs.map(doc => doc.data() as Person)

    return result
  } catch (error) {
    /** capturar erro */
    return null
  }
}
