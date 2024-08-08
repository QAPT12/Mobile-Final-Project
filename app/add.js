import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { useSQLiteContext } from 'expo-sqlite';
import { TextInput } from 'react-native-paper';

const AddCard = () => {
  const [newCard, updateNewCard] = useState({
    name: "", releaseSet: "", color: "", imageLink: ""
  });

  const db = useSQLiteContext();

  const insertNewCard = async (name, uri, releaseSet, color) => {
    console.log(name, uri, releaseSet, color);
    await db.runAsync(`
      INSERT INTO cards (name, releaseSet, color, imageLink) VALUES (?, ?, ?, ?)`, name, releaseSet, color, uri);
  }

  const handleAddCard = () => {
    insertNewCard(newCard.name, newCard.imageLink, newCard.releaseSet, newCard.color);
    updateNewCard({ name: "", releaseSet: "", color: "", imageLink: "" });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Card</Text>
      <TextInput
        style={styles.input}
        label={"Image URL"}
        value={newCard.imageLink}
        onChangeText={image => updateNewCard({ ...newCard, imageLink: image })}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        label={"Card Name"}
        value={newCard.name}
        onChangeText={name => updateNewCard({ ...newCard, name: name })}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        label={"Release Set"}
        value={newCard.releaseSet}
        onChangeText={releaseSet => updateNewCard({ ...newCard, releaseSet: releaseSet })}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        label={"Color"}
        value={newCard.color}
        onChangeText={color => updateNewCard({ ...newCard, color: color })}
        placeholderTextColor="#888"
      />
      <View style={styles.buttonBar}>
        <Button label={"Add Card"} faIcon={false} onPress={handleAddCard} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3e3b4f',
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 30,
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "space-around",
  }
});

export default AddCard;
