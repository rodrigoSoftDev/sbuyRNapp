import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function CodeScanner({ onScan }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => setTimeout(() => checkCamPermission(), 3000) , []);

  const checkCamPermission = async() => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    onScan(data);
  };
  
  return !hasPermission
  ? <Image source={require("../assets/loaderCamera.gif")} style={{ width: "100%", height: 500, marginVertical: 32,}}/> 
  : <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={{ width: "100%", height: 500, marginVertical: 32, marginBottom: 0 }}
    />
}