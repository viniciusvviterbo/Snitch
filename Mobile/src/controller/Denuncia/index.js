import React from 'react';
import * as Location from 'expo-location';

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