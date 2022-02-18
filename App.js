import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList, Image } from "react-native";
 
import VariableTypes from "./components/VariableTypes";
import DisplayImage from "./components/DisplayImage";
import Header from "./components/Header";
import History from "./components/History";
 
export default function App() {

  const url = 'http://localhost/prueba/public/variables';

  const [showHistory, setHistory] = useState(false);
 
  const onCancel = () => {
    setHistory(false);
  };
 
  return (
    <View>
      <Header title="TIPO DE CAMBIO"></Header>
      <View style={styles.screen}>
        <Button title="IR A HISTORIAL" onPress={() => setHistory(true)}></Button>
        <History
          url = {url}
          visible={showHistory}
          onCancel={onCancel}
        />
      </View>

      <VariableTypes url = {url}/>
    </View>
  );
}
 
const styles = StyleSheet.create({
  screen: {
    paddingTop: 70,
    paddingHorizontal: 70
  },
  screenlist: {
    marginLeft: 20,
    marginRight: 20
  }
});