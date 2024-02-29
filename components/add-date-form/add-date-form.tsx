import { useActionSheet } from '@expo/react-native-action-sheet';
import { Feather } from '@expo/vector-icons';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import {
  Alert,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { initialWindowMetrics } from 'react-native-safe-area-context';

import { AvatarUpload } from './avatar-upload';
import { BirthdayPicker } from './birthday-picker';
import { SaveButton } from './save-btn';
import { months } from '../date-picker/months';
import { Text } from '../text';

import Colors, { darkgrey, grey, lighter, red } from '@/constants/Colors';
import { usePerson } from '@/hooks/use-person';
import { useTheme } from '@/hooks/use-theme';
import { useUser } from '@/hooks/use-user';
import { addPerson, updatePerson } from '@/lib/firebase';
import { makePerson } from '@/types/person';

type FormData = {
  name: string;
  day: string;
  month: string;
  photo?: string;
  email_notifications: boolean;
  reminder_days_before: number;
  year?: string;
};

const Divider = ({ opacity = 0.15 }: { opacity?: number }) => (
  <View
    style={{
      width: '100%',
      height: 1,
      backgroundColor: grey,
      opacity,
    }}
  />
);

const Icons = {
  CakeIcon: () => (
    <Image
      style={{
        width: 16,
        height: 16,
      }}
      source={require(`../../assets/images/icons/cake-icon.png`)}
    />
  ),
  CalendarIcon: () => (
    <Image
      style={{
        width: 16,
        height: 16,
      }}
      source={require(`../../assets/images/icons/calendar-icon.png`)}
    />
  ),
  MailIcon: () => (
    <Image
      style={{
        width: 16,
        height: 16,
      }}
      source={require(`../../assets/images/icons/mail-icon.png`)}
    />
  ),
};

type Props = {
  onContentExpand: () => void;
  onContentDecrease: () => void;
  onSuccess?: () => void;
  onClose: () => void;
  initialData?: FormData;
  docId?: string;
  editing?: boolean;
};

export const AddDateForm = ({
  onContentDecrease,
  onContentExpand,
  onSuccess,
  onClose,
  initialData,
  docId,
  editing = false,
}: Props) => {
  const [isBirthdayPickerVisible, setBirthdayPickerVisible] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [isSaveButtonVisible, setSaveButtonVisible] = useState(true);
  const { showActionSheetWithOptions } = useActionSheet();
  const { user } = useUser();
  const { refetch } = usePerson();
  const { theme } = useTheme();
  const methods = useForm<FormData>({
    defaultValues: {
      day: initialData?.day ?? undefined,
      month: initialData?.month ?? undefined,
      year: initialData?.year ?? undefined,
      name: initialData?.name ?? undefined,
      email_notifications: initialData?.email_notifications ?? false,
      reminder_days_before: initialData?.reminder_days_before ?? 0,
      photo: initialData?.photo,
    },
  });
  const {
    watch,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { isSubmitting, errors },
    setError,
    control,
  } = methods;

  const toggleBirthdayPickerVisibility = () => setBirthdayPickerVisible(!isBirthdayPickerVisible);

  const onSubmit = async (data: FormData) => {
    const { name, day, month, year, email_notifications, reminder_days_before } = data;

    clearErrors();

    if (!name) {
      setError('name', {
        message: 'required',
      });

      Alert.alert('Você não informou o nome', 'Nome da pessoa obrigatório', [
        {
          text: 'Voltar',
        },
      ]);
      return;
    }

    if (name.length > 25) {
      setError('name', {
        message: 'size overflow',
      });

      Alert.alert('Nome muito grande', 'O nome não pode ultrapassar 25 caracteres', [
        {
          text: 'Voltar',
        },
      ]);
      return;
    }

    if (!day || !month) {
      setError('day', {
        message: 'required',
      });

      Alert.alert(
        'Você não adicionou uma data de aniversário',
        'Você não pode deixar o mais importante passar despercebido.',
        [
          {
            text: 'Voltar',
          },
        ],
      );
      return;
    }

    try {
      if (editing) {
        await updatePerson(user!.uid, {
          doc_id: docId,
          fullname: name,
          photo: data.photo || null,
          birthday: {
            day: Number(day),
            month: months.indexOf(month),
            year: year ? Number(year) : null,
          },
          options: {
            email_notifications: email_notifications || false,
            reminder_days: reminder_days_before,
          },
        });

        Alert.alert(
          '✨ Aniversário atualizado! ✨',
          'Te enviaremos uma notificação no dia do aniversário',
          [
            {
              text: 'Confirmar',
            },
          ],
        );
      } else {
        await addPerson(
          user!.uid,
          makePerson({
            fullname: name,
            photo: data.photo || null,
            birthday: {
              day: Number(day),
              month: months.indexOf(month),
              year: year ? Number(year) : null,
            },
            options: {
              email_notifications: email_notifications || false,
              reminder_days: reminder_days_before,
            },
          }),
        );

        Alert.alert(
          '✨ Aniversário registrado! ✨',
          'Te enviaremos uma notificação no dia do aniversário',
          [
            {
              text: 'Confirmar',
            },
          ],
        );
      }

      onSuccess?.();
      refetch();
    } catch (error) {
      console.error(error);
      Alert.alert('Oops...', 'Ocorreu um erro ao salvar, tente novamente!');
    }
  };

  const formValues = watch();
  const selectedBirthday =
    formValues.day && formValues.month
      ? `${String(formValues.day).padStart(2, '0')}/${String(months.indexOf(formValues.month) + 1).padStart(2, '0')}${formValues.year ? `/${formValues.year}` : ''}`
      : null;

  const handleReminderOptions = () => {
    showActionSheetWithOptions(
      {
        options: ['2 dias', '7 dias', '15 dias', 'Cancelar'],
        message: 'Deseja ser lembrado com quanto tempo de antecedência?',
        destructiveButtonIndex: 3,
      },
      (index) => {
        switch (index) {
          case 2: // 15 dias
            setValue('reminder_days_before', 15);
            break;
          case 1: // 7 dias
            setValue('reminder_days_before', 7);
            break;
          case 0: // 2 dias
            setValue('reminder_days_before', 2);
            break;
          default:
            break;
        }
      },
    );
  };

  const handleAvatarUploadStart = () => setFormDisabled(true);
  const handleAvatarUploadFinish = () => setFormDisabled(false);

  useEffect(() => {
    if (isBirthdayPickerVisible) {
      onContentExpand();
    } else {
      onContentDecrease();
    }
  }, [isBirthdayPickerVisible]);

  useEffect(() => {
    const platform = Platform.OS;
    const keyboarShowEvent = platform === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const keyboardHideEvent = platform === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

    const showSubscription = Keyboard.addListener(keyboarShowEvent, () => {
      onContentExpand();
      setSaveButtonVisible(false);
    });
    const hideSubscription = Keyboard.addListener(keyboardHideEvent, () => {
      if (!isBirthdayPickerVisible) onContentDecrease();
      setSaveButtonVisible(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [isBirthdayPickerVisible]);

  console.log(isSaveButtonVisible);

  return (
    <FormProvider {...methods}>
      <View style={styles.wrapper}>
        <BottomSheetScrollView style={styles.container}>
          <View style={styles.header}>
            <Text variant="h2">{editing ? 'Editar data' : 'Adicionar data'}</Text>
            <TouchableOpacity
              onPress={() => !formDisabled && onClose()}
              style={[
                styles.close,
                {
                  backgroundColor: 'rgba(174, 174, 174, 0.2)',
                },
              ]}>
              <Feather name="x" size={15} color={grey} />
            </TouchableOpacity>
          </View>

          {/** Nome */}
          <View
            style={[
              styles.photo_container,
              {
                backgroundColor:
                  theme === 'light' ? 'rgba(174, 174, 174, 0.2)' : 'rgba(20, 20, 20, 0.5)',
              },
            ]}>
            <View style={styles.photo_selection}>
              <AvatarUpload
                onUploadStart={handleAvatarUploadStart}
                onUploadFinish={handleAvatarUploadFinish}
                initialURI={initialData?.photo}
              />

              <Text variant="cap2" style={{ marginTop: 20 }}>
                Que tal adicionar uma foto?{' '}
                <Text variant="cap2" lightColor={grey} darkColor={darkgrey}>
                  (Opcional)
                </Text>
              </Text>
            </View>
            <Divider opacity={0.08} />
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  placeholder="Insira aqui o nome da pessoa"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholderTextColor={errors.name?.message ? red : grey}
                  style={[
                    styles.input,
                    {
                      borderBottomColor: errors.name?.message ? red : Colors[theme].input_border,
                      color: Colors[theme].text,
                    },
                  ]}
                />
              )}
            />
          </View>

          {/** Data aniversário */}
          <View style={styles.option}>
            <View style={styles.option__icon}>
              <Icons.CakeIcon />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="body1">Data do aniversário</Text>
            </View>
            <TouchableOpacity
              onPress={toggleBirthdayPickerVisibility}
              style={{ alignItems: 'center', flexDirection: 'row', gap: 3 }}>
              <Text
                variant="body1"
                lightColor={errors.day?.message ? red : darkgrey}
                darkColor={errors.day?.message ? red : lighter}>
                {selectedBirthday ?? 'Adicionar'}
              </Text>
              <Feather
                color={errors.day?.message ? red : darkgrey}
                name="chevron-right"
                size={16}
                style={{ marginTop: -1 }}
              />
            </TouchableOpacity>
          </View>

          <Divider />

          {/* Birthday picker */}
          <BirthdayPicker
            active={isBirthdayPickerVisible}
            initialShowYear={editing && !!initialData?.year}
          />

          {/** Lembrete com antecedência (premium) */}
          <View style={styles.option}>
            <View style={styles.option__icon}>
              <Icons.CalendarIcon />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="body1">Lembrete com antecedência</Text>
            </View>
            <TouchableOpacity
              onPress={handleReminderOptions}
              style={{ alignItems: 'center', flexDirection: 'row', gap: 3 }}>
              <Text variant="body1" lightColor={darkgrey}>
                {formValues.reminder_days_before
                  ? `${formValues.reminder_days_before} dias`
                  : 'Adicionar'}
              </Text>
              <Feather color={darkgrey} name="chevron-right" size={16} style={{ marginTop: -1 }} />
            </TouchableOpacity>
          </View>

          <Divider />

          {/* Notificações por e-mail (premium) */}
          <View style={styles.option}>
            <View style={styles.option__icon}>
              <Icons.MailIcon />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="body1">Receber notificação por e-mail</Text>
            </View>
            <View
              onTouchStart={() =>
                Alert.alert(
                  'Premium Necessário',
                  'Para receber notificações por e-mail, adquira o premium',
                  [
                    {
                      text: 'Obtenha o Premium',
                      isPreferred: true,
                    },
                    {
                      text: 'Voltar',
                    },
                  ],
                )
              }>
              <Controller
                name="email_notifications"
                control={control}
                disabled
                render={({ field: { onChange, value, disabled } }) => (
                  <Switch value={value} onValueChange={onChange} disabled={disabled} />
                )}
              />
            </View>
          </View>
        </BottomSheetScrollView>
        {isSaveButtonVisible && (
          <SaveButton
            disabled={formDisabled || isSubmitting}
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />
        )}
      </View>
    </FormProvider>
  );
};

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? initialWindowMetrics?.insets.bottom : 10,
    flex: 1,
  },
  container: {
    // flex: 1,
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 12,
  },
  option__icon: {
    width: 16,
    height: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  photo_container: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    marginTop: 22,
  },
  photo_selection: {
    gap: 16,
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    paddingVertical: 8,
    fontFamily: 'PoppinsRegular',
    fontSize: 12,
  },
  close: {
    height: 30,
    width: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
  },
});
