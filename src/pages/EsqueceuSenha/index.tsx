import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Icon } from 'react-native-elements';
import AxiosInstance from "../../Api/AxiosInstance";

const EsqueceuSenha = ({ route, navigation }: any) => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState<boolean>(false);


  function handleSubmit() {
    setLoading(true);
    AxiosInstance.put("/recuperarSenha", {email: email}).then(res => {
      setLoading(false);
      Alert.alert("Email enviado com sucesso");
      navigation.navigate("Login");
    }).catch(error => {
      console.log(error);
      setLoading(false);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerIcone}>
        <Icon
          onPress={() => navigation.navigate('Login')}
          raised
          name='arrow-back-ios'
          type='MaterialIcon'
          color="#51B5C5"
          iconStyle={styles.icone}

        />
      </View>

      <View style={styles.containerLogo}>
        <Image style={styles.foto} source={require('../../assets/BemPetroLogo.png')} />
      </View>

      <TextInput style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.alternativas}>Você receberá um e-mail para realizar a
        redefinição de senha.
      </Text>

      <TouchableOpacity
        style={styles.botaoConfirmar}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? 
        <ActivityIndicator
          animating={loading}
          size={'large'}
          color="#f0D906"
        />
        :
        <Text style={styles.textConfirmar}>CONFIRMAR</Text>}
      </TouchableOpacity>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
    display: "flex",
    flexDirection: 'column',
    flex: 1,
    alignItems: "center",
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    width: 300,
    position: "relative",
    top: 70,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  containerLogo: {
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "baseline",
    top: 50,
  },
  foto: {
    width: 300,
    height: 150,
  },

  alternativas: {
    color: '#929292',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
    marginTop: 40,
    padding: 20,
    paddingBottom: 30,

    position: 'relative',
    top: 20,
  },

  botaoConfirmar: {
    backgroundColor: '#51B5C5',
    width: 308,
    height: 60,
    borderRadius: 30,

    alignItems: 'center',
    justifyContent: 'center',
  },

  textConfirmar: {
    fontFamily: 'Roboto',
    height: 20,
    color: '#ffffff',
    alignItems: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },

  containerIcone: {
    position: "absolute",


    width: "40%",
    height: "95%",
    left: "5%",
    bottom: "3.5%",
  },
  icone: {
    


  },

});
export default EsqueceuSenha;