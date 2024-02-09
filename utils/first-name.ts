export function firstName(name: string) {
  if (name.includes('')) {
    return name.split(' ')[0];
  }
  return name;
}
