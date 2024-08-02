import { Text, Image, StyleSheet, View } from 'react-native';
import { useState } from 'react';

export default function Card({props}) {

    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    }

    return (
        <View style={styles.container}>
            {/* <Image source={{uri: `${ props['imageLink']}`}} style={styles.image}/> */}
            <Image
                source={imageError ? require('./../assets/placeholder.jpeg') : { uri : props['imageLink'] }} 
                style={styles.image}
                onError={handleImageError}
            />
            <Text style={styles.name}>Card Name: { props['name'] }</Text>
            <Text style={styles.text}>Color: { props['color']}</Text>
            <Text style={styles.text}>Set Released: { props['releaseSet']}</Text>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 15,
        marginTop: 50,
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    image: {
        width: 300,
        height: 400,
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    }
});