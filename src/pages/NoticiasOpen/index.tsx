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
import { RenderPageContext } from '../../Context/RenderizarPagina';

interface NoticiaDataType{
  id: string
  nome:string,
  subTitulo: string,
  conteudo: string,
  imagemPrimaria: string,
  imagemSecundaria: string
}

const NoticiasOpen = ({route, navigation}) => {
  const {toggle} = useContext(DarkModeContext);
  const {token} = useContext(UserInfoContext);
  const [noticiaData, setNoticiaData] = useState<NoticiaDataType>();
  const [heart, setHeart] = useState('heart-o');
  const { renderPage, ChangeRender } = useContext(RenderPageContext);

  useEffect(() => {
    if(route.params.id) {
      getEvento();
    }
  }, [route.params.id])

  function getEvento() {
    AxiosInstance.get(`/noticia/${route.params.id}`, {headers: {Authorization: token}}).then(res => {
      setNoticiaData(res.data);
      setHeart(res.data.isFavorito ? 'heart' : 'heart-o');
    }).catch(error => {
      console.log(error);
    })
  }

  function handleFavoritar() {
    heart === 'heart' ? setHeart('heart-o') : setHeart('heart');
    
    AxiosInstance.post(`/favorito/noticia/${noticiaData?.id}`, {}, {headers: {Authorization: token}}).then().catch(error => {
      console.log(error);
    });
    ChangeRender()
  }

  return (
    // <>
      <ScrollView style={toggle ? styles.cardDark : styles.card}>
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
          <Text style={toggle ? styles.tituloDark : styles.titulo}>
            {noticiaData?.nome}
          </Text>
        </View>
        <View style={styles.viewImage}>
          <Image
            style={styles.image}
            source={{
              uri: noticiaData?.imagemPrimaria,
            }}
          />
        </View>
        <TouchableOpacity onPress={handleFavoritar}>
          <View style={{alignItems: 'flex-end'}}>
            <Icon
              name={heart}
              color={toggle ? '#65E4F7' : '#51B5C5'}
              type="font-awesome"
              size={24}
            />
          </View>
        </TouchableOpacity>
        <View>
          <View style={styles.tituloNoticia}>
            <Text style={toggle ? styles.tituloSizeDark : styles.tituloSize}>
              {noticiaData?.nome}
            </Text>
            <Text style={toggle ? styles.tituloSizeDark : styles.tituloSize}>
              {noticiaData?.subTitulo}
            </Text>
          </View>
        </View>
        <View style={styles.cardText}>
          <Text style={toggle ? styles.textCardDark : styles.textCard}>
            {noticiaData?.conteudo}
          </Text>
        </View>
        <View style={styles.viewImage}>
          <Image
            style={styles.image}
            source={{
              uri: noticiaData?.imagemSecundaria,
            }}
          />
        </View>
      </ScrollView>
    // </>
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
  tituloSize: {
    fontSize: 20,
    color: '#000000',
  },
  tituloSizeDark: {
    fontSize: 20,
    color: '#EFEFEF',
  },
  tituloGeral: {
    alignItems: 'center',
  },
  tituloNoticia: {
    alignItems: 'flex-start',
    width: '80%',
  },
  icone: {
    alignItems: 'center',
    right: '42%',
    bottom: '1%',
  },
  card: {
    padding: '10%',
    backgroundColor: '#EFEFEF',
    color: 'black',
  },
  cardDark: {
    padding: 10,
    backgroundColor: 'black',
    color: '#EFEFEF',
  },
  cardText: {
    marginTop: 10,
  },
  textCard: {
    fontSize: 18,
    color: '#000000',
  },
  textCardDark: {
    fontSize: 18,
    color: '#EFEFEF',
  },
  containerTitulo: {
    alignItems: 'center',
    textAlign: 'center',
    top: '3.5%',
  },
  tituloContainer: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  viewImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
export default NoticiasOpen;
