import { Pressable, Text, PressableProps, StyleSheet } from 'react-native';
import { Ionicons as IconPack } from '@expo/vector-icons';
import GlobalStyles from '../../constants/styles';

interface PressableButtonProps extends PressableProps {
  children: React.ReactNode;
  iconName?: React.ComponentProps<typeof IconPack>['name'];
  size?: number;
  color?: string;
}

const PressableButton = ({
  children,
  iconName,
  size,
  color,
  ...rest
}: PressableButtonProps) => {
  const colorStyle = color ? { color: color } : null;
  const borderStyle = color ? { borderColor: color } : null;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressed,
        borderStyle,
      ]}
      {...rest}
    >
      <IconPack
        name={iconName || 'camera'}
        size={size || 18}
        color={color || GlobalStyles.colors.buttonText}
        style={styles.icon}
      />
      <Text style={[styles.text, colorStyle]}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GlobalStyles.colors.button,
    flexDirection: 'row',
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: GlobalStyles.colors.buttonText,
    ...GlobalStyles.typography.button,
  },
});

export default PressableButton;
