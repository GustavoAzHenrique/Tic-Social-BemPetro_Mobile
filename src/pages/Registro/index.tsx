import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  Pressable,
  Alert,
  Text,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import AxiosInstance from '../../Api/AxiosInstance';
import {UserInfoContext} from '../../Context/UserInfoContext';
import {TextInputMask} from 'react-native-masked-text';
import {RenderPageContext} from '../../Context/RenderizarPagina';

const Registro = ({route, navigation}) => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [DDD, setDDD] = useState('');
  const [telefone, setTelefone] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [grauDeEscolaridade, setGrauDeEscolaridade] = useState([]);
  const [grauDeEscolaridadeModal, setGrauDeEscolaridadeModal] = useState('');
  const [grauDeEscolaridadeSet, setGrauDeEscolaridadeSet] = useState('');
  const [instituicaoEnsinoSet, setInstituicaoEnsinoSet] = useState('');
  const [instituicaoEnsinoModal, setInstituicaoEnsinoModal] = useState('');
  const [instituicaoEnsino, setInstituicaoEnsino] = useState([]);
  const {renderPage, ChangeRender} = useContext(RenderPageContext);
  const [municipio, setMunicipio] = useState('');
  const [CEP, setCEP] = useState('');
  const [UF, setUF] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [numero, setNumero] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const {token} = useContext(UserInfoContext);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const [status, setStatus] = useState({
    type: '',
    mensagem: '',
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function enviarDados() {
    if (!validate()) return;
    AxiosInstance.post(`/pessoa/fisica`, dados)
      .then().catch(error => console.log(error.response.headers));
      Alert.alert("O cadastro foi realizado com sucesso!")
    return navigation.navigate('Login');

  }

  function checkCEP() {
    // const cep2 = e.target.value;
    // console.log(cep2);
    fetch(`https://viacep.com.br/ws/${CEP}/json/`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMunicipio(data.localidade);
        setLogradouro(data.logradouro);
        setUF(data.uf);
      });
  }

  let dados = {
    email: email,
    senha: senha,
    dataNascimento: dataNascimento,
    nome: nomeCompleto,
    instituicaoEnsino: instituicaoEnsinoSet,
    grauInstrucao: grauDeEscolaridadeSet,
    telefones: [
      {
        ddd: DDD,
        numero: telefone,
      },
    ],
    enderecos: [
      {
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        cep: CEP,
        municipio: municipio,
        uf: UF,
      },
    ],
  };

  const [isModalVisible2, setModalVisible2] = useState(false);

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const [section, setSection] = useState(0);

  let dadosGrauInstrucao = {
    grau: grauDeEscolaridadeModal,
  };

  // const [items, setItems] = useState([

  //   { label: dados.instituicaoEnsino, value: instituicaoEnsino },

  // ]);

  // ]);

  const items = [];

  {
    instituicaoEnsino.map(item =>
      //  console.log(item.nome)
      items.push({label: item.nome, value: item.nome}),
    );
  }

  const items2 = [];

  {
    grauDeEscolaridade.map(item =>
      //  console.log(item.nome)
      items2.push({label: item.grau, value: item.grau}),
    );
  }

  function enviarDadosGrauInstrucao() {
    AxiosInstance.post(`/grauInstrucao`, dadosGrauInstrucao);
    getDadosGrauInstrucao();
    ChangeRender();
  }

  useEffect(() => {
    getDadosGrauInstrucao();
  }, [renderPage]);

  const getDadosGrauInstrucao = async () => {
    AxiosInstance.get('/grauInstrucao')
      .then(result => {
        console.log(
          'dados de Grau de Instrução:' + JSON.stringify(result.data),
        );
        setGrauDeEscolaridade(result.data);
        // SetDropDown();
      })
      .catch(error => {
        console.log('Erro ao carregar ' + JSON.stringify(error));
      });
  };

  function validate() {
    if (!dados.email)
      return setStatus({
        type: 'error',
        mensagem: 'Error: Necessário preencher o campo Email!',
      });
    if (!dados.nome)
      return setStatus({
        type: 'error',
        mensagem: 'Error: Necessário preencher o campo Nome',
      });
    if (!dados.senha)
      return setStatus({
        type: 'error',
        mensagem: 'Error: Necessário preencher o campo Senha!',
      });
    if (!dados.dataNascimento)
      return setStatus({
        type: 'error',
        mensagem: 'Error: Necessário preencher o campo Data de Nascimento!',
      });
    if (!dados.instituicaoEnsino)
      return setStatus({
        type: 'error',
        mensagem: 'Error: Necessário preencher o campo Instituição de Ensino!',
      });
    if (!dados.grauInstrucao)
      return setStatus({
        type: 'error',
        mensagem: 'Error: Necessário preencher o campo Grau de Instrução!',
      });
    if (!dados.telefones[0].numero)
      return setStatus({
        type: 'error',
        mensagem: 'Error: Necessário preencher o campo Numero de Telefone!',
      });
    if (!dados.telefones[0].ddd)
      return setStatus({
        type: 'error',
        mensagem: 'Error: Necessário preencher o campo DDD!',
      });
    if (!dados.enderecos[0].cep)
      return setStatus({
        type: 'error',
        mensagem: 'Error: Necessário preencher o campo CEP!',
      });
    if (!dados.enderecos[0].numero)
      return setStatus({
        type: 'error',
        mensagem: 'Error: Necessário preencher o campo Numero de Residência!',
      });
    if (!dados.enderecos[0].municipio)
      return setStatus({
        type: 'error',
        mensagem: 'Error: Necessário preencher o campo Municipio!',
      });
    if (!dados.enderecos[0].logradouro)
      return setStatus({
        type: 'error',
        mensagem: 'Error: Necessário preencher o campo Logradouro!',
      });
    if (!dados.enderecos[0].uf)
      return setStatus({
        type: 'error',
        mensagem: 'Error: Necessário preencher o campo UF!',
      });

    return true;
  }

  let dadosInstuicaoEnsino = {
    nome: instituicaoEnsinoModal,
  };

  function enviarDadosInstituicaoDeEnsino() {
    AxiosInstance.post(`/instituicaoEnsino`, dadosInstuicaoEnsino);
    getDadosGrauInstrucao();
    ChangeRender();
  }

  useEffect(() => {
    getDadosInstituicaoDeEnsino();
  }, [renderPage]);

  const getDadosInstituicaoDeEnsino = async () => {
    AxiosInstance.get('/instituicaoEnsino')
      .then(result => {
        console.log(
          'dados de Instituição De Ensino:' + JSON.stringify(result.data),
        );
        setInstituicaoEnsino(result.data);
        // SetDropDown();
      })
      .catch(error => {
        console.log('Erro ao carregar ' + JSON.stringify(error));
      });
  };

  const onInputChangeNome = (e: string) => {
    const value: string = e;
    console.log('Input value: ', value);

    const re = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;
    if (value === '' || re.test(value)) {
      setNomeCompleto(value);
    }
  };

  const onInputChangeGrau = (e: string) => {
    const value: string = e;
    console.log('Input value: ', value);

    const re = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;
    if (value === '' || re.test(value)) {
      setGrauDeEscolaridadeModal(value);
    }
  };

  return (
    <View style={styles.container}>

      {section === 0 && (
        <View style={styles.containerLogo}>
          <Image
            style={styles.foto}
            source={require('../../assets/BemPetroLogo.png')}
          />
          <View style={styles.containerIcone}>
            <Icon
              onPress={() => navigation.navigate('Login')}
              raised
              name="arrow-back-ios"
              type="MaterialIcon"
              color="#51B5C5"
              iconStyle={styles.icone}
            />
          </View>
          {status.type === "error" ? (
            <Text style={styles.error}>{status.mensagem}</Text>
          ) : (
            <></>
          )}
        </View>
      )}
      {section === 1 && (
        <View style={styles.containerLogo}>
          <Image
            style={styles.foto}
            source={require('../../assets/BemPetroLogo.png')}
          />
          <View style={styles.containerIcone}>
            <Icon
              onPress={() => setSection(0)}
              raised
              name="arrow-back-ios"
              type="MaterialIcon"
              color="#51B5C5"
              iconStyle={styles.icone}
            />
          </View>
          {status.type === "error" ? (
            <Text style={styles.error}>{status.mensagem}</Text>
          ) : (
            <></>
          )}
        </View>

      )}

      {section === 0 && (
        <>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.input}
              value={nomeCompleto}
              onChangeText={onInputChangeNome}
              placeholder="Nome Completo"
              maxLength={40}
            />
          </View>
          <View style={styles.containerInput}>
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'YYYY-MM-DD',
              }}
              maxLength={10}
              style={styles.input}
              placeholder="Data de Nascimento (YYYY/MM/DD)"
              value={dataNascimento}
              onChangeText={setDataNascimento}
            />
          </View>

          <View style={styles.telefone}>
            <TextInputMask
              type={'custom'}
              options={{
                mask: '99',
              }}
              style={styles.ddd}
              placeholder="DDD"
              keyboardType="number-pad"
              maxLength={2}
              value={DDD}
              onChangeText={setDDD}
            />

            <TextInputMask
              type={'custom'}
              options={{
                mask: '999999999',
              }}
              maxLength={9}
              style={styles.numero}
              placeholder="Telefone"
              keyboardType="number-pad"
              value={telefone}
              onChangeText={setTelefone}
            />
          </View>

          <View style={styles.containerDrop3}>
            <View style={styles.containerdropdown2}>
              <DropDownPicker
                stickyHeader={true}
                style={styles.dropdownPrimeiro}
                open={open}
                value={value}
                items={items}
                placeholder="Instituição de Ensino"
                setOpen={setOpen}
                setValue={setValue}
                dropDownDirection={'TOP'}
                onSelectItem={item => setInstituicaoEnsinoSet(item.label)}
              />

              <View style={styles.containermodale2}>
                <Icon
                  onPress={toggleModal}
                  raised
                  name="plus"
                  type="font-awesome"
                  color="#51B5C5"
                  iconStyle={styles.modale2}
                />
              </View>
            </View>
          </View>

          <View style={styles.containerDrop2}>
            <View style={styles.containerdropdown}>
              <DropDownPicker
                style={styles.dropdown2}
                open={open2}
                placeholder="Grau de Escolaridade"
                value={value2}
                items={items2}
                setOpen={setOpen2}
                setValue={setValue2}
                dropDownDirection={'TOP'}
                onSelectItem={item => setGrauDeEscolaridadeSet(item.label)}
              />
            </View>
            <View style={styles.containermodale}>
              <Icon
                onPress={toggleModal2}
                raised
                name="plus"
                type="font-awesome"
                color="#51B5C5"
                iconStyle={styles.modale}
              />
            </View>
          </View>

          <View style={styles.containermodal}>
            <Modal
              style={styles.containermodal}
              isVisible={isModalVisible}
              backdropColor="black">
              <View style={styles.modalDefinitivo2}>
                <View style={styles.containerModalModal}>
                  <Icon
                    onPress={toggleModal}
                    raised
                    name="close"
                    type="font-awesome"
                    color="#51B5C5"
                    iconStyle={styles.modalModal}
                  />
                </View>
                <View style={styles.containertitulomodal}>
                  <Text style={styles.titulomodal}>
                    Cadastrar nova Instituição de Ensino!
                  </Text>
                </View>

                <View style={styles.containerenter}>
                  <TextInput
                    style={styles.enter}
                    placeholder="Instituição de Ensino"
                    value={instituicaoEnsinoModal}
                    onChangeText={setInstituicaoEnsinoModal}
                    maxLength={20}
                  />
                </View>
                <TouchableOpacity
                  style={styles.botaoEntrar3}
                  onPress={() => {
                    enviarDadosInstituicaoDeEnsino();
                    toggleModal();
                  }}>
                  <Text style={styles.textEntrar3}>CADASTRAR</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
          <View style={styles.containermodal}>
            <Modal
              style={styles.containermodal}
              isVisible={isModalVisible2}
              backdropColor="black">
              <View style={styles.modalDefinitivo2}>
                <View style={styles.containerModalModal}>
                  <Icon
                    onPress={toggleModal2}
                    raised
                    name="close"
                    type="font-awesome"
                    color="#51B5C5"
                    iconStyle={styles.modalModal}
                  />
                </View>
                <View style={styles.containertitulomodal}>
                  <Text style={styles.titulomodal}>
                    Cadastrar novo Grau de Escolaridade*
                  </Text>
                </View>
                <View style={styles.containerenter}>
                  <TextInput
                    style={styles.enter}
                    placeholder="Grau de Escolaridade"
                    value={grauDeEscolaridadeModal}
                    onChangeText={onInputChangeGrau}
                    maxLength={20}
                  />
                </View>
                <TouchableOpacity
                  style={styles.botaoEntrar3}
                  onPress={() => {
                    enviarDadosGrauInstrucao();
                    toggleModal2();
                  }}>
                  <Text style={styles.textEntrar3}>CADASTRAR</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>

          <TouchableOpacity
            style={styles.botaoEntrar}
            onPress={() => setSection(1)}>
            <Text style={styles.textEntrar}>CONTINUAR</Text>
          </TouchableOpacity>
        </>
      )}

      {section === 1 && (
        <ScrollView contentContainerStyle={{alignItems:"center", justifyContent:'center'}} >
          <View style={styles.containerInputSec2}>
            <TextInput
              style={styles.inputSec2}
              placeholder="Email"
              value={email}
              maxLength={30}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.containerMeioInputSec2}>
            <TextInputMask
              type={'custom'}
              options={{
                mask: '99999',
              }}
              maxLength={5}
              style={styles.inputMeioSec2}
              placeholder="Numero"
              value={numero}
              onChangeText={setNumero}
            />
            <TextInput
              style={styles.inputMeioSec2}
              placeholder="Complemento"
              maxLength={30}
              value={complemento}
              onChangeText={setComplemento}
            />
          </View>
          <View style={styles.containerInputSec2}>
            <TextInputMask
              type={'custom'}
              options={{
                mask: '99999999',
              }}
              maxLength={8}
              style={styles.inputSec3}
              placeholder="CEP"
              onBlur={() => checkCEP()}
              value={CEP}
              onChangeText={setCEP}
            />
          </View>

          <View style={styles.containerMeioInputSec2}>
            <TextInput
              style={styles.inputMeioSec3}
              placeholder="Municipio"
              value={municipio}
              editable={false}
              onChangeText={setMunicipio}
            />
            <TextInput
              style={styles.inputMeioSec3}
              placeholder="UF"
              value={UF}
              editable={false}
              onChangeText={setUF}
            />
          </View>
          <View style={styles.containerInputSec2}>
            <TextInput
              style={styles.inputSec4}
              placeholder="Logradouro"
              editable={false}
              value={logradouro}
              onChangeText={setLogradouro}
            />
          </View>
          <View style={styles.containerInputSec2}>
            <TextInput
              style={styles.inputSec5}
              placeholder="Senha"
              maxLength={20}
              value={senha}
              onChangeText={setSenha}
            />
          </View>


          <View style={styles.containerInputSec2}>
            <Text style={styles.inputSec6}>
              Ao continuar, você concorda com os
              <TouchableOpacity
                onPress={() => navigation.navigate('TermoDeUso')}>
                <Text style={styles.textoSub}>Termos de Uso </Text>
              </TouchableOpacity>
              <Text style={styles.inputSec6}>e a </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('PoliticaPrivacidade')}>
                <Text style={styles.textoSub}> Política de Privacidade</Text>
              </TouchableOpacity>
            </Text>

          </View>

          <TouchableOpacity
            style={styles.botaoEntrar2}
            onPress={() => {
              enviarDados();
              console.log(dados);
            }}>
            <Text style={styles.textEntrar}>CADASTRAR</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textoSub: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#51B5C5',
  },

  containerInputSec2: {
    width: '100%',
    height: 50,
    textAlign: 'center',
    marginBottom: 12,
  },
  containerMeioInputSec2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    // bottom: '9%',
  },

  inputSec2: {
    backgroundColor: '#fff',
    height: 50,
    width: 280,

    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  inputSec3: {
    backgroundColor: '#fff',
    height: 50,
    width: 280,
    // position: 'relative',
    // top: '170%',
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 15,
    fontSize: 16,
    color: '#00000033',
  },
  inputSec4: {
    backgroundColor: '#fff',
    height: 50,
    width: 280,
    // position: 'relative',
    // top: '187%',
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 15,
    fontSize: 16,
    color: '#00000033',
  },
  inputSec5: {
    backgroundColor: '#fff',
    height: 50,
    width: 280,
    // position: 'relative',

    // top: '204%',
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 15,
    fontSize: 16,
    color: '#00000033',
  },
  inputSec6: {
    height: 50,
    width: 280,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 15,
    fontSize: 13,
    color: '#000000',
  },
  error: {
    color: "#ff0000",
    position: "relative",
    top: "2%",
  },
  inputMeioSec2: {
    backgroundColor: '#fff',
    height: 50,
    width: 137,
    // position: 'relative',
    // top: '28%',
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 4,
    fontSize: 16,
    color: '#000',
  },
  containerIcone: {
    position: 'absolute',

    width: '40%',
    height: '95%',
    right: '38%',
    bottom: '3.5%',
  },
  icone: {},
  inputMeioSec3: {
    backgroundColor: '#fff',
    height: 50,
    width: 137,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 4,
    fontSize: 16,
    color: '#00000033',
  },
  inputMeioSec23: {
    backgroundColor: '#fff',
    height: 50,
    width: 120,
    position: 'relative',
    top: '20%',
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 10,
    fontSize: 16,
    color: '#00000033',
  },
  modalDefinitivo: {},
  botaomodal: {},
  modalDefinitivo2: {
    width: 300,
    height: 450,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerenter: {},
  enter: {
    backgroundColor: '#FFFFFF',
    width: 270,
    height: 55,
  },
  containertitulomodal: {
    marginHorizontal: 20,
    bottom: 85,
  },
  containertitulomodal2: {
    display: 'flex',
    flexDirection: 'row',
    bottom: 30,
  },
  titulomodal: {
    fontWeight: 'bold',
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containermodal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containermodal2: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    right: '30%',
  },
  container: {
    backgroundColor: '#EFEFEF',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    paddingTop:20
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    width: '70%',
    position: 'relative',
    top: '110%',
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  containerLogo: {
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    marginBottom:12
  },
  containerInput: {
    width: '100%',
    bottom: 40,
    alignItems: 'center',
  },
  botaoEntrar: {
    backgroundColor: '#51B5C5',
    width: 268,
    height: 60,
    borderRadius: 30,
    top: '12%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoEntrar3: {
    backgroundColor: '#51B5C5',
    width: 200,
    height: 50,
    borderRadius: 30,
    top: '20%',

    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoEntrar2: {
    backgroundColor: '#51B5C5',
    width: 268,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textEntrar: {
    fontFamily: 'Roboto',
    width: 110,
    height: 20,
    color: '#ffffff',
    alignItems: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  textEntrar3: {
    fontFamily: 'Roboto',
    width: 110,
    height: 20,
    color: '#ffffff',
    alignItems: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  foto: {
    width: 280,
    height: 130,
  },
  telefone: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 40,
  },
  ddd: {
    backgroundColor: '#fff',
    height: 50,
    width: '22%',
    position: 'relative',
    top: 70,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 5,
    fontSize: 16,
    color: '#000',
  },
  numero: {
    backgroundColor: '#fff',
    height: 50,
    width: '45%',
    position: 'relative',
    top: 70,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 5,
    fontSize: 16,
    color: '#000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    borderRadius: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView2: {},
  modal2: {
    width: '500',
    height: 200,
  },
  centeredView3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    marginTop: 22,
    borderRadius: 20,
  },
  modalView2: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: 70,
    height: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose2: {
    backgroundColor: '#2196F3',
  },
  textStyle2: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText2: {
    marginBottom: 15,
    textAlign: 'center',
  },
  containerDrop: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '70%',
    top: '11%',
    justifyContent: 'center',
  },
  containerdropdown: {
    position: 'relative',
    right: '8%',
    width: '50.5%',
  },
  dropdown: {
    width: '100%',
    borderWidth: 0,
    color: '#51B5C5',
  },
  containerDrop2: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    left: '4.5%',
    top: "6%",
  },
  containerDrop3: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    right: '5.7%',
    top: "8%",
  },
  containerdropdown2: {
    position: 'relative',
    display: 'flex',
    width: '51%',
    flexDirection: 'row',
  },
  dropdown2: {
    alignItems: 'center',
    width: '105%',
    left: '6%',
    borderWidth: 0,
    justifyContent: 'center',
  },
  dropdownPrimeiro: {
    alignItems: 'center',
    width: '105%',
    borderWidth: 0,
    justifyContent: 'center',
  },
  modale: {},

  containerModalModal: {
    display: 'flex',
    alignItems: 'flex-end',
    bottom: 105,
    left: '35%',
  },
  modalModal: {
    alignItems: 'flex-end',
  },
  modale2: {},
  containermodale: {
    position: 'relative',
    width: '30%',
    left: '21.4%',
  },
  containermodale2: {
    position: 'relative',
    width: '30%',
    left: '24%',
    bottom: '3.5%',
  },
});

export default Registro;
