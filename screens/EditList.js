import React, { useState } from 'react';
import { View, Pressable, TextInput, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

export default function EditList({ navigation, route }) {

  const [listName, setListName] = useState(route.params.list.name);
  const [members, setMembers] = useState(route.params.list.members.join(' ').replace('testUser', ''));

  const handleUpdateSubmit = async () => {
    try {
      let membersArr = members.split(' ').filter((member) => member !== '');
      const updatedList = { ...route.params.list, name: listName, members: [...membersArr, 'testUser'] };
      await axios.put(`https://pantrypirate.onrender.com/list/${updatedList._id}`, updatedList);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }, { name: 'MyLists' }],
      });
    } catch (error) {
      console.log('handleUpdateSubmit error----->>>', error)
    }

  }

  const handleDeleteSubmit = async () => {
    await axios.delete(`https://pantrypirate.onrender.com/list/${route.params.list._id}`)

    navigation.reset({
      index: 0,
      routes: [{ name: 'MyLists' }],
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.delete}>
        {route.params.list.creator === 'testUser' && (
          <Pressable
            onPress={handleDeleteSubmit}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed ? 'gray' : 'black',
              },
            ]}
          >
            <Text style={styles.buttonText}>Delete List</Text>
          </Pressable>
        )}
      </View>
      <View style={{ marginTop: 50 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeader}>List Name</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="List Name"
              value={listName}
              onChangeText={setListName}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeader}>Members</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Add Members"
              value={members}
              onChangeText={setMembers}
              style={styles.input}
            />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Pressable
          onPress={handleUpdateSubmit}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? 'gray' : 'black',
            },
          ]}
        >
          <Text style={styles.buttonText}>Update List</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFE7',

  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    padding: 10,
  },
  delete: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  inputContainer: {
    backgroundColor: 'black',
    margin: 15,
    borderRadius: 15,
    borderWidth: 1,
  },
  inputHeader: {
    marginLeft: 30,
    marginTop: 30,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#EFEFE7',
    padding: 5,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});