import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { AddDateForm } from '../add-date-form';
import { months } from '../date-picker/months';

import Colors, { grey } from '@/constants/Colors';
import { usePerson } from '@/hooks/use-person';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  personId: string;
  personDocId: string;
  isEditing: boolean;
  onClose: () => void;
};

export const EditDateModal = ({ personId, personDocId, isEditing, onClose }: Props) => {
  const { theme } = useTheme();
  const { data } = usePerson();
  const [snapPoint, setSnapPoint] = useState('60%');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleOpen = useCallback(
    () => bottomSheetModalRef.current?.present(),
    [bottomSheetModalRef],
  );
  const handleSuccessOrClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
    onClose();
  }, [bottomSheetModalRef]);

  const handleExpand = useCallback(() => setSnapPoint('85%'), []);
  const handleDecrease = useCallback(() => setSnapPoint('60%'), []);

  useEffect(() => {
    if (isEditing) {
      handleOpen();
    }
  }, [isEditing, handleOpen]);

  const editingPersonData = data.find((person) => person.id === personId);

  return (
    <BottomSheetModal
      containerStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      handleIndicatorStyle={{
        backgroundColor: grey,
      }}
      ref={bottomSheetModalRef}
      index={1}
      enablePanDownToClose={false}
      backgroundStyle={{
        backgroundColor: Colors[theme].sheet_background,
      }}
      snapPoints={[snapPoint, snapPoint]}>
      <AddDateForm
        editing
        onSuccess={handleSuccessOrClose}
        onContentExpand={handleExpand}
        onContentDecrease={handleDecrease}
        onClose={handleSuccessOrClose}
        docId={personDocId}
        initialData={
          editingPersonData
            ? {
                day: String(editingPersonData.birthday.day),
                month: months[editingPersonData.birthday.month],
                year: editingPersonData?.birthday.year
                  ? String(editingPersonData?.birthday.year)
                  : undefined,
                email_notifications: editingPersonData?.options.email_notifications,
                photo: editingPersonData?.photo || undefined,
                reminder_days_before: editingPersonData?.options.reminder_days,
                name: editingPersonData?.fullname,
              }
            : undefined
        }
      />
    </BottomSheetModal>
  );
};
