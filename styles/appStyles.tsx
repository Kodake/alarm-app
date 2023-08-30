import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    titulo: {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 15,
        fontSize: 30
    },
    listado: {
        justifyContent: 'center',
        marginVertical: '75%',
        textAlign: 'center',
        color: '#606060',
        flex: 1,
    },
    fab: {
        backgroundColor: '#3a86ff',
        position: 'absolute',
        borderRadius: 100,
        margin: 20,
        bottom: 0,
        right: 0,
    },
    item: {
        backgroundColor: '#778da9',
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 15,
        color: 'white',
        flex: 1,
    },
});