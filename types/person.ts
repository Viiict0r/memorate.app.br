import uuid from 'react-native-uuid'

export type Person = {
  id: string;
  fullname: string;
  photo?: string;
  birthday: {
    day: number;
    month: number;
    year?: number;
  };
};

export const makePerson = (data: Pick<Person, 'birthday' | 'fullname' | 'photo'>): Person => ({
  ...data,
  id: String(uuid.v4()),
})
