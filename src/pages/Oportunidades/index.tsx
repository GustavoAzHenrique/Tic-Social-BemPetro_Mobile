import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import AxiosInstance from '../../Api/AxiosInstance';
import { BarraPesquisa } from '../../Components/BarraPesquisa';
import CardOportunidade from '../../Components/OportunidadePage/OportunidadesCards';
import {DarkModeContext} from '../../Context/DarkMode';
import { UserInfoContext } from '../../Context/UserInfoContext';


const Oportundiades = ({route, navigation}:any) => {
  const {toggle} = useContext(DarkModeContext);
  const {token} = useContext(UserInfoContext);
  const [oportunidades, setOportunidades] = useState();
  const [search, setSearch] = useState<string>("");


  useEffect(() => {
    if(token) {
      getOportunidades();
    }
  }, [token])

  function getOportunidades() {
    AxiosInstance.get('/oportunidade', {headers: {Authorization: token}}).then(res => {
      setOportunidades(res.data);
    }).catch(error => {
      console.log(error);
    });
  }


  return (
    <View style={toggle? styles.containerDark: styles.containerWhite}>
      <BarraPesquisa
        search={search}
        setSearch={setSearch}
      />

      <FlatList
        data={oportunidades?.filter((item:any) => item.titulo.toLowerCase().includes(search.toLowerCase()))}

        renderItem={({item}) => (
          <CardOportunidade
            id={item.id}
            titulo={item.titulo}
            modalidade={item.modalidade.modalidade}
            imgUrl='https://static.vecteezy.com/ti/vetor-gratis/p1/89346-vector-de-conceito-de-entrevista-de-emprego-vetor.jpg'
            municipio={item.municipio.nome}
            uf={item.municipio.uf.sigla}
            dataInicio={item.dataValidadeInicio}
            isFavorito={item.isFavorito}
            onPress={() => navigation.navigate('OportunidadesOpen', item)}
          />
        )}
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

export default Oportundiades;
