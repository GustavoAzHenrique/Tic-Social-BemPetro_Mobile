import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';

const PoliticaPrivacidade = ({route, navigation}) => {
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center'}}
      style={styles.container}>
      <View style={styles.containerIcone}>
        <Icon
          onPress={() => navigation.navigate('Registro')}
          raised
          name="arrow-back-ios"
          type="MaterialIcon"
          color="#51B5C5"
          iconStyle={styles.icone}
        />
      </View>

      <Text style={styles.textoTitulo}>POLÍTICA DE PRIVACIDADE</Text>

      <Text style={styles.textoParagrafo}>
        Lorem ipsum odio augue viverra nostra pulvinar odio aenean nisl
        fringilla ligula at auctor, pretium porttitor mauris varius fringilla
        leo netus arcu metus nullam dictumst. libero donec integer nec magna nec
        dui convallis mi varius tellus tempor leo, aenean sagittis cras ante
        class blandit quisque cubilia odio torquent. habitasse eu class
        tincidunt suspendisse mattis curabitur ac venenatis, a tortor sit urna
        malesuada aenean vehicula quam turpis, leo fermentum tortor sagittis
        taciti accumsan quisque. interdum ullamcorper curabitur venenatis vitae
        primis rhoncus ac sed cursus, vehicula nostra sagittis urna a laoreet
        rutrum tellus. Lorem ipsum odio augue viverra nostra pulvinar odio
        aenean nisl fringilla ligula at auctor, pretium porttitor mauris varius
        fringilla leo netus arcu metus nullam dictumst. libero donec integer nec
        magna nec dui convallis mi varius tellus tempor leo, aenean sagittis
        cras ante class blandit quisque cubilia odio torquent. habitasse eu
        class tincidunt suspendisse.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#EFEFEF',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    // alignItems: 'center',
  },

  containerIcone: {
    position: 'absolute',

    width: '40%',
    height: '95%',
    left: '5%',
    bottom: '3.5%',
  },

  icone: {},

  textoTitulo: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    position: 'relative',
    top: '5%',
    left: '5%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

  textoParagrafo: {
    fontFamily: 'Roboto',
    padding: 20,
    top: 80,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
  },
});
export default PoliticaPrivacidade;

