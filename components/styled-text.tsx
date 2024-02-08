import { Text, TextProps } from '@/components/themed';

type Props = {
  size?: number;
  lineHeight?: number;
} & TextProps;

export function TextLight({ size, lineHeight, ...props }: Props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontFamily: 'PoppinsLight', fontSize: size || 14, lineHeight: lineHeight ?? undefined },
      ]}
    />
  );
}

export function TextRegular({ size, lineHeight, ...props }: Props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontFamily: 'PoppinsRegular', fontSize: size || 14, lineHeight: lineHeight ?? undefined },
      ]}
    />
  );
}

export function TextMedium({ size, lineHeight, ...props }: Props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontFamily: 'PoppinsMedium', fontSize: size || 14, lineHeight: lineHeight ?? undefined },
      ]}
    />
  );
}

export function TextSemiBold({ size, lineHeight, ...props }: Props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily: 'PoppinsSemiBold',
          fontSize: size || 14,
          lineHeight: lineHeight ?? undefined,
        },
      ]}
    />
  );
}

export function TextBold({ size, lineHeight, ...props }: Props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontFamily: 'PoppinsBold', fontSize: size || 14, lineHeight: lineHeight ?? undefined },
      ]}
    />
  );
}
