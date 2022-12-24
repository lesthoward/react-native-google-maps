import { StyleSheet } from 'react-native';

const GlobalStyles = {
  typography: StyleSheet.create({
    fallbackText: {
      fontSize: 16,
    },
    formLabel: {
      fontSize: 16,
    },
    button: {
      fontSize: 16,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    info: {
      fontSize: 12,
    }
  }),
  colors: {
    // Navigator
    navigatorTab: "#0570c9",
    navigatorContent: "#221c30",
    navigatorText: "#221c30",

    // Text
    generalText: "#77cff8",
    fallbackText: "#c2c2c2",
    textAccent: "#221c30",

    // Others
    formLabel: "#1aacf0",
    formInput: "#0570c9",
    formInputBackground: "#a0defb",
    imagePreviewContainer: "#a0defb",

    // Buttons
    button: "#a0defb",
    buttonText: "#a0defb",
    buttonAccent: "#0570c9",
    buttonAccentText: "#c2c2c2",

    // Utilities
    danger: "#e24444",
  },
  shadows: {
    generalShadow: {
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
    }
  }
};

export default GlobalStyles;