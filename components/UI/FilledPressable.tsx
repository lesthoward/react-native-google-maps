import { Pressable, Text, PressableProps, StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/styles';

interface FilledPressableProps extends PressableProps {
  children: React.ReactNode;
}

const FilledPressable = ({ children, ...rest }: FilledPressableProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      {...rest}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: 8,
    backgroundColor: GlobalStyles.colors.buttonAccent,
    borderRadius: 4,
    ...GlobalStyles.shadows.generalShadow,
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    textAlign: 'center',
    color: GlobalStyles.colors.buttonAccentText,
    ...GlobalStyles.typography.button,
  },
});

export default FilledPressable;
