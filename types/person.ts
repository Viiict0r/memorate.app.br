import uuid from 'react-native-uuid';

export type Person = {
  id: string;
  doc_id: string;
  fullname: string;
  photo?: string | null;
  options: {
    reminder_days: number;
    email_notifications: boolean;
  };
  birthday: {
    day: number;
    month: number;
    year?: number | null;
  };
};

export const makePerson = (
  data: Pick<Person, 'birthday' | 'fullname' | 'photo' | 'options'>,
): Person => ({
  ...data,
  id: String(uuid.v4()),
  doc_id: '',
});
