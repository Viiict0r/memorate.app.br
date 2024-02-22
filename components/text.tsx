import { TextBold, TextLight, TextMedium, TextRegular, TextSemiBold } from './styled-text';
import { TextProps } from './themed';

import { moderateScale } from '@/utils/metrics';

type Props = {
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'sub1'
    | 'sub2'
    | 'body1'
    | 'body2'
    | 'button1'
    | 'cap0'
    | 'cap1'
    | 'cap2'
    | 'cap3'
    | 'cap4';
} & TextProps;

const variants = {
  h1: (props: TextProps) => <TextBold {...props} size={moderateScale(30)} />,
  h2: (props: TextProps) => <TextBold {...props} size={moderateScale(20)} />,
  h3: (props: TextProps) => <TextMedium {...props} size={moderateScale(20)} />,
  sub1: (props: TextProps) => <TextSemiBold {...props} size={moderateScale(14)} />,
  sub2: (props: TextProps) => <TextRegular {...props} size={moderateScale(14)} />,
  body1: (props: TextProps) => <TextMedium {...props} size={moderateScale(12)} />,
  body2: (props: TextProps) => <TextLight {...props} size={moderateScale(12)} />,
  button1: (props: TextProps) => <TextMedium {...props} size={moderateScale(14)} />,
  cap0: (props: TextProps) => <TextSemiBold {...props} size={moderateScale(12)} />,
  cap1: (props: TextProps) => <TextMedium {...props} size={moderateScale(12)} />,
  cap2: (props: TextProps) => <TextRegular {...props} size={moderateScale(12)} />,
  cap3: (props: TextProps) => <TextLight {...props} size={moderateScale(10)} />,
  cap4: (props: TextProps) => <TextSemiBold {...props} size={moderateScale(10)} />,
};

export const Text = ({ variant, ...rest }: Props) => {
  const Component = variants[variant];

  return <Component {...rest} />;
};
