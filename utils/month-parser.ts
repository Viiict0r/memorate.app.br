const months = {
  0: 'JAN',
  1: 'FEV',
  2: 'MAR',
  3: 'ABR',
  4: 'MAI',
  5: 'JUN',
  6: 'JUL',
  7: 'AGO',
  8: 'SET',
  9: 'OUT',
  10: 'NOV',
  11: 'DEZ',
};

const fullMonth = {
  0: 'JANEIRO',
  1: 'FEVEREIRO',
  2: 'MARÇO',
  3: 'ABRIL',
  4: 'MAIO',
  5: 'JUNHO',
  6: 'JULHO',
  7: 'AGOSTO',
  8: 'SETEMBRO',
  9: 'OUTUBRO',
  10: 'NOVEMBRO',
  11: 'DEZEMBRO',
};

export function parseMonth(month: any) {
  // TODO: Melhorar depois
  return months[month as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11];
}

export function parseFullMonth(month: any) {
  // TODO: Melhorar depois
  return fullMonth[month as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11];
}
