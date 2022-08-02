import React, {useState, useEffect, useContext} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Image,
  StyleSheet,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import AxiosInstance from '../../Api/AxiosInstance';
import BemPetroLogo from '../../assets/BemPetroLogo.png';
import { UserInfoContext } from '../../Context/UserInfoContext';


const Login = ({route, navigation}:any) => {
  const [usuario, setUsuario] = useState({
    email: '',
    senha: '',
  });

  const {setUserData, id, token} = useContext(UserInfoContext);

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = useState(new Animated.Value(0));

  const [logo] = useState(new Animated.ValueXY({x: 400, y: 195}));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
        Animated.spring(offset.y, {
            toValue: 0,
            speed: 4,
            useNativeDriver: false,
            bounciness: 30,
        }),
        Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
        })

    ]).start();
}, []);

function keyboardDidShow() {

    Animated.parallel([
        Animated.timing(logo.x, {
            toValue: 150,
            duration: 100,
            useNativeDriver: false
        }),
        Animated.timing(logo.y, {
            toValue: 75,
            duration: 100,
            useNativeDriver: false
        }),

    ]).start();

}

function keyboardDidHide() {
    Animated.parallel([
        Animated.timing(logo.x, {
            toValue: 400,
            duration: 100,
            useNativeDriver: false
        }),
        Animated.timing(logo.y, {
            toValue: 195,
            duration: 100,
            useNativeDriver: false
        }),

    ]).start();
}

function handleSubmit() {
  AxiosInstance.post('/login', usuario).then(res => {
    setUserData(res.headers.token);
    navigation.navigate('HomeScreen')
  }).catch(error => {
    Alert.alert("Credenciais inválidas");
  });
}

  return (
    <KeyboardAvoidingView style={styles.container}>
      
      <View style={styles.containerLogo}>
        <Animated.Image
          style={[
            styles.foto,
            {
              width: logo.x,
              height: logo.y,
            },
          ]}
          source={BemPetroLogo}
        />
      </View>

      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          textContentType={'emailAddress'}
          keyboardType={'email-address'}
          onChangeText={e => setUsuario({...usuario, email: e})}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          textContentType={'password'}
          onChangeText={e => setUsuario({...usuario, senha: e})}
        />

        <TouchableOpacity style={styles.botaoEntrar} onPress={handleSubmit}>
          <Text style={styles.textEntrar}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.alternativas}>Não possui uma conta? Criar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('EsqueceuSenha')}>
          <Text style={styles.alternativas}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'baseline',
  },

  foto: {
    marginTop: 2,
  
  },

  footer: {
    flex: 1,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 50,
  },

  botaoEntrar: {
    backgroundColor: '#51B5C5',
    width: 308,
    height: 60,
    borderRadius: 30,

    alignItems: 'center',
    justifyContent: 'center',
  },

  textEntrar: {
    fontFamily: 'Roboto',
    width: 84.1,
    height: 20,
    color: '#ffffff',
    alignItems: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    
  },

  input: {
    backgroundColor: '#fff',
    height: 50,
    width: 300,
    position: 'relative',
    bottom: 15,
    color: '#000',

    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 15,
    borderColor: 'black',
    fontSize: 16,
    padding: Platform.OS === 'ios' ? 15 : 10,
  },

  alternativas: {
    color: '#000000',
    textDecorationLine: 'underline',
    fontFamily: 'Roboto',
    fontSize: 16,
    paddingBottom: "1%",
    position: 'relative',
    top: "20%",
  },

  altdown: {

  },
});
export default Login;
