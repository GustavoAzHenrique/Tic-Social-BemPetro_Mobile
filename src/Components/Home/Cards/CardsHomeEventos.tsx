import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, Image, Text, View, Alert} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {styles} from './StyleEvento';
import {DarkModeContext} from '../../../Context/DarkMode';
import AxiosInstance from '../../../Api/AxiosInstance';
import { UserInfoContext } from '../../../Context/UserInfoContext';

function CardHomeEvento({eventos}) {
  function showAlert() {
    Alert.alert('Carrinho', 'produto foi excluido do carrinho', [
      {text: 'OK', onPress: () => console.log('')},
    ]);
  }
  const {toggle} = useContext(DarkModeContext);
  const {token} = useContext(UserInfoContext);
  const [heart, setHeart] = useState(eventos.isFavorito ? 'heart' : 'heart-o');

  function handleFavoritar() {
    heart === 'heart' ? setHeart('heart-o') : setHeart('heart');
    
    AxiosInstance.post(`/favorito/evento/${eventos.id}`, {}, {headers: {Authorization: token}}).then().catch(error => {
      console.log(error);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.lista}>
        <Text style={styles.textTitulo} numberOfLines={2}>{eventos.nome}</Text>
        <View style={styles.viewImage}>
          <Image
            style={styles.image}
            source={{
              uri: eventos.imagem,
            }}
          />
        </View>
        <View style={styles.BottomCard}>
          <View style={styles.textos}>
            <Text style={styles.text} numberOfLines={2}>{eventos.subTitulo}</Text>
            <Text style={styles.textDescricao} numberOfLines={5}>{eventos.descricao}</Text>
          </View>
          <View style={styles.favortitar}>
            <TouchableOpacity
              onPress={handleFavoritar}>
              <Icon
                name={heart}
                color={toggle ? '#000000' : '#51B5C5'}
                type="font-awesome"
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.botaoEntrar}>
          <Text style={toggle ? styles.ReadMoreDark : styles.ReadMore}>
            Leia mais
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default CardHomeEvento;
