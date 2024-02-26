const messages = [
  'Lembrei do seu dia! Feliz Aniversário!! Aceito um pedaço de bolo hoje 👀🍰',
  'Desejo que este aniversário te traga muita alegria e momentos inesquecíveis, feliz aniversário! 🤍',
  'Não esqueci do seu dia! Feliz Aniversário 🤍',
];

export function getRandomShareMessage(): string {
  const message = messages[Math.floor(Math.random() * messages.length)];

  return message;
}
