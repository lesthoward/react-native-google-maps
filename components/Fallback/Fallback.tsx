import { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../../constants/styles';

interface FallbackMessage {
  message: string;
}

interface FallbackChildren {
  children: React.ReactNode;
}

type FallbackProps =
  | (FallbackMessage & Partial<FallbackChildren>)
  | (FallbackChildren & Partial<FallbackMessage>);

const Fallback = (props: FallbackProps) => {
  return (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>{props?.children || props?.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: GlobalStyles.colors.fallbackText,
    ...GlobalStyles.typography.fallbackText,
  }
});

export default Fallback;
