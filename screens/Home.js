import React, {useState,useEffect} from 'react';
import { StyleSheet, ScrollView} from 'react-native';
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
  Spinner
} from 'native-base';
import AsyncStorages from '@react-native-community/async-storage';
import {useIsFocused} from "@react-navigation/native"
export default function Home(props) {
  const [listOfSeason, setListOfSeason] = useState([]);
  const [loading, setLoading] = useState(false);
    const isFocused =useIsFocused()
  const getList = async () => {
    setLoading(true)
    const storedValue=await AsyncStorages.getItem("@season_list");
    if(!storedValue)
    {
      setListOfSeason([]);
    }
  const list=JSON.parse(storedValue)
  setListOfSeason(list);
  setLoading(false);

  };
  const deleteSeasons = async (id) => {
    const newList=await listOfSeason.filter((item) => item.id !== id)
    await AsyncStorages.setItem("@season_list",JSON.stringify(newList))
        setListOfSeason(newList)
  };
  const markCompleted = async (id) => {

    const newArray =listOfSeason.map((item) =>{
      if(item.id==id){
        item.isWatched=!item.isWatched
        return item;
      }
      
    })
    await AsyncStorages.setItem("@season_list",JSON.stringify(newArray))
    setListOfSeason(newArray)
  };

  useEffect(() => {
   getList();
  }, [isFocused]);
  if(loading)
  {
    return(<Container style={styles.container}>
      <Spinner color="#007bc2"/>
    </Container>);
    
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {listOfSeason.length == 0 ? (
        <Container style={styles.container}>
          <H1 style={styles.heading}>
            WatchList is Empty, Please Add A Season
          </H1>
        </Container>
      ) : (
        <ScrollView>
          <H1 style={styles.heading}>Next Season to Watch</H1>
          <List>
            {listOfSeason.map((season)=>(
         <ListItem style={styles.listItem} key={season.id}>
         <Left>
           <Button style={styles.actionButton} danger onPress={()=>{deleteSeasons(season.id)}}>
             <Icon name="trash" active />
           </Button>
           <Button style={styles.actionButton} onPress={()=>{props.navigation.navigate("Edit",{season})}} >
             <Icon name="edit" active type="Feather" />
           </Button>
         </Left>
         <Body>
           <Title style={styles.seasonName}>{season.name}</Title>
           <Text note>{season.totalNoOfSeason} seasons to Watch</Text>
         </Body>
         <Right><  CheckBox checked={season.isWatched} onPress={()=>{
           markCompleted(season.id)
         }}/></Right>
       </ListItem>

            ))}
          </List>
        </ScrollView>
      )}
      <Fab
        position="bottomRight"
        style={{backgroundColor: '#5067FF'}}
        onPress={() => {
          props.navigation.navigate('Add');
        }}>
        <Icon name="add" />
      </Fab>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#fff',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});
