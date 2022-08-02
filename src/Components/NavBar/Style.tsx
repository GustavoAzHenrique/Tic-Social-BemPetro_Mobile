import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  containerWhite: {
    display: 'flex',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    width: '100%',
    // alignItems: 'center',
    // padding: 5,
    backgroundColor: '#51B5C5',
  },
  containerDark: {
    display: 'flex',
    height: 70,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    // alignItems: 'center',
    // padding: 5,
    backgroundColor: '#65E4F7',
  },
  logoImgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '30%',
  },
  logoImg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 70,
  },
  profileBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  profileBtnWhite: {
    backgroundColor:"white",
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius:50,
  },
  profileBtnDark: {
    backgroundColor:"black",
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius:50,
  },
});
