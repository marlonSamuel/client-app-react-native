import React, { useEffect, useState } from "react";
import axios from 'axios';
import DataTable from "react-data-table-component";

import {
  View,
  ScrollView
} from "react-native";
 
const VariableTypes = props => {
  let [data, setData] = useState([]);

  //Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        props.url+'/types',
      );
      setData(result.data);
    };
 
    fetchData();
  }, []);

    //columnas
  const columns = [
    {
      name: "Codigo",
      selector: row => row.moneda,
      sortable: true
    },
    {
      name: "Descripción",
      selector: row => row.desc,
      sortable: true
    }
  ];

  return (
    <View>
      <ScrollView>
      <DataTable
        title="TIPOS DE MONEDA"
        columns={columns}
        data={data}
      
        pagination
        
      />
      </ScrollView>
  </View>
  );
};

 
export default VariableTypes;