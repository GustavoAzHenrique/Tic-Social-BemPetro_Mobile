import React, {useState, useEffect, useContext} from 'react';
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
  FlatList,
} from 'react-native';
import {Icon} from 'react-native-elements';
import AxiosInstance from '../../Api/AxiosInstance';
import CardEventos from '../../Components/EventosPage/EventosCards';
import CardNoticias from '../../Components/NoticiasPage/NotciasCards';
import CardOportunidade from '../../Components/OportunidadePage/OportunidadesCards';
import {DarkModeContext} from '../../Context/DarkMode';
import {UserInfoContext} from '../../Context/UserInfoContext';

const Favoritos = ({route, navigation}) => {
  const [section, setSection] = useState(0);
  const [toggle1, setToggle1] = React.useState(true);
  const [toggle2, setToggle2] = React.useState(false);
  const [toggle3, setToggle3] = React.useState(false);
  const [cor, setCor] = React.useState();
  const [cor2, setCor2] = React.useState();
  const [cor3, setCor3] = React.useState();
  const {toggle} = useContext(DarkModeContext);
  const {token} = useContext(UserInfoContext);
  const [eventosFav, setEventosFav] = useState([]);
  const [noticiasFav, setNoticiasFav] = useState([]);
  const [oportunidadesFav, setOportunidadesFav] = useState([]);

  React.useEffect(() => {
    // console.log(toggle);
    // setCor(() => (toogle ? styles.botaoEntrar3 : styles.botaoEntrar3NaoClicado));
    // setCor2(() => (toogle2 ? styles.botaoEntrar3 : styles.botaoEntrar3NaoClicado));
    // setCor3(() => (toogle3 ? styles.botaoEntrar3 : styles.botaoEntrar3NaoClicado));
  }, [toggle1, toggle2, toggle3, toggle]);

  useEffect(() => {
    if (token) {
      getEventosFav();
      getOportunidadesFav();
      getNoticiasFav();
    }
  }, [token]);

  function getEventosFav() {
    AxiosInstance.get('/favorito/eventos', {headers: {Authorization: token}})
      .then(res => {
        setEventosFav(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function getNoticiasFav() {
    AxiosInstance.get('/favorito/noticias', {headers: {Authorization: token}})
      .then(res => {
        setNoticiasFav(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function getOportunidadesFav() {
    AxiosInstance.get('/favorito/oportunidades', {
      headers: {Authorization: token},
    })
      .then(res => {
        setOportunidadesFav(res.data);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
      <View style={toggle ? styles.containerDark : styles.container}>
        <View style={styles.topo}>
          <View style={styles.icone}>
            <Icon
              onPress={() => navigation.navigate('HomeScreen')}
              raised
              name="arrow-back-ios"
              type="MaterialIcon"
              color="#51B5C5"
              backgroundColor="#b62020"
            />
          </View>
          <View style={styles.tituloGeral}>
            <Text style={toggle ? styles.tituloDark : styles.titulo}>
              FAVORITOS
            </Text>
          </View>
        </View>
        <View style={styles.sections}>
          <View style={styles.viewSections}>
            <TouchableOpacity
              style={
                toggle1
                  ? toggle
                    ? styles.botaoEntrar3Dark
                    : styles.botaoEntrar3
                  : toggle
                  ? styles.botaoEntrar3NaoClicadoDark
                  : styles.botaoEntrar3NaoClicado
              }
              onPress={() => {
                setSection(0);
                setToggle1(true);
                setToggle2(false);
                setToggle3(false);
              }}>
              <Text
                style={
                  toggle1
                    ? toggle
                      ? styles.textEntrar3Dark
                      : styles.textEntrar3
                    : toggle
                    ? styles.textEntrar3NaoClicadoDark
                    : styles.textEntrar3NaoClicado
                }>
                Evento
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewSections}>
            <TouchableOpacity
              style={
                toggle2
                  ? toggle
                    ? styles.botaoEntrar3Dark
                    : styles.botaoEntrar3
                  : toggle
                  ? styles.botaoEntrar3NaoClicadoDark
                  : styles.botaoEntrar3NaoClicado
              }
              onPress={() => {
                setSection(1);
                setToggle1(false);
                setToggle2(true);
                setToggle3(false);
              }}>
              <Text
                style={
                  toggle2
                    ? toggle
                      ? styles.textEntrar3Dark
                      : styles.textEntrar3
                    : toggle
                    ? styles.textEntrar3NaoClicadoDark
                    : styles.textEntrar3NaoClicado
                }>
                Oportunidade
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewSections}>
            <TouchableOpacity
              style={
                toggle3
                  ? toggle
                    ? styles.botaoEntrar3Dark
                    : styles.botaoEntrar3
                  : toggle
                  ? styles.botaoEntrar3NaoClicadoDark
                  : styles.botaoEntrar3NaoClicado
              }
              onPress={() => {
                setSection(2);
                setToggle1(false);
                setToggle2(false);
                setToggle3(true);
              }}>
              <Text
                style={
                  toggle3
                    ? toggle
                      ? styles.textEntrar3Dark
                      : styles.textEntrar3
                    : toggle
                    ? styles.textEntrar3NaoClicadoDark
                    : styles.textEntrar3NaoClicado
                }>
                Notícia
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {section === 0 && (
          <FlatList
            data={eventosFav}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EventosOpen', item);
                  }}>
                  <CardEventos eventos={item} />
                </TouchableOpacity>
              );
            }}
          />
        )}
        {section === 1 && (
          <FlatList
            data={oportunidadesFav}
            style={{marginBottom: 100}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <CardOportunidade
                  id={item.id}
                  titulo={item.titulo}
                  modalidade={item.modalidade.modalidade}
                  imgUrl="https://static.vecteezy.com/ti/vetor-gratis/p1/89346-vector-de-conceito-de-entrevista-de-emprego-vetor.jpg"
                  municipio={item.municipio.nome}
                  uf={item.municipio.uf.sigla}
                  dataInicio={item.dataValidadeInicio}
                  isFavorito={item.isFavorito}
                  onPress={() => navigation.navigate('OportunidadesOpen', item)}
                />
              );
            }}
          />
        )}
        {section === 2 && (
          <FlatList
            data={noticiasFav}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('NoticiasOpen', item)}>
                  <CardNoticias noticias={item} />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#EFEFEF',
  },
  containerDark: {
    flex: 1,
    padding: 5,
    backgroundColor: 'black',
  },
  viewcontainer: {
    alignItems: 'stretch',
  },
  icone: {
    alignItems: 'center',
    right: '100%',
  },
  tituloGeral: {
    alignItems: 'center',
    right: '45%',
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
    color: '#51B5C5',
  },
  sections: {
    marginTop: 10,
    alignItems: 'stretch',
    textAlign: 'center',
    flexDirection: 'row',
    paddingLeft: '2.5%',
    paddingRight: '2.5%',
  },
  viewSections: {
    width: '33%',
    alignItems: 'stretch',
    padding: 0,
  },
  textEntrar3: {
    fontFamily: 'Roboto',
    width: '100%',
    height: 20,
    color: '#ffffff',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textEntrar3Dark: {
    fontFamily: 'Roboto',
    width: '100%',
    height: 20,
    color: '#000000',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textEntrar3NaoClicado: {
    fontFamily: 'Roboto',
    width: '100%',
    height: 20,
    color: '#51B5C5',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textEntrar3NaoClicadoDark: {
    fontFamily: 'Roboto',
    width: '100%',
    height: 20,
    color: '#000000',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botaoEntrar3: {
    backgroundColor: '#51B5C5',
    width: 110,
    height: 50,
    marginHorizontal: 2,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#51B5C5',
    borderRadius: 5,
    color: '#ffffff',
  },
  botaoEntrar3Dark: {
    backgroundColor: '#65E4F7',
    width: 110,
    height: 50,
    marginHorizontal: 2,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#65E4F7',
    borderRadius: 5,
    color: '#ffffff',
  },
  botaoEntrar3NaoClicado: {
    backgroundColor: '#ffffff',
    width: 110,
    height: 50,
    marginHorizontal: 2,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#51B5C5',
    borderWidth: 1,
    borderRadius: 5,
  },
  botaoEntrar3NaoClicadoDark: {
    backgroundColor: '#ffffff',
    width: 110,
    height: 50,
    marginHorizontal: 2,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#65E4F7',
    borderWidth: 1,
    borderRadius: 5,
  },
  viewSection: {},
  scrollSection: {},
});
export default Favoritos;
