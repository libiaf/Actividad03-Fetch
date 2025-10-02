import { Text, View, Image, StyleSheet, ActivityIndicator, SectionList } from 'react-native';
import {useState, useEffect} from 'react';

const Cell = (props) => {
  const randomNumber = Math.floor(Math.random() * 100 + 50);
  return (
    <View style={styles.cell}>
      <Text> {props.name}</Text>
    </View>
  );
};

const Header = (props) => {
  return <Text style={styles.header}> {props.name} </Text>;
};

export default App = () => {
  const[isLoading, setLoading] = useState([]);
  const[data, setData] = useState([]);

  const getData = async() => {
    try{
      const response = await fetch('https://raw.githubusercontent.com/MarioDuran/react-native-course/refs/heads/main/Example3/TC2007B.json');
      const json = await response.json();
      setData(json.TC2007B)
    }
    catch (error){
      console.log(error)
    } finally {
      setLoading(false);
    }
  }
  useEffect( () => {
    getData();
  }, []);

  return isLoading ? (
    <ActivityIndicator/>
  ) :(
    <SectionList
      sections = {data}
      renderItem = {({item}) => <Cell name={item.name} />}
      renderSectionHeader = {({section: {title}}) => <Header name={title}/>}
      keyExtractor= {item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 10,
  },
  cell: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
