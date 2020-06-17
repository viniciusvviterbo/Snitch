import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { registrarDenuncia } from '../../controller/Denuncia';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';

import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import Constants from 'expo-constants';
import { render } from 'react-dom';

export default function Denuncia() {

    const [nomeEvento, setNomeEvento] = useState('');
    const [localizacao, setLocalizacao] = useState(null);
    const [horario, setHorario] = useState(null);
    const [nomeArquivo, setNomeArquivo] = useState('Arquivo');
    const [arquivo, setArquivo] = useState(null);

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [recording, setRecording] = useState(false);
    const [arquivoFoiSelecionado, setArquivoFoiSelecionado] = useState(false);
    const [cameraEmUso, setCameraEmUso] = useState(false);

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

    function setInitialFields() {
        getCoordinates();
        setHorario(moment().format('LLL'));
    }


    useEffect(() => {
        (async () => {
            const { status, expires, permissions } = await Permissions.askAsync(
                Permissions.LOCATION,
                Permissions.CAMERA,
                Permissions.AUDIO_RECORDING,
                Permissions.CAMERA_ROLL,
            );
            setHasPermission(status === 'granted');
            setInitialFields();
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>As permissões de acesso necessárias foram negadas pelo usuário.</Text>;
    }
    
    return (
        /*
         * Implementação do design pattern observer pois fica observando se a flag que indica o uso da câmera está levantada, e atualiza a tela inteira caso esteja
         */
        (cameraEmUso) ?
        (
            <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1 }} type={cameraType} ref={ref => { setCameraRef(ref); }}>
                    
                    <View>
                        <TouchableOpacity style={{ marginTop: Constants.statusBarHeight + 20, marginLeft: 20 }} onPress={() => {
                            setCameraEmUso(false)
                            setRecording(false);
                            cameraRef.stopRecording(); }}>
                            <Feather name='arrow-left' size={40} color={'#FFF'} />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{ widht: 500, height: 500, flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-end' }}>
                        <View style={{flex: 0.2,  display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { setCameraType( cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back ); }}>
                                <Feather name='repeat' size={40} color={'#FFF'} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{alignSelf: 'center'}} onPress={ async() => {
                            if(!recording) {
                                setRecording(true);
                                let video = cameraRef.recordAsync();
                                setArquivo(video);
                                let extencao = video.uri.substr(data.uri.lastIndexOf('.'));
                                setNomeArquivo('snitch_vid_' + horario + extencao);
                                setArquivoFoiSelecionado(true);
                                setCameraEmUso(false);
                                console.log('video', video);
                            }
                            else {
                                setRecording(false);
                                cameraRef.stopRecording();
                            }}}>
                                <Feather name='video' size={40} color={'#FF0000'} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
                            if(cameraRef){
                                let photo = await cameraRef.takePictureAsync();
                                setArquivo(photo);
                                let extencao = photo.uri.substr(photo.uri.lastIndexOf('.'));
                                setNomeArquivo('snitch_pic_' + horario + extencao);
                                setArquivoFoiSelecionado(true);
                                setCameraEmUso(false);
                                console.log('photo', photo);
                            }}}>
                                <Feather name='camera' size={40} color={'#FFF'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Camera>
            </View>
        )
        :
        (
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
                    <TextInput style={styles.formTxtBox} placeholder="Digite um nome para identificar o evento" onChangeText={nomeEvento => setNomeEvento(nomeEvento)} defaultValue={nomeEvento}/>
    
                    <Text style={styles.formLabel}>Localização:</Text>
                    <Text style={{  marginTop: 8,
                                    fontSize: 15,
                                    marginBottom: 16,
                                    color: '#737380',
                                    height: 34,}}>{localizacao}</Text>
                    
                    <Text style={styles.formLabel}>Hora:</Text>
                    <Text style={{  marginTop: 8,
                                    fontSize: 15,
                                    color: '#737380',
                                    height: 34,}}>{horario}</Text>
    
                    <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <Text style={styles.formLabel}>Anexar arquivo:</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#e02041', borderRadius: 8, height: 32, width: '60%', justifyContent: 'space-evenly', alignItems: 'center' }} onPress={() => {setCameraEmUso(true)}}>
                            {
                                /*
                                 * Implementação do design pattern decorator pois o estado desse botão em tempo de execução é alterado, mostrando um ícone ou o nome do arquivo
                                 */
                                arquivoFoiSelecionado
                                ? <Text style={{ marginTop: 21,
                                    fontSize: 9,
                                    color: '#FFF',
                                    height: 34,}}>{nomeArquivo}</Text>
                                : <Feather name='file' size={20} color={'#FFF'}/>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
    
                <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginTop: 24 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#e02041', borderRadius: 8, height: 80, width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }} onPress={() => { registrarDenuncia(nomeEvento, localizacao, horario, nomeArquivo, arquivo.base64 ? arquivo.base64 : arquivo.uri); }}>
                        <Text style={{  marginBottom: 14, fontSize: 32, color: '#FFF', height: 34, fontWeight: 'bold'}}>
                            Enviar denúncia
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    );
}