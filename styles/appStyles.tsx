import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    titulo: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 30
    },
    fab: {
        backgroundColor: '#3a86ff',
        position: 'absolute',
        margin: 20,
        bottom: 0,
        right: 0,
        borderRadius: 100,
    },
    item: {
        backgroundColor: '#778da9',
        marginHorizontal: 10,
        textAlign: 'center',
        marginVertical: 5,
        borderRadius: 15,
        color: "white",
        padding: 20,
        flex: 1,
    },
});