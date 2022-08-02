import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    fontSize: 15,
  },
  textTitulo: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  BottomCard: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },

  textDescricao: {
    fontSize: 15,
  },
  ReadMore: {
    color: '#51B5C5',
    fontWeight: 'bold',
  },
  ReadMoreDark: {
    color: '#000000',
    fontWeight: 'bold',
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
  lista: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
  },
  textos: {
    width: '85%',
    padding: 5,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  favortitar: {
    width: '15%',
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  botaoEntrar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
