import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, TextInput } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import * as Location from 'expo-location';

import logoImg from '../../assets/logo.png';
import styles from './styles';

import { getEndereco } from '../../controller/Denuncia';

export default function Denuncia() {


    const [localizacao, setLocalizacao] = useState(null);
    const [horario, setHorario] = useState(null);
    const [nomeEvento, setNomeEvento] = useState('');

    async function getAddress(latitude, longitude) {   
        const geocoding_key = '4ed2c74e41844513a6a078e96f908a87';

        try {
            let url =   'https://api.opencagedata.com/geocode/v1/json?' + 
                        'q=' + latitude + '%2C%20' + longitude +
                        '&key=' + geocoding_key +
                        '&language=pt' +
                        '&pretty=1';
            let response = await fetch(url);
            let json = await response.json();
            setLocalizacao(json.results[0].formatted);
        }
        catch (error) {
            console.error(error);
        }
    }

    async function getCoordinates() {
        try {
            let { status } = await Location.requestPermissionsAsync();
            if (status == 'granted') {        
                let location = await Location.getCurrentPositionAsync({});
                getAddress(location.coords.latitude, location.coords.longitude);
            }
        }
        catch {
            return errorMsg;
        }
    }

    useEffect(() => {
        getCoordinates();
        setHorario(moment().format('LLL'));
    }, []);
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>0 denúncias</Text> feitas.
                </Text>
            </View>

            <Text style={styles.title}>Combate ao COVID-19</Text>
            <Text style={styles.description}>Denuncie eventos e aglomerações e incentive o distanciamento social!</Text>
        
            <View style={styles.form}>
                <Text style={styles.formLabel}>Nome do evento:</Text>
                <TextInput
                    style={styles.formTxt}
                    placeholder="Digite um nome para identificar o evento"
                    onChangeText={nomeEvento => setNomeEvento(nomeEvento)}
                    defaultValue={nomeEvento}
                />

                <Text style={styles.formLabel}>Localização:</Text>
                <Text style={{  marginTop: 8,
                                fontSize: 15,
                                marginBottom: 32,
                                color: '#737380',
                                height: 34,}}>{localizacao}</Text>

                <Text style={styles.formLabel}>Hora:</Text>
                <Text style={{  marginTop: 8,
                                fontSize: 15,
                                marginBottom: 32,
                                color: '#737380',
                                height: 34,}}>{horario}</Text>

                <Text style={styles.formLabel}>Anexos:</Text>
            </View>

        </View>
    );
}


