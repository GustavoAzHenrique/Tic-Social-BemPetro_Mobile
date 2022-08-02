import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Alert,
  Text,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import AxiosInstance from '../../Api/AxiosInstance';
import {RenderPageContext} from '../../Context/RenderizarPagina';
import {UserInfoContext} from '../../Context/UserInfoContext';
import {TextInputMask} from 'react-native-masked-text';
import { DarkModeContext } from '../../Context/DarkMode';

const EditarPerfil = ({route, navigation}) => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState<Number>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [grauDeEscolaridade, setGrauDeEscolaridade] = useState([]);
  const [grauDeEscolaridadeModal, setGrauDeEscolaridadeModal] = useState('');
  const [grauDeEscolaridadeSet, setGrauDeEscolaridadeSet] = useState('');
  const [instituicaoEnsino, setInstituicaoEnsino] = useState([]);
  const {renderPage, ChangeRender} = useContext(RenderPageContext);
  const [instituicaoEnsinoSet, setInstituicaoEnsinoSet] = useState('');
  const [instituicaoEnsinoModal, setInstituicaoEnsinoModal] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const {setUserData, id, token} = useContext(UserInfoContext);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [telefoneId, setTelefoneId] = useState();
  const {toggle} = useContext(DarkModeContext);

  const [status, setStatus] = useState({
    type: '',
    mensagem: '',
  });

  let dados = {
    email: email,
    senha: senha,
    dataNascimento: dataNascimento,
    nome: nomeCompleto,
    instituicaoEnsino: instituicaoEnsinoSet,
    grauInstrucao: grauDeEscolaridadeSet,
  };

  let telDados = {
    numero: telefone,
  };

  const onInputChangeNome = (e: string) => {
    const value: string = e;
    console.log('Input value: ', value);

    const re = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;
    if (value === '' || re.test(value)) {
      setNomeCompleto(value);
    }
  };

  function getUserData() {
    AxiosInstance.get(`/pessoa/${id}`, {headers: {Authorization: token}})
      .then(res => {
        setNomeCompleto(res.data.nome);
        setDataNascimento(res.data.dataNascimento);
        setEmail(res.data.email);
        setTelefone(res.data.telefones[0].numero);
        setSenha(res.data.senha);
        setInstituicaoEnsinoSet(res.data.instituicaoEnsino);
        setGrauDeEscolaridadeSet(res.data.grauInstrucao);
        setTelefoneId(res.data.telefones[0].id);
      })
      .catch(error => console.log(error.response.headers));
    console.log(dados);
  }

  useEffect(() => {
    if (token && id) {
      getUserData();
    }
  }, [token, id]);

  function enviarDados() {
    if (!validate()) return;
    AxiosInstance.put(`/pessoa/fisica/${id}`, dados, {
      headers: {Authorization: token},
    })
      .then(res => {
        //console.log(res);
        console.log('foi');
      })
      .catch(error => console.log('Pessoa error: ' + JSON.stringify(error)));
    AxiosInstance.put(`/telefone/${telefoneId}`, telDados, {
      headers: {Authorization: token},
    })
      .then(res => {
        //console.log(res);
        console.log('Telefone foi');
      })
      .catch(error => {
        console.log('Telefone não foi');
        //console.log(error);
      });
    console.log(dados);
    console.log(telDados);
    Alert.alert('A edição foi realizada com sucesso!');
    return navigation.navigate('HomeScreen');
  }

  let dadosGrauInstrucao = {
    grau: grauDeEscolaridadeModal,
  };

  let dadosInstuicaoEnsino = {
    nome: instituicaoEnsinoModal,
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
    if (!telDados.numero)
      return setStatus({
        type: 'error',
        mensagem: 'Error: Necessário preencher o campo Numero de Telefone!',
      });

    return true;
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

  function enviarDadosInstituicaoDeEnsino() {
    AxiosInstance.post(`/instituicaoEnsino`, dadosInstuicaoEnsino);
    getDadosGrauInstrucao();
    ChangeRender();
  }

  function enviarDadosGrauInstrucao() {
    AxiosInstance.post(`/grauInstrucao`, dadosGrauInstrucao);
    getDadosGrauInstrucao();
    ChangeRender();
  }

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

  useEffect(() => {
    getDadosInstituicaoDeEnsino();
  }, [renderPage]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [isModalVisible2, setModalVisible2] = useState(false);

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  return (
    <View style={toggle?styles.containerDark:styles.container}>
      <View style={styles.topo}>
        <View style={styles.containerIcone2}>
          <Icon
            onPress={() => navigation.navigate('HomeScreen')}
            raised
            name="arrow-back-ios"
            type="MaterialIcon"
            color="#51B5C5"
            iconStyle={styles.icone}
          />
        </View>
        <View style={styles.viewtitulo}>
          <Text style={toggle?styles.tituloDark:styles.titulo}>EDITAR PERFIL</Text>
        </View>
      </View>
      {status.type === 'error' ? (
        <Text style={styles.error}>{status.mensagem}</Text>
      ) : (
        <></>
      )}

      <View style={styles.form}>
        <View style={styles.input}>
          <TextInput
            style={styles.enter}
            placeholder="Nome Completo"
            value={nomeCompleto}
            onChangeText={onInputChangeNome}
          />
        </View>
        <View style={styles.input}>
          <TextInputMask
            style={styles.enter}
            type={'datetime'}
            options={{
              format: 'YYYY-MM-DD',
            }}
            maxLength={10}
            placeholder="Data de Nascimento"
            value={dataNascimento}
            onChangeText={setDataNascimento}
          />
        </View>
        <View style={styles.input}>
          <TextInputMask
            style={styles.enter}
            type={'custom'}
            options={{
              mask: '999999999',
            }}
            maxLength={9}
            placeholder="Telefone"
            value={String(telefone)}
            onChangeText={e => setTelefone(Number(e))}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.enter}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.enter}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={styles.containerdropdown}>
          <View>
            <DropDownPicker
              style={styles.dropdown}
              open={open}
              value={value}
              items={items}
              dropDownDirection={'TOP'}
              placeholder="Instituição de Ensino"
              setOpen={setOpen}
              setValue={setValue}
              onSelectItem={item => setInstituicaoEnsinoSet(item.label)}
            />
          </View>
          <View style={styles.containerIcone}>
            <Icon
              onPress={toggleModal}
              raised
              name="plus"
              type="font-awesome"
              color="#51B5C5"
            />
          </View>
        </View>

        <View style={styles.containerdropdown}>
          <View>
            <DropDownPicker
              style={styles.dropdown}
              open={open2}
              value={value2}
              items={items2}
              dropDownDirection={'TOP'}
              placeholder="Grau de Escolaridade"
              setOpen={setOpen2}
              setValue={setValue2}
              onSelectItem={item => setGrauDeEscolaridadeSet(item.label)}
            />
          </View>
          <View style={styles.containerIcone}>
            <Icon
              onPress={toggleModal2}
              raised
              name="plus"
              type="font-awesome"
              color="#51B5C5"
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
                  style={styles.enter2}
                  placeholder="Instituição de Ensino"
                  value={instituicaoEnsinoModal}
                  onChangeText={setInstituicaoEnsinoModal}
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
                  style={styles.enter2}
                  placeholder="Grau de Escolaridade"
                  value={grauDeEscolaridadeModal}
                  onChangeText={setGrauDeEscolaridadeModal}
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

        <View style={styles.atualizar}>
          <TouchableOpacity style={toggle?styles.botaoEntrar4Dark:styles.botaoEntrar4} onPress={enviarDados}>
            <Text style={toggle?styles.textEntrar4Dark:styles.textEntrar4}>ATUALIZAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  },
  containerDark: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  topo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    top: '10%',
  },
  containerenter: {},
  modalModal: {
    alignItems: 'flex-end',
  },
  containertitulomodal: {
    marginHorizontal: 20,
    bottom: 85,
  },
  atualizar: {
    alignItems: 'center',
  },
  textEntrar3: {
    fontFamily: 'Roboto',
    width: 100,
    height: 20,
    color: '#ffffff',
    alignItems: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  error: {
    color: '#ff0000',
    position: 'relative',
    top: '5%',
  },
  textEntrar4: {
    fontFamily: 'Roboto',
    width: 100,
    height: 20,
    color: '#ffffff',
    alignItems: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  textEntrar4Dark: {
    fontFamily: 'Roboto',
    width: 100,
    height: 20,
    color: '#000000',
    alignItems: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  containerModalModal: {
    display: 'flex',
    alignItems: 'flex-end',
    bottom: 105,
    left: '35%',
  },
  modalDefinitivo2: {
    width: 300,
    height: 450,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewtitulo: {
    width: '70%',
    alignItems: 'center',
    top: 20,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 21,
  },
  tituloDark: {
    fontWeight: 'bold',
    fontSize: 21,
    color: "white"
  },
  form: {
    top: '6%',
  },
  input: {
    marginVertical: 7,
    width: 300,
    height: 50,
    backgroundColor: '#fff',
  },
  enter: {
    color: '#000000',
  },
  enter2: {
    backgroundColor: '#FFFFFF',
    width: 270,
    height: 55,
  },
  containerIcone: {},
  botaoEntrar3: {
    backgroundColor: '#51B5C5',
    width: 200,
    height: 50,
    borderRadius: 30,
    top: '20%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoEntrar4: {
    backgroundColor: '#51B5C5',
    width: 200,
    height: 50,
    borderRadius: 30,
    top: '52%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoEntrar4Dark: {
    backgroundColor: '#65E4F7',
    width: 200,
    height: 50,
    borderRadius: 30,
    top: '52%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulomodal: {
    fontWeight: 'bold',
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerIcone2: {
    alignItems: 'flex-start',
    left: '30%',
    bottom: '5%',
  },
  icone: {},
  containerdropdown: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: 300,
    position: 'relative',
    justifyContent: 'center',
  },
  dropdown: {
    alignItems: 'center',

    width: 234,
    marginHorizontal: 6,
    borderWidth: 0,
    justifyContent: 'center',
  },

  containermodal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditarPerfil;
