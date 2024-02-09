import { differenceInDays, setHours, setMinutes, setSeconds, setYear } from 'date-fns';

import { Person } from '@/types/person';

export type PersonView = {
  data: Person;
  isToday: boolean;
  isRecent: boolean;
  isNext: boolean;
  daysLeft: number;
  daysPast: number;
};

type Result = {
  today: PersonView[];
  recent: PersonView[];
  next: PersonView[];
};

// Se o mes for menor que o atual, quer dizer que ja passou (mostrar em next year)
// se o mes for maior, ainda nao passou

function getBirthdayDate(person: Person) {
  const birthdayDate = new Date(
    new Date().getFullYear(),
    person.birthday.month,
    person.birthday.day,
  );
  setHours(birthdayDate, 0);
  setMinutes(birthdayDate, 0);
  setSeconds(birthdayDate, 0);

  return birthdayDate;
}

export function transformToView(data: Person[]): Result {
  const todayDate = new Date();
  setHours(todayDate, 0);
  setMinutes(todayDate, 0);
  setSeconds(todayDate, 0);

  const today: PersonView[] = data
    .filter((value) => {
      const { day, month } = value.birthday;
      const isTodayBirthday = day === todayDate.getDate() && month === todayDate.getMonth();

      return isTodayBirthday;
    })
    .map((value) => ({
      data: value,
      isToday: true,
      isRecent: false,
      isNext: false,
      daysPast: 0,
      daysLeft: 0,
    }));

  const recent: PersonView[] = data
    .filter((value) => {
      const { day, month } = value.birthday;

      if (month > todayDate.getMonth()) {
        return false;
      }

      if (month === todayDate.getMonth() && day > todayDate.getDate()) {
        return false;
      }

      const birthdayDate = getBirthdayDate(value);

      const isRecent = differenceInDays(todayDate, birthdayDate) <= 3;
      const isToday = !!today.find((t) => t.data.id === value.id);

      return isRecent && !isToday;
    })
    .map((value) => ({
      data: value,
      daysLeft: 0,
      daysPast: differenceInDays(todayDate, getBirthdayDate(value)),
      isNext: false,
      isRecent: true,
      isToday: false,
    }))
    .sort((a, b) => a.daysPast - b.daysPast);

  const next: PersonView[] = data
    .filter((value) => {
      const isToday = !!today.find((t) => t.data.id === value.id);
      const isRecent = !!recent.find((t) => t.data.id === value.id);

      return !isToday && !isRecent;
    })
    .map((value) => {
      const isOnNextYear =
        value.birthday.month < todayDate.getMonth() ||
        (value.birthday.month === todayDate.getMonth() && value.birthday.day < todayDate.getDate());
      const birthdayDate = getBirthdayDate(value);

      if (isOnNextYear) {
        birthdayDate.setFullYear(todayDate.getFullYear() + 1);
      }

      const daysLeft = differenceInDays(birthdayDate, todayDate);

      return {
        data: value,
        isNext: true,
        daysLeft,
        daysPast: 0,
        isRecent: false,
        isToday: false,
      };
    })
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return {
    today,
    next,
    recent,
  };
}
