import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AxiosInstance from '../../Api/AxiosInstance';
import CardCalendario from '../../Components/CalendarioPage/CalendarioCards';
import {SearchBar} from 'react-native-elements';
import {DarkModeContext} from '../../Context/DarkMode';
import { EventoType } from '../../Models/EventoType';
import { UserInfoContext } from '../../Context/UserInfoContext';
import { BarraPesquisa } from '../../Components/BarraPesquisa';
const Calendario = ({route, navigation}) => {
  const {toggle} = useContext(DarkModeContext);
  const[busca,setBusca]=useState('')
  const {token} = useContext(UserInfoContext);
  const [eventos, setEventos] = useState<EventoType[]>([]);
  const [search, setSearch] = useState<string>("");

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
      <Text> Calendario</Text>
      <BarraPesquisa
        search={search}
        setSearch={setSearch}
      />
      <FlatList
          // data={eventos}
          data={eventos?.sort((a:any, b:any) => {
            return a.dataEvento < b.dataEvento ? -1 : a.dataEvento > b.dataEvento ? 1 : 0;
          }).filter((item:any) => item.nome.toLowerCase().includes(search.toLowerCase()))}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('EventosOpen', item)}>
                <CardCalendario eventos={item} />
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

export default Calendario;
