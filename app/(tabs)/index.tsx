import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, ScrollView, FlatList } from 'react-native';

import { BirthdayCard } from '@/components/birthday-card';
import { MonthDivider } from '@/components/month-divider';
import { Text } from '@/components/text';
import { useFirstOpen } from '@/hooks/use-first-open';
import { usePerson } from '@/hooks/use-person';
import { HomeLayout } from '@/layouts/home-layout';
import { PersonView, transformToView } from '@/lib/transform-data';
import { Person } from '@/types/person';
import { parseFullMonth } from '@/utils/month-parser';

const LATERAL_PADDING = 27;

type CardProps = {
  data: PersonView[];
};

const TodayCards = ({ data }: CardProps) => (
  <View style={{ paddingHorizontal: LATERAL_PADDING, marginTop: 16 + 8 }}>
    <Text variant="h2">Hoje</Text>
    <FlatList
      style={{
        marginHorizontal: -27,
        marginTop: 8,
      }}
      horizontal
      contentContainerStyle={{
        paddingHorizontal: LATERAL_PADDING - 4,
      }}
      nestedScrollEnabled
      data={data}
      showsHorizontalScrollIndicator={false}
      CellRendererComponent={(props) => <View {...props} style={{ paddingHorizontal: 4 }} />}
      renderItem={({ item }) => <BirthdayCard key={item.data.id} data={item} variant="today" />}
      keyExtractor={(item) => item.data.id}
    />
  </View>
);

const RecentCards = ({ data }: CardProps) => (
  <View style={{ marginTop: 16, paddingHorizontal: LATERAL_PADDING }}>
    <Text variant="h2">Recentes</Text>
    <FlatList
      style={{
        marginTop: 6,
      }}
      scrollEnabled={false}
      data={data}
      showsHorizontalScrollIndicator={false}
      CellRendererComponent={(props) => <View {...props} style={{ paddingVertical: 2 }} />}
      renderItem={({ item }) => <BirthdayCard key={item.data.id} data={item} variant="recent" />}
      keyExtractor={(item) => item.data.id}
    />
  </View>
);

const NextCards = ({ data }: CardProps) => {
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();

  const isBirthdayNextYear = (person: Person) => {
    const { birthday } = person;
    return (
      birthday.month < currentMonth ||
      (birthday.month === currentMonth && birthday.day < currentDay)
    );
  };

  const renderItem = (index: number, item: PersonView) => {
    const { birthday } = item.data;
    const previusItem = data[index - 1];
    const previusIsOnNextYear = previusItem ? isBirthdayNextYear(previusItem.data) : false;
    const isOnNextYear = isBirthdayNextYear(item.data);
    const isOnNextMonth = birthday.month > currentMonth;
    const isInThisMonth = birthday.month === currentMonth;
    const isPastMoreThanThreeMonths = item.daysLeft > 90;
    const isPreviusPastMoreThreeMonths = previusItem ? previusItem.daysLeft > 90 : false;
    const isPreviusOnLastMonth = previusItem
      ? previusItem.data.birthday.month !== birthday.month
      : false;

    if (isInThisMonth) {
      return <BirthdayCard data={item} variant="others" />;
    }

    /** Renders next year separator */
    if (isOnNextYear && !previusIsOnNextYear) {
      return (
        <>
          <MonthDivider
            label={`${new Date().getFullYear() + 1}`}
            topMargin={previusItem ? undefined : 0}
          />
          <BirthdayCard data={item} variant="others" />
        </>
      );
    }

    if (isPastMoreThanThreeMonths && !isPreviusPastMoreThreeMonths && !!previusItem) {
      return (
        <>
          <MonthDivider label="PRÓXIMOS MESES" topMargin={previusItem ? undefined : 0} />
          <BirthdayCard data={item} variant="others" />
        </>
      );
    }

    if (isOnNextMonth && isPreviusOnLastMonth && !isPastMoreThanThreeMonths) {
      return (
        <>
          <MonthDivider
            label={parseFullMonth(birthday.month)}
            topMargin={previusItem ? undefined : 0}
          />
          <BirthdayCard data={item} variant="others" />
        </>
      );
    }

    return <BirthdayCard data={item} variant="others" />;
  };

  return (
    <View style={{ marginTop: 16, paddingHorizontal: LATERAL_PADDING, paddingBottom: 110 }}>
      <Text variant="h2">Próximos</Text>
      <FlatList
        style={{
          marginTop: 6,
        }}
        scrollEnabled={false}
        data={data}
        showsHorizontalScrollIndicator={false}
        CellRendererComponent={(props) => <View {...props} style={{ paddingVertical: 2 }} />}
        renderItem={({ index, item }) => renderItem(index, item)}
        keyExtractor={(item) => item.data.id}
      />
    </View>
  );
};

export default function HomeScreen() {
  const { data } = usePerson();

  const transformed = transformToView(data);
  const openWelcomeScreen = () => router.navigate('welcome');

  useFirstOpen(() => {
    openWelcomeScreen();
  });

  return (
    <HomeLayout>
      <ScrollView>
        <TodayCards data={transformed.today} />
        <RecentCards data={transformed.recent} />
        <NextCards data={transformed.next} />
      </ScrollView>
    </HomeLayout>
  );
}
