import React, { useEffect, useState } from "react";
import axios from 'axios';
import DataTable from "react-data-table-component";
import DateField from 'react-native-datefield';
import moment from 'moment';

import Header from "./Header";

import {
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  Alert
} from "react-native";
 
const History = props => {
  let [data, setData] = useState([]);

  const form = {
      init:'',
      end:''
  }

  const callHistory = () =>{
    if(form.init== "" || form.end == ""){
      Alert.alert("no se ingresaron fechas",[{ text: "ERROR" }]);
      return;
    }
    if(form.init > form.end){
      Alert.alert("la fecha de inicio no puede se mayor a la fecha final",[{ text: "ERROR" }]);
      form.end = '';
    }
    consultaByRange();
  }

  //consultar por rango de fechas
  const consultaByRange = async () => {
    const result = await axios(
      props.url+'/range/'+form.init+'/'+form.end,
    );
    if(result.status){
      setData(result.data);
    }
    Alert.alert("Algo a fallado", [{ text: "ERROR" }]);
  };


  //Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        props.url+'/history',
      );
      if(result.status){
        setData(result.data);
      }
      Alert.alert("Algo a fallado", [{ text: "ERROR" }]);
    };
    
    fetchData();
  }, []);

    //columnas
  const columnsDetail = [
      {
        name: "Fecha",
        selector: row => moment(row.fecha).format("DD-MM-YYYY"),
        sortable: true
      },
      {
        name: "Compra",
        selector: row => row.tc_compra,
        sortable: true
      },
      {
        name: "Venta",
        selector: row => row.tc_venta,
        sortable: true
      }
    ];

  // 
  const DetailHistory = ({ data }) => <DataTable
      title="DETALLE"
      columns={columnsDetail}
      data={data.detail}
      pagination
      
  />;

  //columnas
  const columns = [
    {
      name: "Petición",
      selector: row => row.peticion,
      sortable: true
    },
    {
      name: "Fecha inicio",
      selector: row => moment(row.inicio).format("DD-MM-YYYY"),
      sortable: true
    },
    {
      name: "Fecha fin",
      selector: row => moment(row.fin).format("DD-MM-YYYY"),
      sortable: true
    },
    {
      name: "Avg compra",
      selector: row => row.prom_tc_compra,
      sortable: true
    },
    {
      name: "Avg venta",
      selector: row => row.prom_tc_venta,
      sortable: true
    }
  ];

  return (
    <Modal visible={props.visible} animationType="slide">
      <Header title="HISTORIAL DE CONSULTAS"></Header>
      <View style={styles.container}>
      <Text style={styles.baseText}>
          desde: 
        </Text>
      <DateField
          labelDate="Dia"
          labelMonth="Mes"
          labelYear="Año"
          styleInput={styles.inputBorder}
          onSubmit={(value) => form.init = moment(value).format("DD-MM-YYYY")}
        />
        <Text style={styles.baseText}>
          hasta: 
        </Text>
      <DateField
          labelDate="Dia"
          labelMonth="Mes"
          labelYear="Año"
          styleInput={styles.inputBorder}
          onSubmit={(value) => form.end = moment(value).format("DD-MM-YYYY")}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Volver"
              color="red"
              onPress={props.onCancel}
            ></Button>
          </View>
          <View style={styles.button}>
            <Button
              title="Consultar"
              color="green"
              onPress={() => callHistory()}
            />
          </View>
        </View>

          <DataTable
            title="HISTORIAL"
            columns={columns}
            data={data}

            expandableRows
            expandableRowsComponent={DetailHistory}
          
            pagination
            
          />
      </View>
      
  </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    flex: 1,
    justifyContent: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },

  inputBorder: {
    borderRadius: 8,
    borderColor: '#cacaca',
    borderWidth: 1,
    marginBottom: 20,
    width: '40%'
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%"
  },
  button: {
    width: "40%"
  },

  baseText: {
    fontWeight: 'bold',
    marginLeft: '2%',
    marginRight: '2%'
  }
});
 
export default History;