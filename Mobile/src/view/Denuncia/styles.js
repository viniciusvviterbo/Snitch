import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },

    headerText: {
        fontSize: 15,
        color: '#737380',
    },

    headerTextBold: {
        fontWeight: 'bold',
    },

    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 48,
        color: '#13131a',
        fontWeight: 'bold',
    },

    description: {
        fontSize:16,
        lineHeight: 24,
        color: '#737380',
    },

    form: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginTop: 24,
        marginBottom: 16,
    },

    formLabel: {
        fontSize: 16,
        color: '#41414d',
        fontWeight: 'bold',
    },

    formText: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 32,
        color: '#737380',
        height: 34,
    },

    formTxtBox: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 16,
        color: '#737380',
        height: 24,
    },
});