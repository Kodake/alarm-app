import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    textColor: {
        color: '#FFFFFF'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    titulo: {
        textAlign: 'center',
        marginBottom: 10,
        color: 'white',
        marginTop: 15,
        fontSize: 30
    },
    listado: {
        justifyContent: 'center',
        marginVertical: '75%',
        textAlign: 'center',
        color: '#4a4e69',
        opacity: 0.6,
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
        backgroundColor: '#4a4e69',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 15,
        opacity: 0.75555,
        flex: 1,
    },
});