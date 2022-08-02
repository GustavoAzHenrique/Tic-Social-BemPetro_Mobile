import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {DarkModeContext} from '../../Context/DarkMode';
import CardNoticias from '../../Components/NoticiasPage/NotciasCards';
import AxiosInstance from '../../Api/AxiosInstance';
import {UserInfoContext} from '../../Context/UserInfoContext';
import {BarraPesquisa} from '../../Components/BarraPesquisa';
import {RenderPageContext} from '../../Context/RenderizarPagina';

const Noticias = ({route, navigation}) => {
  const {toggle} = useContext(DarkModeContext);
  const [noticias, setNoticias] = useState([]);
  const {token} = useContext(UserInfoContext);
  const [search, setSearch] = useState<string>('');
  const {renderPage} = useContext(RenderPageContext);
  useEffect(() => {
    GetDadosNoticias();
  }, [renderPage]);
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
  return (
    <View style={toggle ? styles.containerDark : styles.containerWhite}>
      <Text>Noticias</Text>
      <BarraPesquisa search={search} setSearch={setSearch} />
      <FlatList
        data={noticias?.filter((item: any) =>
          item.nome.toLowerCase().includes(search.toLowerCase()),
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('NoticiasOpen', item)}>
              <CardNoticias noticias={item} />
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

export default Noticias;
