import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from 'react';
import { useSQLiteContext } from "expo-sqlite";
import Button from "../components/Button";
import Card from "../components/Card";

export default function App() {
    const database = useSQLiteContext();
    const [index, setIndex] = useState(0);
    const [cards, setCards] = useState([]);
    const [waiting, setWaiting] = useState(true);

    useEffect(() => {
        async function setup() {
            const result = await database.getAllAsync('SELECT * FROM cards');
            setCards(result);
            setWaiting(false);
        }
        setup();
    }, []);

    if(!waiting){
        return (
                <View style={styles.container}>
                    <Card props={cards[index]} />
                    <View style={styles.navButtons}>
                        <Button label={'Prev'} onPress={() => setIndex(Math.max(index - 1, 0))}></Button>
                        <Button label={'Next'} onPress={() => setIndex(Math.min(index + 1, cards.length - 1))}></Button>
                    </View>
                </View>
            );
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        flex: 1,
    },
    navButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
})