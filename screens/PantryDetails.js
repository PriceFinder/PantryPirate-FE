import { View, Text, Pressable, StyleSheet } from 'react-native'
import axios from 'axios';
import { useState } from 'react';


export default function ({ route }) {
  const [pantry, SetPantry] = useState(route.params.pantry);

  const handleDeleteItem = (item) => {
    const index = pantry.items.indexOf(item);
    if (index !== -1) {
      const newPantry = [...pantry.items];
      newPantry.splice(index, 1);
      const updatedPantry = { ...pantry, items: newPantry };
      axios.put(`https://pantrypirate.onrender.com/pantry/${pantry._id}`, updatedPantry)
        .then(() =>{
          SetPantry(updatedPantry);
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <View style={styles.container}>
      {pantry.items.map((item, idx) => {
        return (
          <View key={`item-${idx}`} style={styles.itemContainer}>
            <Text style={styles.itemText}>
              {item}
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.deleteButton,
                {
                  backgroundColor: pressed ? 'gray' : '#bb0a1e',
                },
              ]}
              onPress={() => handleDeleteItem(item)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFE7',
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },
  itemText: {
    width: '60%',
  },
  deleteButton: {
    backgroundColor: '#bb0a1e',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});