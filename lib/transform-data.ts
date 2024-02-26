import { differenceInDays, endOfDay } from 'date-fns';

import { Person } from '@/types/person';
import { parseFullMonth } from '@/utils/month-parser';

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

  return endOfDay(birthdayDate);
}

export function transformToView(data: Person[]): Result {
  const todayDate = endOfDay(new Date());

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

export type DataWithSeparator = {
  type: 'date' | 'separator';
  highlighted: boolean;
  payload: string | PersonView;
};

// - Separador de próximo ano (datas menores que a atual)
// - Separador de proximos meses (datas maiores que 90 dias)
// - Separador de mes (datas menores que 90 dias)

export function insertNextSeparators(data: PersonView[]): DataWithSeparator[] {
  if (!data.length) return [];
  const result: DataWithSeparator[] = [];

  let nextYearSeparatorInserted = false;
  let hasAnyPreviusMonthSeparatorInserted = false;
  let nextMonthsSeparatorInserted = false;
  let isFirst = true;

  const elements = data.filter((dt) => dt.isNext);

  elements.forEach((value, index) => {
    // Separators
    const isOnNextYear = isBirthdayNextYear(value.data);
    const isLessThanThreeMonths = value.daysLeft <= 90;
    const previusItem = elements[index - 1];

    // Primeiro elemento
    if (isFirst && !isOnNextYear) {
      isFirst = false;

      result.push({
        type: 'date',
        highlighted: true,
        payload: value,
      });
      return;
    }

    /** Caso a data de aniversário seja no próximo ano, insere
     * o separador de próximo ano e as próximas datas renderizam
     * todas abaixo. */
    if (isOnNextYear && !nextYearSeparatorInserted) {
      result.push({
        type: 'separator',
        payload: `${new Date().getFullYear() + 1}`,
        highlighted: false,
      }); // separator

      result.push({ type: 'date', payload: value, highlighted: false }); // data

      nextYearSeparatorInserted = true;
      return;
    }

    if (nextYearSeparatorInserted) {
      result.push({ type: 'date', payload: value, highlighted: false });
      return;
    }

    if (isLessThanThreeMonths) {
      const isPreviusSameMonth = previusItem
        ? previusItem?.data.birthday.month === value.data.birthday.month
        : false;

      if (isPreviusSameMonth) {
        result.push({
          type: 'date',
          payload: value,
          highlighted: !hasAnyPreviusMonthSeparatorInserted,
        });
        return;
      }

      result.push({
        type: 'separator',
        payload: parseFullMonth(value.data.birthday.month),
        highlighted: false,
      });
      hasAnyPreviusMonthSeparatorInserted = true;

      result.push({
        type: 'date',
        payload: value,
        highlighted: !hasAnyPreviusMonthSeparatorInserted,
      });

      return;
    }

    if (!nextMonthsSeparatorInserted) {
      result.push({ type: 'separator', payload: 'PRÓXIMOS MESES', highlighted: false });
      nextMonthsSeparatorInserted = true;
    }

    result.push({ type: 'date', payload: value, highlighted: false });
  });

  return result;
}

const isBirthdayNextYear = (person: Person) => {
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const { birthday } = person;

  return (
    birthday.month < currentMonth || (birthday.month === currentMonth && birthday.day < currentDay)
  );
};
