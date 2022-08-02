import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';


const ConfirmarSenha = ({ route, navigation }) => {
    const [novaSenha, setNovaSenha] = useState('');

    return (
        <View style={styles.container}>

            <View style={styles.containerIcone}>
                <Icon                    
                    onPress={() => navigation.navigate('EsqueceuSenha')}
                    raised
                    name='arrow-back-ios'
                    type='MaterialIcon'
                    color="#51B5C5"
                    iconStyle={styles.icone}

                />
            </View>

            <View style={styles.containerLogo}>
                <Image style={styles.foto} source={require('../../assets/BemPetroLogo.png')} />
            </View>

            <View style={styles.footer}>
                <TextInput style={styles.input}
                    placeholder="Nova Senha"
                    secureTextEntry={true}
                    textContentType={'password'}

                />
                <TextInput style={styles.input}
                    placeholder="Repita a nova senha"
                    secureTextEntry={true}
                    textContentType={'password'}

                />


                <TouchableOpacity style={styles.botaoConfirmar}>
                    <Text style={styles.textConfirmar}>CONFIRMAR</Text>
                </TouchableOpacity>
            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFEFEF',
        display: "flex",
        flexDirection: 'column',
        flex: 1,
        alignItems: "center",
    },
    input: {
        backgroundColor: '#fff',
        height: 50,
        width: 300,
        position: 'relative',
        bottom: 15,
        color: '#000',

        borderRadius: 10,
        marginBottom: 20,
        marginHorizontal: 15,
        borderColor: 'black',
        fontSize: 16,
        padding: Platform.OS === 'ios' ? 15 : 10,
    },
    containerLogo: {
        position: "relative",
        justifyContent: "flex-start",
        alignItems: "baseline",
        top: 50,
    },
    foto: {
        width: 300,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },

    footer: {
        marginVertical: 80,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingBottom: 50,
    },

    botaoConfirmar: {
        backgroundColor: '#51B5C5',
        width: 308,
        height: 60,
        borderRadius: 30,

        alignItems: 'center',
        justifyContent: 'center',
    },

    textConfirmar: {
        fontFamily: 'Roboto',
        height: 20,
        color: '#ffffff',
        alignItems: 'center',
        fontSize: 17,
        fontWeight: 'bold',
    },
    icone: {
    


    },

    containerIcone: {
        position: "absolute",
        

        width: "40%",
        height: "95%",
        left: "5%",
        bottom: "3.5%",
    },
});
export default ConfirmarSenha;