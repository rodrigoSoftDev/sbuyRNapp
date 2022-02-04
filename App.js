import React, { useState } from 'react';
import Slider from './components/Slider';
import Stream from './components/Stream';
import StreamInfo from './components/StreamInfo';

export default function App() {
  //window.navigator.userAgent = 'react-native';
  
  const [step, setStep] = useState("stream");
  const [scanUrl, setScanUrl] = useState(null);

  const onScan = url => setScanUrl(url);
  
  if (step === "tutorial") return <Slider scanned={scanUrl} onScan={onScan} onDone={() => setStep("stream")} />
  else return <Stream />
}; 