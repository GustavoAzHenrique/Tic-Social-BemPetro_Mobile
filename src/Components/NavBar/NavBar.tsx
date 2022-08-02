import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, Image, Text, View, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {styles} from './Style';
import {DarkModeContext} from '../../Context/DarkMode';
import {useNavigation,CommonActions } from '@react-navigation/native';

function NavBar() {
  function showAlert() {
    Alert.alert('Carrinho', 'produto foi excluido do carrinho', [
      {text: 'OK', onPress: () => console.log('')},
    ]);
  }
  const {toggle, ChangeTheme} = useContext(DarkModeContext);
  const navigation = useNavigation();
  return (
    <View style={toggle ? styles.containerDark : styles.containerWhite}>
      <View style={styles.logoImgContainer}>
        <Image
          style={styles.logoImg}
          source={
            toggle
              ? require('../../assets/logoMiniDark.png')
              : require('../../assets/logoMini.png')
          }
        />
      </View>
      <View style={styles.profileBtnContainer}>
        <TouchableOpacity
          style={toggle ? styles.profileBtnDark : styles.profileBtnWhite}
          onPress={() => navigation.dispatch(CommonActions.navigate({
            name: "PerfilScreen"
          }))}>
          <Icon
            name="user"
            color={toggle ? 'white' : 'black'}
            type="font-awesome"
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default NavBar;
