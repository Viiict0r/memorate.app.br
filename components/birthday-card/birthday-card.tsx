import { OthersCard } from './variants/others-card';
import { RecentCard } from './variants/recent-card';
import { TodayCard } from './variants/today-card';

import { PersonView } from '@/lib/transform-data';

type Props = {
  data: PersonView;
  variant: 'today' | 'recent' | 'others';
  highlighted?: boolean;
};

const variants = {
  today: TodayCard,
  recent: RecentCard,
  others: OthersCard,
};

export const BirthdayCard = ({ data, variant, highlighted = false }: Props) => {
  const Component = variants[variant];

  return <Component data={data} highlighted={highlighted} />;
};
