import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { useSQLiteContext } from 'expo-sqlite';
import { TextInput } from 'react-native-paper';

const Update = () => {
  const [index, setIndex] = useState(0);
  const [waiting, setWaiting] = useState(true);
  const [newCard, updateNewCard] = useState({
    name: "", releaseSet: "", color: "", imageLink: ""
  });

  const db = useSQLiteContext();
  const [cards, setCards] = useState([]);

  const updateCards = async (name, uri, releaseSet, color, cardToReplace) => {
    console.log(name, uri, releaseSet, color);
    await db.runAsync(`
      UPDATE cards SET name = ?, releaseSet = ?, color = ?, imageLink = ? WHERE name = ?`, name, releaseSet, color, uri, cardToReplace);
  }

  const removeCard = async (name) => {
    await db.runAsync(`
      DELETE FROM cards WHERE name = ?`, name);
  }

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync('SELECT * FROM cards');
      setCards(result);
      setWaiting(false);
    }
    setup();      
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      const card = cards[index];
      updateNewCard({
        name: card.name,
        releaseSet: card.releaseSet,
        color: card.color,
        imageLink: card.imageLink
      });
    }
  }, [index, cards]);

  if (!waiting) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Card to Replace: </Text>
        <Text style={styles.cardName}>{cards[index].name}</Text>
        <View style={styles.buttonBar}> 
          <Button label={"fa-arrow-left"} faIcon={true} onPress={() => setIndex(Math.max(index - 1, 0))} />
          <Button label={'fa-arrow-right'} faIcon={true} onPress={() => setIndex(Math.min(index + 1, cards.length - 1))} />
        </View>
        <TextInput
          style={styles.input}
          label={"Image URL"}
          placeholder="Paste Image URL here"
          value={newCard.imageLink}
          onChangeText={image => updateNewCard({...newCard, imageLink: image})}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          label={"Card Name"}
          placeholder="New Name"
          value={newCard.name}
          onChangeText={name => updateNewCard({...newCard, name: name})}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          label={"Release Set"}
          placeholder="New Release Set"
          value={newCard.releaseSet}
          onChangeText={releaseSet => updateNewCard({...newCard, releaseSet: releaseSet})}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          label={"Color"}
          placeholder="New Color"
          value={newCard.color}
          onChangeText={color => updateNewCard({...newCard, color: color})}
          placeholderTextColor="#888"
        />
        <View style={styles.buttonBar}>
          <Button label={"Commit Change"} faIcon={false} onPress={() => {
            updateCards(newCard.name, newCard.imageLink, newCard.releaseSet, newCard.color, cards[index].name);
          }} />
        </View>
        <View style={styles.buttonBar}>
          <Button label={"Delete This Card"} faIcon={false} onPress={() => {
            removeCard(cards[index].name);
          }} />
        </View>
      </View>
    );
  }

  return null; // Render nothing while waiting
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
    marginBottom: 10,
  },
  cardName: {
    fontWeight: "bold",
    fontSize: 16,
    color: 'white',
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "space-around",
  }
});

export default Update;
