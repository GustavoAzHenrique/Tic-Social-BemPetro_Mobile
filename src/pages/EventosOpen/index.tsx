import React, {useState, useContext, useEffect} from 'react';
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
import AxiosInstance from '../../Api/AxiosInstance';
import {DarkModeContext} from '../../Context/DarkMode';
import { UserInfoContext } from '../../Context/UserInfoContext';

interface EventoDataType{
  id: number,
  nome:string,
  imagem: string,
  local: string,
  descricao: string
}

const EventosOpen = ({route, navigation}: any) => {
  const {toggle} = useContext(DarkModeContext);
  const {token} = useContext(UserInfoContext);
  const [heart, setHeart] = useState('heart-o');
  const [data, setData] = useState([]);
  const [horario, setHorario] = useState([]);
  const [eventoData, setEventoData] = useState<EventoDataType>();


  useEffect(() => {
    if(route.params.id) {
      getEvento();
    }
  }, [route.params.id])

  function getEvento() {
    AxiosInstance.get(`/evento/${route.params.id}`, {headers: {Authorization: token}}).then(res => {
      setEventoData(res.data);
      setData(res.data.dataEvento.split("-"));
      setHorario(res.data.horaInicio.split("T"));

      setHeart(res.data.isFavorito ? 'heart' : 'heart-o');
    }).catch(error => {
      console.log(error);
    })
  }

  function handleFavoritar() {
    heart === 'heart' ? setHeart('heart-o') : setHeart('heart');
    
    AxiosInstance.post(`/favorito/evento/${eventoData?.id}`, {}, {headers: {Authorization: token}}).then().catch(error => {
      console.log(error);
    });
  }


  return (
    <>
      <ScrollView style={toggle?styles.cardDark:styles.card}>
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
        <View style={styles.tituloGeral}>
          <Text style={toggle?styles.tituloDark:styles.titulo}>{eventoData?.nome}</Text>
        </View>

        <View style={styles.viewImage}>
          <Image
            style={styles.image}
            source={{
              uri: eventoData?.imagem,
            }}
          />
        </View>
        <View style={{alignItems:'flex-end'}}>
          <TouchableOpacity onPress={handleFavoritar}>
            <Icon
              name={heart}
              color={toggle ? '#65E4F7' : '#51B5C5'}
              type="font-awesome"
              size={24}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.textDescricao}>Data:{data[2]}/{data[1]}/{data[0]}</Text>
            <Text style={toggle?styles.textDescricaoDark:styles.textDescricao}>Horario:{horario[1]}</Text>
            <Text style={toggle?styles.textDescricaoDark:styles.textDescricao}>local: {eventoData?.local}</Text>
        <View style={styles.cardText}>
          <Text style={styles.textCard}>{eventoData?.descricao}</Text>
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
  tituloDark: {
    position: 'relative',
    fontWeight: 'bold',
    fontSize: 25,
    color: '#EFEFEF',
  },
  tituloGeral: {
    alignItems: 'center',
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

  },
  textCard: {
    color: '#000000',
    fontSize: 18,
  },
  containerTitulo: {
    alignItems: 'center',
    textAlign: 'center',
  },
  tituloContainer: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  viewImage: {
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textDescricao: {
    fontSize: 15,
    color: '#000000',
  },
  textDescricaoDark: {
    fontSize: 15,
    color: '#ffffff',
  },
});
export default EventosOpen;
