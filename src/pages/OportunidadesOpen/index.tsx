import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Alert,
  Text,
} from 'react-native';
import {Icon} from 'react-native-elements';
import { DarkModeContext } from '../../Context/DarkMode';

const OportunidadesOpen = ({route, navigation}: any) => {
    const {toggle} = useContext(DarkModeContext);

  return (
    <>
      <ScrollView style={toggle ? styles.cardDark : styles.card}>
        <View style={styles.icone}>
          <Icon
            onPress={() => navigation.goBack()}
            raised
            name="arrow-back-ios"
            type="MaterialIcon"
            color="#51B5C5"
            backgroundColor="#b62020"
          />
        </View>

        <View style={styles.containerTitulo}>
          <Text style={toggle?styles.tituloContainerDark:styles.tituloContainer}>{route?.params.titulo}</Text>
        </View>
        <View style={styles.containerTitulo}>
          <Text style={toggle?styles.tituloContainerDark:styles.tituloContainer}>Empresa: {route?.params.empresa}</Text>
        </View>
        <View style={styles.cardText}>
          <Text style={toggle?styles.textCardDark:styles.textCard}>Requesito: {route?.params.requisito}</Text>
        </View>
        <View style={styles.cardText2}>
          <Text style={toggle?styles.textCardDark:styles.textCard}>{route?.params.descricao}</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  },
  scrool: {
    flex: 1,
  },
  topo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    top: '10%',
  },
  titulo: {
    position: 'relative',
    fontWeight: 'bold',
    fontSize: 25,
    color: '#000000',
  },
  tituloGeral: {
    alignItems: 'center',
    top: '1%',
  },
  icone: {
    alignItems: 'center',
    right: '40%',
    bottom: '1%',
  },
  card: {
    padding: '10%',
    backgroundColor: '#EFEFEF',
  },
  cardDark: {
    padding: '10%',
    backgroundColor: 'black',
  },
  cardText: {
    alignItems: 'center',
    marginVertical: '12%',
    top: '3.5%',
  },
  cardText2: {
    alignItems: 'center',
    marginVertical: '6%',
    top: '3.5%',
  },
  textCard: {
    color: '#000000',
    fontSize: 18,
  },
  textCardDark: {
    color: '#ffffff',
    fontSize: 18,
  },
  containerTitulo: {
    alignItems: 'center',
    textAlign: 'center',
    top: '3.5%',
  },
  tituloContainer: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  tituloContainerDark: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
});
export default OportunidadesOpen;
