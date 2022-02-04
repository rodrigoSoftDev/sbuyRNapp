import React, { useEffect, useState } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { styles } from '../.expo/styles/StreamInfo';

export default function StreamInfo({ info, onNewScan, onStartStream }) {
    const [streamData, setStreamData] = useState(null);

    useEffect(() => getUrlParams(), []);

    const getUrlParams = () => {
        var regex = /[?&]([^=#]+)=([^&#]*)/g, params = {}, match;
        while (match = regex.exec(info)) params[match[1]] = match[2];
       setStreamData(params);
    };

    return !streamData ? (
        <View>
            <Text> No hay informacion sobre el stream escaneado </Text>
        </View>
    ) : (
        <View style={styles.infoView}>
            <Image source={require('../assets/streamBuy_logo.png')} style={styles.logo} />
            <View style={styles.infoContainer}>
                <View style={styles.infoText}> 
                    <Text style={styles.infoTextTitle}> Servidor : </Text>
                    <Text style={styles.infoTextContent}> {`${streamData.rtmp}`} </Text>
                </View>
                <View style={styles.infoText}> 
                    <Text style={styles.infoTextTitle}> Clave de transmisión : </Text>
                    <Text style={styles.infoTextContent}> {`${streamData.streamkey}`} </Text>
                </View>
                <View style={styles.infoText}> 
                    <Text style={styles.infoTextTitle}> Usuario : </Text>
                    <Text style={styles.infoTextContent}> {`${streamData.user}`} </Text>
                </View>
                <View style={styles.infoText}> 
                    <Text style={styles.infoTextTitle}> Contraseña : </Text>
                    <Text style={styles.infoTextContent}> {`${streamData.password}`} </Text>
                </View>
            </View>
            <TouchableOpacity  style={styles.button} onPress={onStartStream}>
                    <Text style={styles.buttonText}> Comenzar transmision </Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.button} onPress={onNewScan}>
                    <Text style={styles.buttonText}> Escanear nuevamente </Text>
            </TouchableOpacity>
        </View>
    );
};