import {
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import SimpleSplashScreen from "../components/SplashScreen";

export default function Home() {
  const [splashComplete, setSplashComplete] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [aceptarTerminos, setAceptarTerminos] = useState(false);

  const handleRegistro = () => {
    if (!nombre || !email) {
      alert("Por favor completa todos los campos");
      return;
    }
    if (!aceptarTerminos) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }
    console.log({ nombre, email, aceptarTerminos });
    alert(`¡Registrado! ${nombre}`);
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.container}
      resizeMode="cover"
    >
      {!splashComplete && (
        <SimpleSplashScreen onSplashComplete={() => setSplashComplete(true)} />
      )}
      {splashComplete && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "none" : "height"}
          style={styles.keyboardAvoid}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            scrollEnabled={false}
          >
            <View style={styles.formContainer}>
              <Text style={styles.title}>Registro de usuario</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                placeholderTextColor="#999"
                value={nombre}
                onChangeText={setNombre}
              />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <View style={styles.terminosContainer}>
                <Switch
                  value={aceptarTerminos}
                  onValueChange={setAceptarTerminos}
                  trackColor={{ false: "#767577", true: "#81c784" }}
                  thumbColor={aceptarTerminos ? "#4caf50" : "#f4f3f4"}
                />
                <Text style={styles.terminosText}>
                  Aceptar términos y condiciones
                </Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleRegistro}>
                <Text style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  formContainer: {
    width: "90%",
    backgroundColor: "#00000052",
    borderRadius: 10,
    padding: 20,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    color: "white",
    fontSize: 16,
  },
  terminosContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  terminosText: {
    color: "white",
    marginLeft: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
