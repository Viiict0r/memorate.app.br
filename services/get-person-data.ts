import { Person } from '@/types/person';

export function getPersonData(): Person[] {
  return [
    {
      name: 'Júlio da Gaita',
      avatar:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww',
      birthday: {
        day: 10,
        month: 1,
        year: 1994,
      },
    },
    {
      name: 'Júlia da Gaita',
      birthday: {
        day: 11,
        month: 3,
      },
    },
    {
      name: 'Victor',
      birthday: {
        day: 11,
        month: 3,
      },
    },
  ];
}
