import React, { useState } from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { data } from '../helpers/sliderData';
import CodeScanner from './CodeScanner';
import { styles } from '../.expo/styles/Silder';

export default function Slider({ onDone, onScan, scanned }) {
  const [index, setIndex] = useState(0);
  
  const renderItem = () => {
    return index !== 1 ? (
      <View style={[ styles.slide, { backgroundColor: data[index].bg } ]}>
        <Image source={require('../assets/streamBuy_logo.png')} style={styles.logo} />
        <Text style={styles.title}>{data[index].title}</Text>
        <Image source={data[index].image} style={styles.image} />
        <Text style={styles.text}>{data[index].text}</Text>
      </View>
    ) : (
      <View style={[ styles.slide, { backgroundColor: data[index].bg } ]}>
        <Image source={require('../assets/streamBuy_logo.png')} style={styles.logo} />
        <Text style={styles.title}>{ scanned ? data[index].titleSuccess : data[index].title} </Text>
        {scanned 
          ? <Image source={data[index].image} style={styles.image} />
          : <CodeScanner onScan={onScan} />
        }
    </View>
    );
  };

  const onChangeSlide = number => {
    if (number === 0) {
      onScan(null);
      setIndex(number);
    } else setIndex(number);
  };

  const showNext = () => {
    if (index === 1) return scanned;
    else return true;
  };

    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          nextLabel="Siguiente"
          doneLabel="Empezar"
          prevLabel="Volver"
          bottomButton
          showPrevButton={true}
          showNextButton={showNext()}
          renderItem={renderItem}
          data={data}
          onSlideChange={number => onChangeSlide(number)}
          onDone={onDone}
          scrollEnabled={false}
        />
      </View>
    );
}