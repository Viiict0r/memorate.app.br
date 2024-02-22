import { router } from 'expo-router';
import React from 'react';
import { View, ScrollView, FlatList } from 'react-native';

import { BirthdayCard } from '@/components/birthday-card';
import { Loading } from '@/components/loading';
import { MonthDivider } from '@/components/month-divider';
import { Text } from '@/components/text';
import { darkgrey, grey } from '@/constants/Colors';
import { useFirstOpen } from '@/hooks/use-first-open';
import { usePerson } from '@/hooks/use-person';
import { HomeLayout } from '@/layouts/home-layout';
import { PersonView, transformToView } from '@/lib/transform-data';
import { Person } from '@/types/person';
import { horizontalScale, verticalScale } from '@/utils/metrics';
import { parseFullMonth } from '@/utils/month-parser';

const LATERAL_PADDING = 27;

type CardProps = {
  data: PersonView[];
};

const TodayCards = ({ data }: CardProps) => (
  <View style={{ paddingHorizontal: LATERAL_PADDING, marginTop: verticalScale(16 + 8) }}>
    <Text variant="h2">Hoje</Text>
    {!data.length && (
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: verticalScale(8) }}>
        <Text variant="sub2" lightColor={grey} darkColor={darkgrey}>
          Sem aniversários hoje 😔
        </Text>
      </View>
    )}

    {!!data.length && (
      <FlatList
        style={{
          marginHorizontal: -27,
          marginTop: verticalScale(8),
        }}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: LATERAL_PADDING - 4,
        }}
        nestedScrollEnabled
        data={data}
        showsHorizontalScrollIndicator={false}
        CellRendererComponent={(props) => (
          <View {...props} style={{ paddingHorizontal: horizontalScale(4) }} />
        )}
        renderItem={({ item }) => <BirthdayCard key={item.data.id} data={item} variant="today" />}
        keyExtractor={(item) => item.data.id}
      />
    )}
  </View>
);

const RecentCards = ({ data }: CardProps) => (
  <View style={{ marginTop: verticalScale(16), paddingHorizontal: LATERAL_PADDING }}>
    <Text variant="h2">Recentes</Text>
    {!data.length && (
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: verticalScale(8) }}>
        <Text
          variant="sub2"
          lightColor={grey}
          darkColor={darkgrey}
          style={{
            textAlign: 'center',
            maxWidth: horizontalScale(205),
          }}>
          Já passaram uns dias desde o último aniversário. 🤔
        </Text>
      </View>
    )}

    {!!data.length && (
      <FlatList
        style={{
          marginTop: verticalScale(6),
        }}
        scrollEnabled={false}
        data={data}
        showsHorizontalScrollIndicator={false}
        CellRendererComponent={(props) => (
          <View {...props} style={{ paddingVertical: verticalScale(2) }} />
        )}
        renderItem={({ item }) => <BirthdayCard key={item.data.id} data={item} variant="recent" />}
        keyExtractor={(item) => item.data.id}
      />
    )}
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
    let hasPreviusSeparator = false; // Indica se já renderizou algum divider
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

    if (isInThisMonth && !isOnNextYear) {
      return <BirthdayCard data={item} variant="others" highlighted />;
    }

    /** Renders next year separator */
    if (isOnNextYear && !previusIsOnNextYear) {
      if (!hasPreviusSeparator) {
        hasPreviusSeparator = true;
      }
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
      if (!hasPreviusSeparator) {
        hasPreviusSeparator = true;
      }

      return (
        <>
          <MonthDivider label="PRÓXIMOS MESES" topMargin={previusItem ? undefined : 0} />
          <BirthdayCard data={item} variant="others" />
        </>
      );
    }

    if (isOnNextMonth && isPreviusOnLastMonth && !isPastMoreThanThreeMonths) {
      if (!hasPreviusSeparator) {
        hasPreviusSeparator = true;
      }

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

    return <BirthdayCard data={item} variant="others" highlighted={!hasPreviusSeparator} />;
  };

  return (
    <View style={{ marginTop: verticalScale(16), paddingBottom: verticalScale(110) }}>
      <Text variant="h2" style={{ paddingHorizontal: LATERAL_PADDING }}>
        Próximos
      </Text>
      <FlatList
        style={{
          marginTop: verticalScale(6),
        }}
        scrollEnabled={false}
        data={data}
        showsHorizontalScrollIndicator={false}
        CellRendererComponent={(props) => <View {...props} style={{ paddingVertical: 4 }} />}
        renderItem={({ index, item }) => renderItem(index, item)}
        keyExtractor={(item) => item.data.id}
      />
    </View>
  );
};

export default function HomeScreen() {
  const { data, isLoading } = usePerson();

  const openWelcomeScreen = () => router.navigate('welcome');

  const transformed = transformToView(data);
  const isEmpty = data.length === 0;

  useFirstOpen(() => {
    openWelcomeScreen();
  });

  return (
    <HomeLayout>
      <ScrollView>
        {!isEmpty && (
          <>
            <TodayCards data={transformed.today} />
            <RecentCards data={transformed.recent} />
            <NextCards data={transformed.next} />
          </>
        )}

        {isLoading && <Loading />}

        {isEmpty && !isLoading && (
          <View
            style={{
              maxWidth: horizontalScale(212),
              flex: 1,
              paddingTop: '50%',
              alignItems: 'center',
              height: '100%',
              alignSelf: 'center',
            }}>
            <Text variant="h1" style={{ marginBottom: 8 }}>
              🙃
            </Text>
            <Text
              variant="h2"
              style={{
                textAlign: 'center',
              }}>
              Nenhum aniversário adicionado ainda...
            </Text>
            <Text
              variant="body2"
              style={{
                textAlign: 'center',
                marginTop: 8,
              }}>
              Que tal <Text variant="body1">adicionar as datas</Text> de aniversário dos seus
              amigos?
            </Text>
          </View>
        )}
      </ScrollView>
    </HomeLayout>
  );
}
