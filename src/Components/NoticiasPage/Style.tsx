import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 5,
  },
  textTitulo: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  textDescricao: {
    fontSize: 15,
  },
  textTipo:{
    color: '#51B5C5',
    fontSize: 15,
  },
  textTipoDark:{
    color: '#65E4F7',
    fontSize: 15,
  },
  ReadMore: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  ReadMoreDark: {
    color: '#000000',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  lista: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    height: 200,
  },
  botaoInscrever: {
    backgroundColor: '#51B5C5',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  botaoInscreverDark: {
    backgroundColor: '#65E4F7',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  leftCard: {
    width: '40%',
    justifyContent: 'center',
  },
  rightCard: {
    width: '60%',
    paddingLeft: 5
  },
  topCard: {
    height: '40%',
    justifyContent: 'center',
  },
  middleCard: {
    height: '40%',
    justifyContent: 'center',
  },
  topCardLeft: {
    height: '20%',
  },
  middleCardLeft: {
    height: '80%',
    justifyContent: 'center',
  },
  BottomCard: {
    height: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btnContainer:{
    width: "80%",
    alignItems: 'flex-start',
    justifyContent:'center'
  },
  favoritarContainer:{
    width: "20%",
    justifyContent:'center'
  }
});
