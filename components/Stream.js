import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { styles } from '../.expo/styles/Stream';
import { WebView } from 'react-native-webview';
import { initSocket } from '../helpers/socketConnection';

export default function Stream() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    initSocket();
    checkCameraPermissions();
  }, []);

  const checkCameraPermissions = async() => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === 'granted');
  };

  const onSwitchCamera = () => setType(type === Camera.Constants.Type.back
    ? Camera.Constants.Type.front
    : Camera.Constants.Type.back
  );

  if (hasCameraPermission === null) return <View />;
  if (hasCameraPermission === false) return <Text>No access to camera</Text>;
  return (
    <View style={styles.view}>
    <Camera style={styles.camera} type={type}>
      <TouchableOpacity style={styles.liveContainer}>
        <Image source={require('../assets/live.png')} style={styles.live} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.switchCameraContainer}>
          <Image source={require('../assets/switch.png')} style={styles.switch} />
    </TouchableOpacity>
    </Camera>
  </View>
  );
}
