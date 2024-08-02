import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { useSQLiteContext } from 'expo-sqlite';
import { TextInput } from 'react-native-paper';

const update = () => {
  const [index, setIndex] = useState(0)

  const [waiting, setWaiting] = useState(true);


  const [newCard, updateNewCard] = useState({
    "name":"", "releaseSet":"", "color":"", "imageLink":""
  })

  const db = useSQLiteContext();
  const [cards, setCards] = useState([]);

  const insertNewCard = async (name, uri, releaseSet, color) => {
    console.log(name, uri, releaseSet, color)
    await db.runAsync(`
      INSERT INTO cards (name, releaseSet, color, imageLink) VALUES (?, ?, ?, ?, ?)`, name,releaseSet,color,uri);
    }

  const updateCards = async (name, uri, releaseSet,  color, cardToReplace) => {
    console.log(name, uri, releaseSet,  color)
    await db.runAsync(`
      UPDATE cards SET name = ?, releaseSet = ?,  color = ?, imageLink = ? WHERE name = ?`, name,releaseSet,color,uri,cardToReplace);
    }

  const removeCard = async (name) => {
    await db.runAsync(`
      DELETE FROM cards WHERE name = ? `, name)
  }

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync('SELECT * FROM cards');
      setCards(result);
      setWaiting(false);
    }
    setup();      
  }, []);

if(!waiting){
 return (
    <View style={styles.container}>
     <Text>Card to Replace</Text>
     <Text style={styles.cardName}>{ cards[index].name }</Text>
     <View style={styles.buttonBar}> 
        <Button label={"Prev"} onPress={()=> setIndex(Math.max(index - 1, 0))}></Button>
        <Button label={'Next'} onPress={()=> setIndex(Math.min(index + 1, cards.length - 1))}></Button>
     </View>
      <TextInput
        style={styles.input}
        placeholder="Paste Image URL here"
        onChangeText={image => updateNewCard({...newCard, imageLink:image})}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="New Name"
        onChangeText={name => updateNewCard({...newCard, name:name})}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="New Release Set"
        onChangeText={releaseSet => updateNewCard({...newCard, releaseSet:releaseSet})}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="New color"
        onChangeText={color => updateNewCard({...newCard, color:color})}
        placeholderTextColor="#888"
      />
      <View style={styles.buttonBar}>
        <Button label={"Commit Change"} onPress={() => {
          updateCards(newCard.name, newCard.imageLink, newCard.releaseSet, newCard.color, cards[index].name)
        }}></Button>
       </View>
      <View style={styles.buttonBar}>
        <Button label={"Add New Card"} onPress={() => {
          insertNewCard(newCard.name, newCard.imageLink, newCard.releaseSet, newCard.color)
        }}></Button>
        <Button label={"Delete This Card"} onPress={() => {
          removeCard(cards[index].name)
        }}></Button>
      </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  label: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 13,
    borderRadius: 5,
    width: 200,
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
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
  cardName: {
    fontWeight: "bold",
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "space-around",
  }
});

export default update;