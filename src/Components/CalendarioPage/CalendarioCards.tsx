import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, Image, Text, View, Alert} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {styles} from './Style';
import {DarkModeContext} from '../../Context/DarkMode';
import AxiosInstance from '../../Api/AxiosInstance';
import { UserInfoContext } from '../../Context/UserInfoContext';

function CardCalendario({eventos}) {
  function showAlert() {
    Alert.alert('Carrinho', 'produto foi excluido do carrinho', [
      {text: 'OK', onPress: () => console.log('')},
    ]);
  }
  const {toggle} = useContext(DarkModeContext);
  const {token} = useContext(UserInfoContext);
  const [heart, setHeart] = useState(eventos.isFavorito ? 'heart' : 'heart-o');
  var data = eventos.dataEvento.split("-");
  var horario = eventos.horaInicio.split("T");

  function NumberToMonth(){
    if(data[1]==="01"){
      return "JAN"
    }else if(data[1]==="02"){
      return "FEV"
    }else if(data[1]==="03"){
      return "MAR"
    }else if(data[1]==="04"){
      return "ABR"
    }else if(data[1]==="05"){
      return "MAI"
    }else if(data[1]==="06"){
      return "JUN"
    }else if(data[1]==="07"){
      return "JUL"
    }else if(data[1]==="08"){
      return "AGO"
    }else if(data[1]==="09"){
      return "SET"
    }else if(data[1]==="10"){
      return "OUT"
    }else if(data[1]==="11"){
      return "NOV"
    }else if(data[1]==="12"){
      return "DEZ"
    }
  }

  function handleFavoritar() {
    heart === 'heart' ? setHeart('heart-o') : setHeart('heart');
    
    AxiosInstance.post(`/favorito/evento/${eventos.id}`, {}, {headers: {Authorization: token}}).then().catch(error => {
      console.log(error);
    });
  }


  return (
    <View style={styles.container}>
      <View style={toggle?styles.listaDark:styles.lista}>
        <View style={styles.leftCard}>
          {/* <View style={styles.middleCardLeft}> */}
          <Text style={toggle?styles.dataTextDark:styles.dataText}>{data[2]}</Text>
          <Text style={toggle?styles.mesTextDark:styles.mesText}>{NumberToMonth()}</Text>
            {/* <Image
              style={styles.image}
              source={{
                uri: 'https://http2.mlstatic.com/D_Q_NP_877579-MLB43518384465_092020-AB.webp',
              }}
            /> */}
          {/* </View> */}
        </View>
        <View style={styles.rightCard}>
          <View style={styles.topCard}>
            <Text style={styles.textTitulo} numberOfLines={1}>{eventos.nome}</Text>
          </View>
          <View style={styles.middleCard}>
          <Text style={styles.textDescricao}>Data:{data[2]}/{data[1]}/{data[0]}</Text>
            <Text style={styles.textDescricao}>Horario:{horario[1]}</Text>
            <Text style={styles.textDescricao }numberOfLines={3}>local: {eventos.local}</Text>
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
export default CardCalendario;
