import React,{useState,useEffect} from 'react'
import {StyleSheet,ScrollView,TouchableOpacity} from 'react-native'
import {
  Fab,
  Icon,
  List,
  ListItem,
  Left,
  Right,
  Button,
  Body,
  CheckBox,
  Title,
  H1,
  Text,
  Container,
  Spinner,
  Form,
  Item,
 Input
} from 'native-base';
import AsyncStorages from '@react-native-community/async-storage';

export default function Edit({navigation,route}) {
  const [name, setName] = useState('');
  const [totalNoOfSeason, setTotalNoOfSeason] = useState('');
  const [id, setId] = useState(null);
  const [isWatched, setIsWatched] = useState(false);
 const update=async()=>{
   try {
     if(!name || !totalNoOfSeason)
     {
       return alert("Please Add Two values")
     }

     const seasonToUpdate={
       id,
       name,
       totalNoOfSeason,
       isWatched
     };
     const storedValue=await AsyncStorages.getItem("@season_list")
     const list=JSON.parse(storedValue);
     list.map((season)=>{
       if(season.id===id){
         season.name=name;
         season.totalNoOfSeason=totalNoOfSeason;
         return;

       }
     })
     await AsyncStorages.setItem("@season_list",JSON.stringify(list))
     navigation.navigate("Home")
   } catch (error) {
     console.error(error)
   }
 }
 useEffect(() => {
   const {season}=route.params
   const {name,id,totalNoOfSeason}=season
   setTotalNoOfSeason(totalNoOfSeason)
   setId(id)
   setName(name)
 }, [])
 return (
  <Container style={styles.container}>
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <H1 style={styles.heading}>Add to Watch List</H1>
      <Form>
        <Item rounded style={styles.formItem}>
          <Input
            placeholder="Season Name"
            style={{color: '#FFFFFF'}}
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
        </Item>
        <Item rounded style={styles.formItem}>
          <Input
            placeholder="Total Number Of Season"
            style={{color: '#FFFFFF'}}
            value={totalNoOfSeason}
            onChangeText={(text) => {
              setTotalNoOfSeason(text);
            }}
          />
        </Item>
        <TouchableOpacity  onPress={update} style={{backgroundColor:"purple",padding:17,borderRadius:30,margin:10}}>
          <Text style={{color: '#eee',textAlign:"center",fontSize:20}}>Update</Text>
        </TouchableOpacity>
      </Form>
    </ScrollView>
  </Container>
);
}



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 20,
    },
  });