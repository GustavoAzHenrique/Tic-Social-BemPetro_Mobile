import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, Image, Text, View, Alert} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {styles} from './StyleEvento';
import {DarkModeContext} from '../../../Context/DarkMode';
import { UserInfoContext } from '../../../Context/UserInfoContext';
import AxiosInstance from '../../../Api/AxiosInstance';

function CardHomeNoticia({noticias}: any) {
  function showAlert() {
    Alert.alert('Carrinho', 'produto foi excluido do carrinho', [
      {text: 'OK', onPress: () => console.log('')},
    ]);
  }
  const {toggle} = useContext(DarkModeContext);
  const {token} = useContext(UserInfoContext);
  const [heart, setHeart] = useState(noticias.isFavorito ? 'heart' : 'heart-o');


  function handleFavoritar() {
    heart === 'heart' ? setHeart('heart-o') : setHeart('heart');
    
    AxiosInstance.post(`/favorito/evento/${noticias.id}`, {}, {headers: {Authorization: token}}).then().catch(error => {
      console.log(error);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.lista}>
        <Text style={styles.textTitulo} numberOfLines={2}>{noticias.nome}</Text>
        <View style={styles.viewImage}>
          <Image
            style={styles.image}
            source={{
              uri: noticias.imagemPrimaria,
            }}
          />
        </View>
        <View style={styles.BottomCard}>
          <View style={styles.textos}>
            <Text style={styles.text} numberOfLines={2}>{noticias.subTitulo}</Text>
            <Text style={styles.textDescricao} numberOfLines={5}>{noticias.conteudo}</Text>
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
export default CardHomeNoticia;
