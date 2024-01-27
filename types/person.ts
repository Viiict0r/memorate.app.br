export type Person = {
  name: string;
  avatar?: string;
  birthday: {
    day: number;
    month: number;
    year?: number;
  };
};
