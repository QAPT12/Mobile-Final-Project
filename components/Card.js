import { Text, Image, StyleSheet, View } from 'react-native';

export default function Card({props}) {
    return (
        <View style={styles.container}>
            <Image source={{uri: `${ props['imageLink']}`}} style={styles.image}/>
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
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    image: {
        width: 400,
        height: 500,
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    }
});