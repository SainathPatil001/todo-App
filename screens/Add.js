import React, {useState} from 'react';
import {Text, StyleSheet, ScrollView,TouchableOpacity,Pressable} from 'react-native';
import {Container, Form, Item, Input, Button, H1} from 'native-base';
import shortid from 'shortid';
import AsyncStorages from '@react-native-community/async-storage';
export default function Add({navigation}) {
  const [name, setName] = useState('');
  const [totalNoOfSeason, setTotalNoOfSeason] = useState('');

  const addToList = async () => {
    try {
      if (!name || !totalNoOfSeason) {
       

        return alert('Please Add both Fields');
      }

      const seasonToAdd = {
        id: shortid.generate(),
        name: name,
        totalNoOfSeason: totalNoOfSeason,
        isWatched: false,
      };

      const storedValue = await AsyncStorages.getItem('@season_list');
      const previousList = await JSON.parse(storedValue);
      if (!previousList) {
        const newList = [seasonToAdd];
        await AsyncStorages.setItem('@season_list', JSON.stringify(newList));
      } else {
        previousList.push(seasonToAdd);
        await AsyncStorages.setItem(
          '@season_list',
          JSON.stringify(previousList),
        );
      }
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };
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
          <TouchableOpacity  onPress={addToList} style={{backgroundColor:"purple",padding:17,borderRadius:30,margin:10}}>
            <Text style={{color: '#eee',textAlign:"center",fontSize:20}}>Add</Text>
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
    color: '#ffffff',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
});
