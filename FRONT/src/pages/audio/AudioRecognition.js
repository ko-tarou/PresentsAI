import React, { useState, useRef } from 'react';

const AudioRecognition = () => {
  const [status, setStatus] = useState('init'); // 'init', 'recording', 'ready'
  const [transcript, setTranscript] = useState('');
  const [audioData, setAudioData] = useState([]);
  const recorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const streamRef = useRef(null);

  // 音声録音を開始
  const mediaRecordStart = async () => {
    try {
    	const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: false }
      });

      streamRef.current = stream;
      recorderRef.current = new MediaRecorder(stream);
      recorderRef.current.addEventListener('dataavailable', (e) => {
        setAudioData((prevData) => [...prevData, e.data]);
      });

      recorderRef.current.addEventListener('stop', () => {
        const audioBlob = new Blob(audioData);
        const reader = new FileReader();
        reader.onload = () => {
          const result = new Uint8Array(reader.result);
          const base64Audio = arrayBufferToBase64(result);
          sendToGoogleSpeechAPI(base64Audio);
        };
        reader.readAsArrayBuffer(audioBlob);
      });

      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.lang = 'ja-JP';
      recognitionRef.current.interimResults = true;
      recognitionRef.current.continuous = true;

      recognitionRef.current.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            setTranscript(event.results[i][0].transcript);
          }
        }
      };

      recognitionRef.current.start();
      recorderRef.current.start();
      setStatus('recording');
    } catch (err) {
      console.error('Error starting media recorder or recognition:', err);
    }
  };

  // 音声認識を停止
  const stopDetection = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (recorderRef.current) {
      recorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setStatus('ready');
  };

  // Google Speech-to-Text APIに音声データを送信
  const sendToGoogleSpeechAPI = (audioContent) => {
    const apiKey = 'YOUR-API-KEY'; // APIキーを設定
    const content = {
      config: {
        language_code: 'ja-JP',
        sample_rate_hertz: 44100,
        encoding: 'LINEAR16', // WAV/RAWの音声データの場合
        enable_automatic_punctuation: true,
      },
      audio: { content: audioContent },
    };

    fetch(`https://speech.googleapis.com/v1p1beta1/speech:recognize?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(content),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results[0].alternatives[0].transcript) {
          console.log('Transcript:', data.results[0].alternatives[0].transcript);
        }
      })
      .catch((error) => {
        console.error('Error during API request:', error);
      });
  };

  // ArrayBufferをBase64に変換
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <div className="audio-recognition">
      <h2>音声認識</h2>
      <button onClick={mediaRecordStart} disabled={status === 'recording'}>
        音声認識開始
      </button>
      <button onClick={stopDetection} disabled={status !== 'recording'}>
        音声認識終了
      </button>
      <div>
        <h3>認識結果:</h3>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default AudioRecognition;
