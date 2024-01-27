import { Text, TextProps } from '@/components/Themed';

type Props = {
  size?: number;
} & TextProps;

export function TextLight({ size, ...props }: Props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontFamily: 'PoppinsLight', fontSize: size || 14 },
      ]}
    />
  );
}

export function TextRegular({ size, ...props }: Props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontFamily: 'PoppinsRegular', fontSize: size || 14 },
      ]}
    />
  );
}

export function TextMedium({ size, ...props }: Props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontFamily: 'PoppinsMedium', fontSize: size || 14 },
      ]}
    />
  );
}

export function TextSemiBold({ size, ...props }: Props) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontFamily: 'PoppinsSemiBold', fontSize: size || 14 },
      ]}
    />
  );
}

export function TextBold({ size, ...props }: Props) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: 'PoppinsBold', fontSize: size || 14 }]}
    />
  );
}
