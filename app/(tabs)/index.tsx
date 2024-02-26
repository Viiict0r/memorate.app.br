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
import {
  DataWithSeparator,
  PersonView,
  insertNextSeparators,
  transformToView,
} from '@/lib/transform-data';
import { horizontalScale, verticalScale } from '@/utils/metrics';

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
  const withSeparators = insertNextSeparators(data);

  const renderItem = (index: number, item: DataWithSeparator) => {
    if (item.type === 'separator') {
      return <MonthDivider label={item.payload as string} />;
    }

    if (item.type === 'date') {
      return (
        <BirthdayCard
          data={item.payload as PersonView}
          variant="others"
          highlighted={item.highlighted}
        />
      );
    }

    return null;
  };

  return (
    <View style={{ marginTop: verticalScale(16), paddingBottom: verticalScale(110) }}>
      <Text variant="h2" style={{ paddingHorizontal: LATERAL_PADDING }}>
        Próximos
      </Text>

      {!data.length && (
        <View
          style={{ justifyContent: 'center', alignItems: 'center', marginTop: verticalScale(8) }}>
          <Text
            variant="sub2"
            lightColor={grey}
            darkColor={darkgrey}
            style={{
              textAlign: 'center',
              maxWidth: horizontalScale(205),
            }}>
            Aguardando os próximos aniversariantes! 👀
          </Text>
        </View>
      )}

      {!!data.length && (
        <FlatList
          style={{
            marginTop: verticalScale(6),
          }}
          scrollEnabled={false}
          data={withSeparators}
          showsHorizontalScrollIndicator={false}
          CellRendererComponent={(props) => <View {...props} style={{ paddingVertical: 4 }} />}
          renderItem={({ index, item }) => renderItem(index, item)}
          keyExtractor={(item) =>
            item.type === 'separator' ? String(item.payload) : (item.payload as PersonView).data.id
          }
        />
      )}
    </View>
  );
};

function HomeScreen() {
  const { data, isLoading } = usePerson();

  const openWelcomeScreen = () => router.navigate('welcome');

  const transformed = transformToView(data);
  const isEmpty = data.length === 0;

  useFirstOpen(() => {
    openWelcomeScreen();
  });

  console.log('re-endered');

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
              maxWidth: horizontalScale(232),
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

export default React.memo(HomeScreen, () => false);
