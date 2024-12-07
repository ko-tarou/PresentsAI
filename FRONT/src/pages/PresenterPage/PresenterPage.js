import React, { useEffect, useRef, useState } from "react";
import "./PresenterPage.css";
import { subscribeToComment,saveComment } from "../../firebase/realtimeService";

const PresenterPage = () => {
  const [comment, setComment] = useState("");
  const [newComment, setNewComment] = useState("");
  const imageRef = useRef(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentBoxId, setCurrentBoxId] = useState("box1"); // 画像を表示するボックスの管理

  useEffect(() => {
    const unsubscribe = subscribeToComment((retrievedComment) => {
      setComment(retrievedComment || "コメント");
    });
    return () => unsubscribe();
  }, []);
  
  const handleSaveComment = async () => {
    try {
      await saveComment(newComment);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const handlePlayPause = () => {
    setIsRunning((prev) => !prev);
  };

  React.useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const changeImageBox = () => {
    if (currentBoxId === "box1") {
    setCurrentBoxId("box2");
    } else if (currentBoxId === "box2") {
    setCurrentBoxId("box3");
    } else {
    setCurrentBoxId("box1");
    }
  };

  const [status, setStatus] = useState('init');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [acknowledgmentCount, setAcknowledgmentCount] = useState(0);
  const recorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const streamRef = useRef(null);

  const acknowledgments = ['えーと', 'うーん', 'あの', 'そうですね', 'なるほど'];

  const mediaRecordStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: false },
      });

      streamRef.current = stream;
      recorderRef.current = new MediaRecorder(stream);
      recorderRef.current.addEventListener('dataavailable', (e) => {
        // 音声データ処理
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
            await sendToChatGPT("全体のプレゼンの内容はこれ「"+comment+"」。今、「"+recognizedText+"」ここまで話した。次に話すべき内容は？");
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

  const sendToChatGPT = async (text) => {
    try {
      const res = await fetch('http://localhost:5000/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: text }),
      });

      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      console.error('Error calling ChatGPT API:', error);
      setResponse('エラーが発生しました。');
    }
  };

  return (
    <div className="presenter-container">
      {/* 左側のエリア */}
      <div className="left-area">
        <div className="timer-container">
          <div className="time-display">{`00:${time.toString().padStart(2, "0")}`}</div>
          <div className="button-group">
            <button className="reset-button" onClick={handleReset}>↻</button>
            <button className="play-button" onClick={handlePlayPause}>
              {isRunning ? "⏸" : "▶"}
            </button>
          </div>
        </div>
        <img
          ref={imageRef}
          src="/img/169.png"
          alt="プレゼン画像"
          className="presenter-image"
        />
		  {/* ボタンで画像切り替え */}
			<div className="change-image-button">
				<button onClick={changeImageBox}>画像を変更</button>
			</div>
        <div className="horizontal-box">
          {comment}
        </div>
      </div>
       {/* 音声認識ボタン */}
      <div className="right-wrapper">
        <div className="audio-buttons">
          <button onClick={mediaRecordStart} disabled={status === 'recording'}>
            音声認識開始
          </button>
          <button onClick={stopDetection} disabled={status !== 'recording'}>
            音声認識終了
          </button>
        </div>
      </div>
      {/* 中央の比率16:9のボックス */}
      <div className="middle-box">    
	      <div className="box" id="box1">
			    {currentBoxId === "box1" && (
				    <img
            ref={imageRef}
            src="/img/169.png"
            alt="プレゼン画像"
            className="presenter-image"
            />
			    )}
			</div>
			<div className="box" id="box2">
			  {currentBoxId === "box2" && (
				<img
          ref={imageRef}
          src="/img/169.png"
          alt="プレゼン画像"
          className="presenter-image"
				/>
			)}
			</div>
			<div className="box" id="box3">
			  {currentBoxId === "box3" && (
          <img
            ref={imageRef}
            src="/img/169.png"
            alt="プレゼン画像"
            className="presenter-image"
          />
			)}
      </div>
    </div>

    {/* 右側のエリア */}
    <div className="right-area">
      <h3>ChatGPTの応答:</h3>
      <p>{response}</p>
      </div>
    </div>
  );
};

export default PresenterPage;
