import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, View, Pressable, Text } from "react-native";

export default function Button({ label, onPress, isActive, faIcon }) {

    return (
        <View style={styles.buttonContainer}>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    isActive && styles.activeButton,
                    pressed && styles.pressedButton,
                ]}
                onPress={onPress}
            >
                {faIcon ? (
                    <FontAwesomeIcon icon={label} size={30} style={styles.icon} />
                ) : (
                    <Text style={styles.text}>{label}</Text>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 10,
    },
    button: {
        paddingVertical: 20,
        paddingHorizontal: 40,
        backgroundColor: 'black',
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row', 
        justifyContent: 'center', 
    },
    activeButton: {
        backgroundColor: '#3498db',
    },
    pressedButton: {
        backgroundColor: '#2980b9',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
        color: 'white',
        marginRight: 5,
    },
});
