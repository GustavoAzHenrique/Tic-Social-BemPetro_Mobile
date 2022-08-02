import React from "react";
import { SearchBar } from "react-native-elements";
import { styles } from "./styles";

interface BarraPesquisaProps{
    search:string,
    setSearch: (text: string) => void
}

export const BarraPesquisa = ({search, setSearch}: BarraPesquisaProps) => {
    return (
        <SearchBar
            placeholder='Buscar'
            value={search}
            onChangeText={(text) => setSearch(text)}
            containerStyle={styles.barraPesquisa}
            inputContainerStyle={{backgroundColor:'white'}}
      />
    )
}