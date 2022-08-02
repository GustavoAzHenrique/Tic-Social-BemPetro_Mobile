import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, Image, Text, View, Alert} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {styles} from './Style';
import {DarkModeContext} from '../../Context/DarkMode';
import { UserInfoContext } from '../../Context/UserInfoContext';
import AxiosInstance from '../../Api/AxiosInstance';

function CardNoticias({noticias}: any) {
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
    
    AxiosInstance.post(`/favorito/noticia/${noticias.id}`, {}, {headers: {Authorization: token}}).then().catch(error => {
      console.log(error);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.lista}>
        <View style={styles.leftCard}>
          <View style={styles.middleCardLeft}>
            <Image
              style={styles.image}
              source={{
                uri: noticias.imagemPrimaria,
              }}
            />
          </View>
        </View>
        <View style={styles.rightCard}>
          <View style={styles.topCard}>
            <Text style={styles.textTitulo} numberOfLines={2}>{noticias.nome}</Text>
          </View>
          <View style={styles.middleCard}>
            <Text style={styles.textDescricao} numberOfLines={2}>{noticias.subTitulo}</Text>
            <Text style={styles.textDescricao} numberOfLines={3}>{noticias.conteudo}</Text>
          </View>
          <View style={styles.BottomCard}>
            <View style={styles.btnContainer}>
              {/* <TouchableOpacity style={toggle?styles.botaoInscreverDark:styles.botaoInscrever}>
                <Text style={toggle?styles.ReadMoreDark:styles.ReadMore}>inscreva-se</Text>
              </TouchableOpacity> */}
            </View>
            <View style={styles.favoritarContainer}>
              <TouchableOpacity
                onPress={handleFavoritar}>
                <Icon
                  name={heart}
                  color={toggle?"#65E4F7": "#51B5C5"}
                  type="font-awesome"
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
export default CardNoticias;
