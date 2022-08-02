import React, { useState, useContext } from 'react';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Home from '../pages/Home';
import NavBar from '../Components/NavBar/NavBar';
import { Button } from 'react-native-elements';
import { DarkModeContext } from '../Context/DarkMode';
import Oportundiades from '../pages/Oportunidades';
import Eventos from '../pages/Eventos/Index';
import EsqueceuSenha from '../pages/EsqueceuSenha';
import ConfirmarSenha from '../pages/ConfirmarSenha';
import Calendario from '../pages/Calendar/Index';
import Perfil from '../pages/Perfil';
import EditarPerfil from '../pages/EditarPerfil1';
import PoliticaPrivacidade from '../pages/PoliticaPrivacidade';
import TermoDeUso from '../pages/TermoDeUso';
import Noticias from '../pages/Noticia/Index';
import NoticiasOpen from '../pages/NoticiasOpen';
import OportunidadesOpen from '../pages/OportunidadesOpen';
import EventosOpen from '../pages/EventosOpen';
import Favoritos from '../pages/Favoritos';


const StackNavigation = createNativeStackNavigator();

const TabNavigation = createBottomTabNavigator();
const BottomTabNavigator = () => {
  //   const {contarQtdProdutos} = useContext(CarrinhoContext);

  //   const BadgeIcon = withBadge(contarQtdProdutos())(Icon);
  return (
    <TabNavigation.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarHideOnKeyboard: false,
      tabBarStyle: { backgroundColor: '#FFFFFF', borderBottomWidth: 0 },
      tabBarButton: ['PerfilScreen'].includes(route.name)
        ? () => {
          return null;
        }
        : undefined,
    })}>
      <TabNavigation.Screen
        name="HomeTabScreen"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => {
            return <Icon name="home" type="font-awesome" size={24} />;
          },
        }}
      />
      <TabNavigation.Screen
        name="OportTabScreen"
        component={Oportundiades}
        options={{
          tabBarLabel: 'Vagas',
          tabBarIcon: () => {
            return <Icon name="star" type="font-awesome" size={24} />;
          },
        }}
      />
      <TabNavigation.Screen
        name="EventsTabScreen"
        component={Eventos}
        options={{
          tabBarLabel: 'Eventos',
          tabBarIcon: () => {
            return <Icon name="car" type="font-awesome" size={24} />;
          },
        }}
      />
      <TabNavigation.Screen
        name="CalendarTabScreen"
        component={Calendario}
        options={{
          tabBarLabel: 'Calendario',
          tabBarIcon: () => {
            return <Icon name="calendar" type="font-awesome" size={24} />;
          },
        }}
      />
      <TabNavigation.Screen
        name="NoticiasTabScreen"
        component={Noticias}
        options={{
          tabBarLabel: 'Noticias',
          tabBarIcon: () => {
            return <Icon name="folder" type="font-awesome" size={24} />;
          },
        }}
      />
      <TabNavigation.Screen
        name="PerfilScreen"
        component={Perfil}
        options={{
          tabBarLabel: 'lalala',
          tabBarIcon: () => {
            return <Icon name="folder" type="font-awesome" size={24} />;
          },
        }}
      />
    </TabNavigation.Navigator>
  );
};

const Routes = () => {
  const { toggle, ChangeTheme } = useContext(DarkModeContext);
  return (
    <NavigationContainer>
      <StackNavigation.Navigator>
        <StackNavigation.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <StackNavigation.Screen
          options={{
            headerStyle: {
              backgroundColor: toggle ? '#65E4F7' : '#51B5C5',
            },
            headerTitle: props => <NavBar />,
            headerBackVisible: false,
          }}
          name="HomeScreen"
          component={BottomTabNavigator}
        />
        <StackNavigation.Screen
          options={{ headerShown: false }}
          name="Registro"
          component={Registro}
        />
        <StackNavigation.Screen
          options={{ headerShown: false }}
          name="EsqueceuSenha"
          component={EsqueceuSenha}
        />

        <StackNavigation.Screen
          options={{ headerShown: false }}
          name="ConfirmarSenha"
          component={ConfirmarSenha}
        />
        {/* <StackNavigation.Screen
          options={{ headerShown: false }}
          name="PerfilScreen"
          component={Perfil}
        /> */}
        <StackNavigation.Screen
          options={{ headerShown: false }}
          name="EditarPerfil"
          component={EditarPerfil}
        />
        <StackNavigation.Screen
          options={{ headerShown: false }}
          name="PoliticaPrivacidade"
          component={PoliticaPrivacidade}
        />
        <StackNavigation.Screen
          options={{ headerShown: false }}
          name="TermoDeUso"
          component={TermoDeUso}
        />
        <StackNavigation.Screen
          options={{ headerShown: false }}
          name="NoticiasOpen"
          component={NoticiasOpen}
        />
        <StackNavigation.Screen
          options={{ headerShown: false }}
          name="OportunidadesOpen"
          component={OportunidadesOpen}
        />
        <StackNavigation.Screen
          options={{ headerShown: false }}
          name="EventosOpen"
          component={EventosOpen}
        />
        <StackNavigation.Screen
          options={{ headerShown: false }}
          name="Favoritos"
          component={Favoritos}
        />
      </StackNavigation.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
