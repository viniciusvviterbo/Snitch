/*
 * Possui o padrão GRASP controlador porque utiliza a controller do MVC, que funciona como um intermediário entre a camada de visualização e a camada de dados.
 * Possui o padrão GRASP Indireção porque atribui o objeto controller que é um intermediário entre a view e a entidade.
 * Pelo fato de possuir indireção, possui o padrão GRASP baixo acoplamento, porque a separação entre model-view-controller promove a reutilização de código 
 */

import React from 'react';
import * as Location from 'expo-location';
import ApiKeys from '../../model/Denuncia';

let flag = false;

export async function getAddress(latitude, longitude) {   
    
    const geocoding_key = '4ed2c74e41844513a6a078e96f908a87';

    try {
        let url =   'https://api.opencagedata.com/geocode/v1/json?' + 
                    'q=' + latitude + '%2C%20' + longitude +
                    '&key=' + geocoding_key +
                    '&language=pt' +
                    '&pretty=1';
        let response = await fetch(url);
        let json = await response.json();
        console.log('getAddress() -\t' + json.results[0].formatted);
        return String(json.results[0].formatted);
    }
    catch (error) {
        console.error(error);
    }
}

export async function getCoordinates() {
    try {
        let { status } = await Location.requestPermissionsAsync();
        if (status == 'granted') {        
            let location = await Location.getCurrentPositionAsync({});
            
            console.log('getCoordinates() -\t' + location.coords.latitude + ', ' + location.coords.longitude)
            return [String(location.coords.latitude), String(location.coords.longitude)];
        }
    }
    catch {
        return errorMsg;
    }
}

export async function getEndereco() {
    let coords, addr;
    if (flag !== true) {
        flag = true;
        coords = await getCoordinates();
        flag = false;

    }
    else if (flag !== true) {
        flag = true;
        addr = await getAddress(coords[0], coords[1]);
        flag = false;
    }
    console.log('addr -\t' + addr);
    return addr;
}

export async function registrarDenuncia(obj) {
    /*

    obj : {
        evento = nomeEvento,
        local = localizacao,
        datetime = horario,
        nomeanexo = nomeArquivo,
        anexo = arquivo.base64 ? arquivo.base64 : arquivo.uri;
    };

    */
}