import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import CardHomeEvento from '../../Components/Home/Cards/CardsHomeEventos';
import {DarkModeContext} from '../../Context/DarkMode';
import AxiosInstance from '../../Api/AxiosInstance';
import {Alert} from 'react-native';
import {UserInfoContext} from '../../Context/UserInfoContext';
import {EventoType} from '../../Models/EventoType';
import CardHomeNoticia from '../../Components/Home/Cards/CardsHomeNoticias';
import CardHomeOportunidades from '../../Components/Home/Cards/CardsHomeOportunidades';

const Home = ({route, navigation}) => {
  const {toggle} = useContext(DarkModeContext);
  const {token} = useContext(UserInfoContext);
  const [eventos, setEventos] = useState<EventoType[]>([]);
  const [noticias, setNoticias] = useState([]);
  const [oportunidades, setOportunidades] = useState([]);

  useEffect(() => {
    GetDadosEventos();
    GetDadosNoticias();
    GetDadosOportunidades();
  }, []);

  function GetDadosEventos() {
    AxiosInstance.get('/evento', {headers: {Authorization: token}})
      .then(res => {
        setEventos(res.data);
        console.log('dados das eventos: ' + JSON.stringify(res.data));
      })
      .catch(error => {
        console.log(
          'erro ao carregar a lista de eventos - ' + JSON.stringify(error),
        );
      });
  }
  function GetDadosNoticias() {
    AxiosInstance.get('/noticia', {headers: {Authorization: token}})
      .then(res => {
        setNoticias(res.data);
        console.log('dados das noticias: ' + JSON.stringify(res.data));
      })
      .catch(error => {
        console.log(
          'erro ao carregar a lista de noticias - ' + JSON.stringify(error),
        );
      });
  }
  function GetDadosOportunidades() {
    AxiosInstance.get('/oportunidade', {headers: {Authorization: token}})
      .then(res => {
        setOportunidades(res.data);
        console.log('dados das oportunidades: ' + JSON.stringify(res.data));
      })
      .catch(error => {
        console.log(
          'erro ao carregar a lista de oportunidades - ' +
            JSON.stringify(error),
        );
      });
  }

  return (
    <View style={toggle ? styles.containerDark : styles.containerWhite}>
      {/* <CardHomeEvento /> */}
      <ScrollView>
        <FlatList
          data={eventos}
          keyExtractor={(item, index) => index.toString()}
          // onRefresh={onRefresh}
          // refreshing={isFetching}
          // extraData={carrinho}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EventosOpen', item);
                }}>
                <CardHomeEvento eventos={item} />
              </TouchableOpacity>
            );
          }}
        />

        <FlatList
          data={noticias}
          keyExtractor={(item, index) => index.toString()}
          // onRefresh={onRefresh}
          // refreshing={isFetching}
          // extraData={carrinho}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('NoticiasOpen', item)}>
                <CardHomeNoticia noticias={item} />
              </TouchableOpacity>
            );
          }}
        />
        <FlatList
          data={oportunidades}
          keyExtractor={(item, index) => index.toString()}
          // onRefresh={onRefresh}
          // refreshing={isFetching}
          // extraData={carrinho}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('OportunidadesOpen', item)}>
                <CardHomeOportunidades oportunidades={item} />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  containerWhite: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
  },
  containerDark: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

export default Home;
