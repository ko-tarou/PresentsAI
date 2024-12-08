import React, { useState, useRef } from 'react';

const AudioRecognition = () => {
  const [status, setStatus] = useState('init'); // 'init', 'recording', 'ready'
  const [transcript, setTranscript] = useState(''); // 音声認識結果
  const [response, setResponse] = useState(''); // GPTの応答
  const [acknowledgmentCount, setAcknowledgmentCount] = useState(0); // 相槌のカウント
  const recorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const streamRef = useRef(null);

  const acknowledgments = ['えーと', 'うーん', 'あの', 'そうですね', 'なるほど'];

  // 音声録音を開始
  const mediaRecordStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: false },
      });

      streamRef.current = stream;
      recorderRef.current = new MediaRecorder(stream);
      recorderRef.current.addEventListener('dataavailable', (e) => {
        // 必要に応じて音声データを保存（今回は省略可能）
      });

      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.lang = 'ja-JP';
      recognitionRef.current.interimResults = true;
      recognitionRef.current.continuous = true;

      recognitionRef.current.onresult = async (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            const recognizedText = event.results[i][0].transcript;
            setTranscript(recognizedText);

            // 相槌フレーズをカウント
            acknowledgments.forEach((ack) => {
              if (recognizedText.includes(ack)) {
                setAcknowledgmentCount((prevCount) => prevCount + 1);
              }
            });

            // 音声認識の結果をGPTに送信
            await sendToChatGPT(recognizedText);
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

  // ChatGPT APIに送信
  const sendToChatGPT = async (text) => {
    try {
      const res = await fetch('http://localhost:5000/api/chatgpt', {
        method: 'POST',
        headers: {
        	'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: text }), // 音声認識結果をプロンプトとして送信
      });

      const data = await res.json();
      setResponse(data.message); // ChatGPTの応答を保存
    } catch (error) {
      console.error('Error calling ChatGPT API:', error);
      setResponse('エラーが発生しました。');
    }
  };

  return (
    <div className="audio-recognition">
      <h2>音声認識とChatGPT</h2>
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
      <div>
        <h3>相槌のカウント:</h3>
        <p>{acknowledgmentCount}</p>
      </div>
      <div>
        <h3>ChatGPTの応答:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default AudioRecognition;
