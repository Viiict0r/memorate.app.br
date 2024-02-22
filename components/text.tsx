import { TextBold, TextLight, TextMedium, TextRegular, TextSemiBold } from './styled-text';
import { TextProps } from './themed';

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
  h1: (props: TextProps) => <TextBold {...props} size={30} />,
  h2: (props: TextProps) => <TextBold {...props} size={20} />,
  h3: (props: TextProps) => <TextMedium {...props} size={20} />,
  sub1: (props: TextProps) => <TextSemiBold {...props} size={14} lineHeight={20} />,
  sub2: (props: TextProps) => <TextRegular {...props} size={14} lineHeight={20} />,
  body1: (props: TextProps) => <TextMedium {...props} size={12} lineHeight={16} />,
  body2: (props: TextProps) => <TextLight {...props} size={12} />,
  button1: (props: TextProps) => <TextMedium {...props} size={14} />,
  cap0: (props: TextProps) => <TextSemiBold {...props} size={12} />,
  cap1: (props: TextProps) => <TextMedium {...props} size={12} />,
  cap2: (props: TextProps) => <TextRegular {...props} size={12} lineHeight={14} />,
  cap3: (props: TextProps) => <TextLight {...props} size={10} />,
  cap4: (props: TextProps) => <TextSemiBold {...props} size={10} />,
};

export const Text = ({ variant, ...rest }: Props) => {
  const Component = variants[variant];

  return <Component {...rest} />;
};
