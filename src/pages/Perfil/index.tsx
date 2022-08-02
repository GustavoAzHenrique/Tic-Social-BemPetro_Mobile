import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Switch,
  ScrollView
} from 'react-native';
import CardCalendario from '../../Components/CalendarioPage/CalendarioCards';
import {SearchBar} from 'react-native-elements';
import {DarkModeContext} from '../../Context/DarkMode';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Perfil = ({route, navigation}) => {
  const {toggle, ChangeTheme} = useContext(DarkModeContext);
  const [busca, setBusca] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function handleSair() {
    toggleModal();
    AsyncStorage.removeItem("@token");
    navigation.navigate('Login');
  }

  return (
    <View style={toggle ? styles.containerDark : styles.containerWhite}>
      <View style={styles.containertitulo}>
        <Text style={toggle ? styles.tituloDark : styles.titulo}>
          Olá, Nome do Usuário
        </Text>
      </View>
      <View>
        <View style={styles.botoes}>
          <TouchableOpacity
            style={toggle ? styles.botaoEntrar2Dark : styles.botaoEntrar2}
            onPress={() => navigation.navigate('Favoritos')}>
            <Text style={toggle ? styles.textEntrarDark : styles.textEntrar}>
              Favoritos
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.botoes}>
          <TouchableOpacity
            style={toggle ? styles.botaoEntrar2Dark : styles.botaoEntrar2}
            onPress={() => navigation.navigate('EditarPerfil')}>
            <Text style={toggle ? styles.textEntrarDark : styles.textEntrar}>
              Editar Perfil
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.botoes}>
          <TouchableOpacity
            style={toggle ? styles.botaoEntrar2Dark : styles.botaoEntrar2}
            onPress={toggleModal}>
            <Text style={toggle ? styles.textEntrarDark : styles.textEntrar}>
              Sair
            </Text>
          </TouchableOpacity>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#51B5C5'}}
          thumbColor={toggle ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => ChangeTheme()}
          value={toggle}
        />
      </View>

      <Modal
        style={styles.containermodal}
        isVisible={isModalVisible}
        backdropColor="black">
        <View style={styles.modalDefinitivo2}>
          <View style={styles.containerModalModal}>
            <Icon
              onPress={toggleModal}
              raised
              name="close"
              type="font-awesome"
              color="#51B5C5"
              iconStyle={styles.modalModal}
            />
          </View>
          <View style={styles.containertitulomodal}>
            <Text style={styles.titulomodal}>Certeza que deseja sair?</Text>
          </View>
          <View style={styles.viewImage}>
            <Image
              style={styles.image}
              source={require('../../assets/sair.png')}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.botaoEntrar4} 
            onPress={() => navigation.navigate('Login')}>
              <Text style={styles.textEntrar4}>SIM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoEntrar3} onPress={toggleModal}>
              <Text style={styles.textEntrar3}>NÃO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  containerWhite: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#EFEFEF',
  },
  containerDark: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  containertitulomodal: {
    marginHorizontal: 20,
    bottom: 85,
  },
  titulo: {
    fontSize: 30,
    color: '#000000',
    fontWeight: 'bold',
  },
  tituloDark: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  containertitulo: {
    bottom: '12%',
  },
  modalModal: {
    alignItems: 'flex-end',
  },
  viewImage: {
    width: '50%',
    height: 100,
    bottom: 7,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  containerModalModal: {
    display: 'flex',
    alignItems: 'flex-end',
    bottom: 95,
    left: '35%',
  },
  botaoEntrar2: {
    backgroundColor: '#EFEFEF',
    width: 268,
    height: 60,
    borderWidth: 2,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#51B5C5',
    textAlign: 'center',
  },
  botaoEntrar2Dark: {
    backgroundColor: '#65E4F7',
    width: 268,
    height: 60,
    borderWidth: 2,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#65E4F7',
    textAlign: 'center',
  },
  textEntrar: {
    fontFamily: 'Roboto',
    width: 110,
    height: 20,
    color: '#51B5C5',
    alignItems: 'center',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textEntrarDark: {
    fontFamily: 'Roboto',
    width: 110,
    height: 20,
    color: '#000000',
    alignItems: 'center',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  botoes: {
    padding: 15,
  },
  containermodal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDefinitivo2: {
    width: 300,
    height: 450,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulomodal: {
    fontWeight: 'bold',
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000000',
  },
  botaoEntrar3: {
    backgroundColor: '#51B5C5',
    width: 120,
    height: 55,
    borderRadius: 5,
    top: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  textEntrar3: {
    fontFamily: 'Roboto',
    width: 100,
    height: 20,
    color: '#ffffff',
    alignItems: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botaoEntrar4: {
    backgroundColor: '#ffffff',
    width: 120,
    height: 55,
    borderRadius: 5,
    top: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: 10,
    borderColor: '#51B5C5',
    borderWidth: 2,
  },
  textEntrar4: {
    fontFamily: 'Roboto',
    width: 100,
    height: 20,
    color: '#51B5C5',
    alignItems: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Perfil;
