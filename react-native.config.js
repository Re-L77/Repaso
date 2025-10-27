module.exports = {
  project: {
    ios: {},
    android: {},
  },
  dependencies: {},
  commands: [
    {
      name: "link",
      description: "Link native dependencies",
      func: (args) => {
        // Linking fonts for React Native
      },
    },
  ],
  fonts: [
    "./assets/fonts/Montserrat-Regular.ttf",
    "./assets/fonts/Montserrat-Bold.ttf",
    "./assets/fonts/Montserrat-Medium.ttf",
    "./assets/fonts/Montserrat-SemiBold.ttf",
  ],
};
