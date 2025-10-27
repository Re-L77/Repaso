import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Dimensions, View } from "react-native";

const { height } = Dimensions.get("window");

export default function SimpleSplashScreen({ onSplashComplete }) {
  const [showMain, setShowMain] = useState(false);

  // Animaciones Splash
  const fadeLogo = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(0.5)).current;
  const rotateLogo = useRef(new Animated.Value(0)).current;
  const slideText = useRef(new Animated.Value(height / 2)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animación inicial del logo: fade + scale + rotación
    Animated.parallel([
      Animated.timing(fadeLogo, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }),
      Animated.spring(scaleLogo, {
        toValue: 1,
        friction: 5,
        useNativeDriver: false,
      }),
      Animated.timing(rotateLogo, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }),
    ]).start();

    // Animación del texto: slide + fade
    Animated.timing(slideText, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
      delay: 800,
    }).start();

    // Después de 3s, fade-out del Splash y mostrar contenido principal
    const timer = setTimeout(() => {
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 800,
        useNativeDriver: false,
      }).start(() => {
        setShowMain(true);
        if (onSplashComplete) {
          onSplashComplete();
        }
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [onSplashComplete]);

  const rotateInterpolate = rotateLogo.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "10deg"],
  });

  if (showMain) {
    return null;
  }

  // Splash animado
  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container, { opacity: fadeOut }]}>
        <Animated.Image
          source={require("../assets/teto.png")}
          resizeMode="contain"
          style={[
            styles.logoImage,
            {
              opacity: fadeLogo,
              transform: [{ scale: scaleLogo }, { rotate: rotateInterpolate }],
            },
          ]}
        />
        <Animated.Text
          style={[styles.text, { transform: [{ translateY: slideText }] }]}
        >
          ¡Bienvenido!
        </Animated.Text>
        <Animated.View
          style={[
            styles.loader,
            {
              opacity: fadeLogo,
              transform: [
                {
                  translateX: slideText.interpolate({
                    inputRange: [0, height / 2],
                    outputRange: [0, -50],
                  }),
                },
              ],
            },
          ]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000ff",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000ff",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    width: 60,
    height: 6,
    backgroundColor: "#fff",
    borderRadius: 3,
  },
  logoImage: {
    width: 300,
    height: 300,
    marginBottom: 5,
  },
  text: {
    color: "white",
    fontSize: 40,
    marginBottom: 10,
    textAlign: "center",
  },
});
