import { Text, Image, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Divider as Div}  from 'react-native-paper';

export default function Card({ props }) {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    }

    return (
        <View style={styles.container}>
            <Image
                source={imageError ? require('./../assets/placeholder.jpeg') : { uri: `${props['imageLink']}` }}
                style={styles.image}
                onError={handleImageError}
                resizeMode="contain"
            />
            <Div style={styles.spacer}></Div>
            <Text style={styles.name}>Card Name: {props['name']}</Text>
            <Text style={styles.text}>Color: {props['color']}</Text>
            <Text style={styles.text}>Set Released: {props['releaseSet']}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    image: {
        width: 300,
        height: 400,
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
    },
    spacer: {
        height:20,
    }
});
