import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, Image, Text, View, Alert, TouchableOpacityProps} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {styles} from './Style';
import {DarkModeContext} from '../../Context/DarkMode';
import AxiosInstance from '../../Api/AxiosInstance';
import { UserInfoContext } from '../../Context/UserInfoContext';


interface CardOportunidadeProps extends TouchableOpacityProps{
  id: number
  titulo: string,
  modalidade: string,
  imgUrl: string,
  municipio: string,
  uf: string,
  dataInicio: string,
  isFavorito: boolean
}

function CardOportunidade({id, titulo, modalidade, imgUrl, municipio, uf, dataInicio, isFavorito, ...rest}: CardOportunidadeProps) {
  const {toggle} = useContext(DarkModeContext);
  const {token} = useContext(UserInfoContext);
  const [heart, setHeart] = useState(isFavorito ? 'heart' : 'heart-o');
  const [inscreverlabel, setInscreverLabel] = useState<string>("inscreva-se");
  const [isInscrito, setIsInscrito] = useState<boolean>();


  useEffect(() => {
    if(token) {
      verificaInscrito();
    }
  }, [token])

  function verificaInscrito() {
    AxiosInstance.get(`/inscricaoOportunidade/${id}/isInscrito`, {headers: {Authorization: token}}).then(res => {
      if(res.data) {
        setInscreverLabel("inscrito");
      }
    }).catch(error => {
      console.log(error);
    })
  }

  function handleInscrevase() {
    AxiosInstance.post(`/inscricaoOportunidade/${id}/inscrever`, {}, {headers: {Authorization: token}}).then(res => {
      setInscreverLabel("inscrito");
    }).catch(error => {
      console.log(error);
    });
  }

  function handleFavoritar() {
    heart === 'heart' ? setHeart('heart-o') : setHeart('heart');
    
    AxiosInstance.post(`/favorito/oportunidade/${id}`, {}, {headers: {Authorization: token}}).then().catch(error => {
      console.log(error);
    });
  }

  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <View style={styles.lista}>
        <View style={styles.leftCard}>
          <View style={styles.topCardLeft}>
            <Text style={toggle? styles.textTipoDark:styles.textTipo}>{modalidade}</Text>
          </View>
          <View style={styles.middleCardLeft}>
            <Image
              style={styles.image}
              source={{
                uri: imgUrl
              }}
            />
          </View>
        </View>
        <View style={styles.rightCard}>
          <View style={styles.topCard}>
            <Text style={styles.textTitulo} numberOfLines={2}>{titulo}</Text>
          </View>
          <View style={styles.middleCard}>
            <Text style={styles.textDescricao}>Inicio: {dataInicio}</Text>
            <Text style={styles.textDescricao}>local: {municipio}-{uf}</Text>
          </View>
          <View style={styles.BottomCard}>
            <View style={styles.btnContainer}>
              <TouchableOpacity onPress={handleInscrevase} style={toggle?styles.botaoInscreverDark:styles.botaoInscrever}>
                <Text style={toggle?styles.ReadMoreDark:styles.ReadMore}>{inscreverlabel}</Text>
              </TouchableOpacity>
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
    </TouchableOpacity>
  );
}
export default CardOportunidade;
