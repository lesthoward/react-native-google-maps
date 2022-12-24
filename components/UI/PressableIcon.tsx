import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { Ionicons as IconPack } from '@expo/vector-icons';

interface PressableIconProps extends PressableProps {
  size: number;
  color: string;
  name: React.ComponentProps<typeof IconPack>['name'];
}

const PressableIcon = ({
  size,
  color,
  name,
  style,
  ...rest
}: PressableIconProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      {...rest}
    >
      <IconPack size={size} color={color} name={name} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  pressed: {
    opacity: 0.1,
  },
});

export default PressableIcon;
