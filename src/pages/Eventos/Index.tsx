import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CardHomeEvento from '../../Components/Home/Cards/CardsHomeEventos';
import {DarkModeContext} from '../../Context/DarkMode';
import {UserInfoContext} from '../../Context/UserInfoContext';
import CardEventos from '../../Components/EventosPage/EventosCards';
import AxiosInstance from '../../Api/AxiosInstance';
import {EventoType} from '../../Models/EventoType';
import {BarraPesquisa} from '../../Components/BarraPesquisa';
const Eventos = ({route, navigation}) => {
  const {toggle} = useContext(DarkModeContext);
  const {token} = useContext(UserInfoContext);
  const [eventos, setEventos] = useState<EventoType[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    GetDadosEventos();
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

  return (
    <View style={toggle ? styles.containerDark : styles.containerWhite}>
      <BarraPesquisa search={search} setSearch={setSearch} />
      <FlatList
        // data={eventos}
        data={eventos?.filter((item: any) =>
          item.nome.toLowerCase().includes(search.toLowerCase()),
        )}
        keyExtractor={(item, index) => index.toString()}
        // onRefresh={onRefresh}
        // refreshing={isFetching}
        // extraData={carrinho}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('EventosOpen', item)}>
              <CardEventos eventos={item} />
            </TouchableOpacity>
          );
        }}
      />
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

export default Eventos;
